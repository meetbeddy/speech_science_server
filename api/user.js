const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const userControllers = require("../../controllers/userControllers");
const multerUploads = require("../../middleware/multer").multerUploads;
const auth = require("../../middleware/Auth");

router.post("/API/signin", authController.signIn);
router.post("/API/signup", multerUploads, authController.signUp);
router.post("/API/forgotpassword", authController.forgotPassword);
router.get("/getuser/:id", auth, authController.getUser);
router.get("/API/referal-link", auth, userControllers.generateReferalink);
router.get("/API/getreferer/:ref", userControllers.getReferer);
router.post("/API/initialsaving", auth, userControllers.initialSavings);
router.post("/API/increasesaving", auth, userControllers.increaseSavings);
router.post("/API/decreasesaving", auth, userControllers.decreaseSavings);
router.get("./sendemailconfirmation/:id", authController.sendEmailConfirmation);
router.get("/emailconfirmation/:confirmationcode", authController.verifyEmail);
router.get("/API/checklink/:token", authController.checkResetLink);
router.post("/API/resetpassword", authController.resetPassword);
router.post("/API/submitcommodity", auth, userControllers.submitCommodity);

// router.post("/updateprofile", authController.updateUserProfile);

module.exports = router;
