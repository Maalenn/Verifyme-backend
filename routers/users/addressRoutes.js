const express = require("express");
const router = express.Router();

const addressControllers = require('../../controllers/users/addressControllers');

router.route("/").post(addressControllers.createOne).get(addressControllers.getAll);

router
    .route("/:id")
    .get(addressControllers.getOne)
    .patch(addressControllers.updateOne)
    .delete(addressControllers.deleteOne);

module.exports = router;