const express = require("express");
const router = express.Router();
const userControllers = require("../../controllers/userControllers");
const multerUploads = require("../../middleware/multer").multerUploads;

router.post("/spellbee-register", multerUploads, userControllers.registerPupil);

module.exports = router;
