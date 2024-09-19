const BaseControllers = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");

const Subscriptions = require("../../models/Subscriptions");
const Institutions = require("../../models/Institutions");
const ServicePlans = require("../../models/ServicePlans");

const subscriptionControllers = new BaseControllers(Subscriptions, [], [Institutions, ServicePlans])

module.exports = subscriptionControllers
