const express = require("express");
const router = express.Router();

const genderControllers = require("../../controllers/users/genderControllers");

router.route("/")
    .get(genderControllers.getAll)
    .post(genderControllers.createOne);
    
router
    .route("/:id")
    .get(genderControllers.getOne)
    .patch(genderControllers.updateOne)
    .delete(genderControllers.deleteOne);

module.exports = router;
