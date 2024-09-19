const express = require("express");
const router = express.Router();

const earnerControllers = require("../../controllers/earners/earnerControllers");

router.route("/").get(earnerControllers.getAll).post(earnerControllers.createOne);

router
    .route("/:id")
    .get(earnerControllers.getOne)
    .patch(earnerControllers.updateOne)
    .delete(earnerControllers.deleteOne);

module.exports = router;
