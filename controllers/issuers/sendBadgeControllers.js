const Achievements = require("../../models/Achievements");
const Achievement = require("../../models/Achievements");
const EarnerAchievements = require("../../models/EarnerAchievements");
const Earners = require("../../models/Earners");
const Issuers = require("../../models/Issuers");
const Users = require("../../models/Users");
const BadgeClasses = require("../../models/BadgeClasses");
const EmailService = require("../../services/mailServices");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const emailService = new EmailService();

exports.assignBadgeToEarners = catchAsync(async (req, res) => {
    const { badgeClass } = req;
    const { earners } = req;

    const earnerData = await Earners.findAll({
        where: {
            id: earners.map((earner) => earner.id),
        },
        include: [
            {
                model: Users,
            },
            {
                model: Issuers,
                include: [
                    {
                        model: Users,
                    },
                ],
            },
        ],
    });


    const achievements = await Achievement.findAll({
        where: { badgeClassId: badgeClass.id },
    });

    if (!achievements || achievements.length === 0) {
        return res.status(404).json({ message: "No achievements found for this badge" });
    }

    for (const earner of earnerData) {
        for (const achievement of achievements) {
            await achievement.addEarner(earner);

            const earnerAchievement = await EarnerAchievements.findOne({
                where: {
                    achievementId: achievement.id,
                    earnerId: earner.id
                }
            })
            if (!earnerAchievement) {
                return next(new AppError("There's no earner with this id", 404))
            }

            // EarnerAchievement update name
            earnerAchievement.earnerName = earner.name
            await earnerAchievement.save()

            const badgeLink = `${process.env.CLIENT_BASE_URL}/dashboard/management/badges/badgeDetail/${achievement.badgeClassId}`;

            const earnerEmail = earner.User?.email || null;
            const issuerFullname = `${earner.Issuer?.User?.firstName || "Unknown"} ${
                earner.Issuer?.User?.lastName || "Issuer"
            }`;

            try {
                if (earnerEmail) {
                    await emailService.sendBadgeToEarner(earnerEmail, issuerFullname, badgeLink);
                }
            } catch (error) {
                console.log(
                    `Error sending mail for earner ID: ${earner.id}, achievement ID: ${achievement.id} 🔴`,
                    error,
                );
            }
        }
    }

    res.status(200).json({
        status: "success",
        message: "Badge assigned to all earners successfully",
        data: {
            badgeClass,
            earners,
            earnerData,
            achievements,
        },
    });
});

exports.updateIssuedOnForAchievements = catchAsync(async (req, res) => {
    let { achievementId } = req.body;

    if (!achievementId) {
        return res.status(400).json({
            status: "fail",
            message: "achievementId must be provided.",
        });
    }

    // If achievementId is not an array, convert it to an array
    if (!Array.isArray(achievementId)) {
        achievementId = [achievementId];
    }

    // Get the current date
    const currentDate = Date.now();

    // Update issuedOn field for all matching achievement IDs
    const updatedCount = await EarnerAchievements.update(
        { issuedOn: currentDate },
        {
            where: {
                achievementId: achievementId,
                issuedOn: null,
            },
        },
    );

    if (updatedCount[0] === 0) {
        // Sequelize returns an array where the first element is the number of updated rows
        return res.status(404).json({
            status: "fail",
            message: "No achievements found for the specified achievement IDs to update.",
        });
    }

    // Retrieve updated EarnerAchievements records with relevant data
    const updatedEarnerAchievements = await EarnerAchievements.findAll({
        where: {
            achievementId: achievementId,
        },
        include: [
            {
                model: Earners,
                include: [
                    {
                        model: Users,
                    },
                    {
                        model: Issuers,
                        include: [Users],
                    },
                ],
            },
            {
                model: Achievements,
                include: [
                    {
                        model: BadgeClasses,
                    },
                ],
            },
        ],
    });

    // Send badge claim email to each earner
    for (const record of updatedEarnerAchievements) {
        const earnerEmail = record.Earner.User?.email || null;
        const issuerFullName = `${record.Earner.Issuer.User?.firstName || "Unknown"} ${
            record.Earner.Issuer.User?.lastName || "Issuer"
        }`;
        const badgeLink = `${process.env.CLIENT_BASE_URL}/dashboard/management/badges/badgeDetail/${record.Achievement?.BadgeClass?.id}`;

        if (earnerEmail) {
            try {
                await emailService.sendBadgeIssuedToEarner(earnerEmail, issuerFullName, badgeLink);
            } catch (error) {
                console.error(
                    `Error sending claim badge email to earner ID: ${record.Earner.id}`,
                    error,
                );
            }
        }
    }

    // Send response indicating success
    res.status(200).json({
        status: "success",
        message: "IssuedOn date updated for specified achievements successfully.",
        data: {
            achievementId,
            issuedOn: currentDate,
            updatedEarnerAchievements,
        },
    });
});
