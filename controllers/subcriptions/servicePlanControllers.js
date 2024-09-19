const BaseControllers = require("../../utils/baseControllers");
const ServicePlans = require('../../models/ServicePlans')

const servicePlanControllers = new BaseControllers(ServicePlans, ["name", "stripeProductId"])

module.exports = servicePlanControllers