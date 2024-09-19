const {
    BadgeClasses,
    Issuers,
    Institutions,
    Achievements: AchievementModel,
    AchievementTypes,
    Criterias: CriteriaModel,
} = require("../../models");
const sequelize = require("../../configs/database");
const catchAsync = require("../../utils/catchAsync");

exports.addBadgeClass = catchAsync(async (req, res, next) => {
    const {
        name,
        description,
        imageUrl,
        tags,
        startedDate,
        expiredDate,
        issuerId,
        Issuer,
        Achievements,
        Criterias,
    } = req.body;

    // Start a transaction for atomicity
    const transaction = await sequelize.transaction();

    try {
        // 1. Create BadgeClass with basic details, including issuerId if provided
        const newBadgeClass = await BadgeClasses.create(
            {
                name,
                description,
                imageUrl,
                tags,
                startedDate,
                expiredDate,
                issuerId, // Make sure this is correctly included
            },
            { transaction },
        );

        // 2. Create Issuer and associated Institution if applicable
        if (Issuer) {
            const newIssuer = await Issuers.create(
                {
                    ...Issuer,
                    badgeClassId: newBadgeClass.id,
                },
                { transaction },
            );

            // Handle optional institution data if provided
            if (Issuer.institution) {
                await Institutions.create(
                    {
                        ...Issuer.institution,
                        issuerId: newIssuer.id,
                    },
                    { transaction },
                );
            }
        }

        // 3. Create Achievements with associated AchievementTypes
        if (Achievements && Achievements.length > 0) {
            for (const achievement of Achievements) {
                const newAchievement = await AchievementModel.create(
                    {
                        ...achievement,
                        badgeClassId: newBadgeClass.id,
                    },
                    { transaction },
                );

                if (achievement.achievementTypeId) {
                    await newAchievement.setAchievementType(achievement.achievementTypeId, {
                        transaction,
                    });
                }

                if (achievement.AchievementType) {
                    const [achievementType] = await AchievementTypes.findOrCreate({
                        where: { name: achievement.AchievementType.name },
                        defaults: achievement.AchievementType,
                        transaction,
                    });
                    await newAchievement.setAchievementType(achievementType.id, { transaction });
                }
            }
        }

        // 4. Create Criterias associated with the BadgeClass
        if (Criterias && Criterias.length > 0) {
            for (const criteria of Criterias) {
                await CriteriaModel.create(
                    {
                        ...criteria,
                        badgeClassId: newBadgeClass.id,
                    },
                    { transaction },
                );
            }
        }

        // 5. Commit the transaction once all operations are successfully completed
        await transaction.commit();

        // Fetch the created BadgeClass with its associations to match the desired response structure
        const createdBadgeClass = await BadgeClasses.findOne({
            where: { id: newBadgeClass.id },
            include: [
                {
                    model: Issuers,
                    include: [{ model: Institutions }],
                },
                {
                    model: AchievementModel,
                    include: [{ model: AchievementTypes }],
                },
                {
                    model: CriteriaModel,
                },
            ],
        });

        // 6. Return the newly created BadgeClass with associations
        res.status(201).json({
            status: "success",
            data: createdBadgeClass,
        });
    } catch (error) {
        // Rollback transaction if it hasn't been committed yet
        if (!transaction.finished) {
            await transaction.rollback();
        }
        return next(error);
    }
});
