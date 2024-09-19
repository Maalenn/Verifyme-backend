const express = require("express");
const router = express.Router();

const badgeClassesControllers = require("../../controllers/issuers/badgeClassControllers");
const addBadgesControllers = require("../../controllers/issuers/addBadgeClassControllers");

router.route("/").get(badgeClassesControllers.getAll).post(badgeClassesControllers.createOne);

router.route("/addBadge").post(addBadgesControllers.addBadgeClass);

router
    .route("/:id")
    .get(badgeClassesControllers.getOne)
    .patch(badgeClassesControllers.updateOne)
    .delete(badgeClassesControllers.deleteOne);

module.exports = router;
