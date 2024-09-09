const express = require("express");
const router = express.Router();

const userControllers = require('../../controllers/users/userControllers');

router.route("/").post(userControllers.createOne).get(userControllers.getAll);

router
    .route("/:id")
    .get(userControllers.getOne)
    .patch(userControllers.updateOne)
    .delete(userControllers.deleteOne);

module.exports = router;