const multer = require("multer");
const DataUri = require("datauri");
const DatauriParser = require("datauri/parser");

const path = require("path");

const storage = multer.memoryStorage();
exports.multerUploads = multer({ storage }).fields([
  { name: "passport", maxCount: 1 },
]);

const dUri = new DatauriParser();
exports.dataUri = (req) =>
  dUri.format(path.extname(req.originalname).toString(), req.buffer);
