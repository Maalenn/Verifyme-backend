const express = require("express");
const router = express.Router();
const { upload } = require("../../app");

const userControllers = require("../../controllers/users/userControllers");
const imageController = require("../../controllers/users/imageControllers");

// User-related routes
router
    .route("/")
    .post(upload.single("image"), userControllers.createOne)
    .get(userControllers.getAll);

router
    .route("/:id")
    .get(userControllers.getOne)
    .patch(userControllers.updateOne)
    .delete(userControllers.deleteOne);

router.post("/upload-profile-image", upload.single("image"), imageController.createOne);
router
    .route("/upload-profile-image/:id")
    .get(imageController.getOne)
    .put(upload.single("image"), imageController.updateImage)
    .delete(imageController.deleteImage);

module.exports = router;
