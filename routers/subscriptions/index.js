const express = require("express");
const router = express.Router();
const checkoutRouters = require("./checkoutRouters");
const servicePlanRouters = require("./servicePlanRouters");
const subscriptionRouters = require("./subscriptionRouters");

const webhookControllers = require("../../controllers/subcriptions/webhookControllers");

// Subcribe session checkout Router
router.use("/subscribe", checkoutRouters);

// ServicePlans Router
router.use("/servicePlans", servicePlanRouters);

// Webhook Router
router.use('/webhook', express.json(), webhookControllers.webhook)

// Subscriptions Router
router.use("/", subscriptionRouters);

module.exports = router;
