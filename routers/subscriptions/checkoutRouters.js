const express = require("express");
const router = express.Router();

const checkoutSession = require("../../controllers/subcriptions/checkoutControllers");

router.post("/:servicePlanId", checkoutSession.createCheckoutSession);

module.exports = router;
