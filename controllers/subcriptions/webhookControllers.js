const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const Subscriptions = require("../../models/Subscriptions");
const Payments = require("../../models/Payments");
const ServicePlans = require("../../models/ServicePlans");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * @param {Number} subscriptionId - id from subscription table
 * @param {Number} stripeSubscriptionId - id from stripe session when successfully paid
 * @returns {...} updating the subscription table {status, enddate, stripeSubscriptionId}
 */
const updateSubscription = catchAsync(async (subscriptionId, stripeSubscriptionId) => {
    try {
        // Find the subscription record by its primary key or stripeSubscriptionId
        const subscription = await Subscriptions.findOne({
            where: { id: subscriptionId },
            include: { model: ServicePlans, attributes: ["name"] },
        });

        if (!subscription) {
            throw new AppError("Subscription not found.", 404);
        }

        // Update the subscription status to active, set the stripeSubscriptionId, startDate, and endDate
        const currentDate = new Date();
        let endDate;

        // Calculate end date based on service plan duration (this is just an example)
        switch (subscription.ServicePlan.name) {
            case "Free Starter": // Quarterly (3 months)
                endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
                break;
            case 'Pro Plan': // Midyear (6 months)
                endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 6));
                break;
            case "Enterprise Plan": // Annual (12 months)
                endDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
                break;
            default:
                throw new AppError("Can't find the service plan with that id", 404);
        }

        // Update the subscription
        await subscription.update({
            status: true,
            startDate: new Date(),
            endDate: endDate,
            stripeSubscriptionId: stripeSubscriptionId,
        });

    } catch (err) {
        console.error(err);
        throw err; // Rethrow the error so it can be caught by your catchAsync wrapper
    }


    // Update the subscription status to active, set the stripeSubscriptionId, startDate, and endDate
    const currentDate = new Date();
    let endDate;

    // Calculate end date based on service plan duration (this is just an example)
    switch (subscription.servicePlanId) {
        case 1: // Quarterly (3 months)
            endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
            break;
        case 2: // Midyear (6 months)
            endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 6));
            break;
        case 3: // Annual (12 months)
            endDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
            break;
        default:
            return next(new AppError("Can't find the service plan with that id", 404));
    }

    await subscription.update({
        status: true,
        startDate: new Date(),
        endDate: endDate,
        stripeSubscriptionId: stripeSubscriptionId,
    });
});

exports.webhook = catchAsync(async (req, res, next) => {
    const sig = req.headers["stripe-signature"];
    let event;

    // Construct the event using the raw body
    event = stripe.webhooks.constructEvent(
        // Use req.body directly, which will be a Buffer due to express.raw()
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET_KEY,
    );
    if (!event) {
        return next(new AppError(`Webhook Error`, 400));
    }

    // Access the session object
    const session = event.data.object;
    // Retrieve relevant information from the session
    const { subscriptionId } = session.metadata;
    const stripeSubscriptionId = session.subscription;
    const amountPaid = session.amount_total;
    const paymentMethod = session.payment_method_types[0] || "card";
    // Handle the event based on its type
    switch (event.type) {
        case "checkout.session.completed":
            // Use this data to update your database, e.g., update the subscription
            await updateSubscription(subscriptionId, stripeSubscriptionId);

            await Payments.update(
                {
                    subscriptionId,
                    amount: amountPaid / 100,
                    paymentMethod,
                    status: true,
                },
                {
                    where: {
                        subscriptionId,
                    },
                },
            );
            // Acknowledge receipt of the event
            res.redirect(`${process.env.CLIENT_BASE_URL}/success-payment`);
            break;
        case "checkout.session.expired":
            await Subscriptions.destroy({
                where: {
                    id: subscriptionId,
                },
            });
            await Payments.destroy({
                where: {
                    subscriptionId,
                },
            });

            break;

        // Add other cases as needed
        default:
            console.log(`Unhandled event type ${event.type}`);
            return next(new AppError(`Unhandled event type ${event.type}`));
    }
});
