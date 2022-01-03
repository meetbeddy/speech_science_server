const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminControllers");
const auth = require("../../middleware/Auth");
const multerUploads = require("../../middleware/multer").multerUploads;

router.post("/signin", adminController.AdminLogin);
router.get("/enrollment", adminController.FetchEnrollments);
router.post("/createref", adminController.createRef);
router.get("/getref", adminController.getReferrals);
router.post("/confirmenrollment", adminController.confirmEnrollment);

module.exports = router;
