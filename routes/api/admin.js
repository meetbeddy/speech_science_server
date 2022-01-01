const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminControllers");
const authController = require("../../controllers/authController");
const auth = require("../../middleware/Auth");
const multerUploads = require("../../middleware/multer").multerUploads;

// router.get("/API/confirm/:id", auth, adminController.confirmUser);
// router.post("/API/createadmin", auth, adminController.CreateModerator);
// router.post("/API/login", adminController.AdminLogin);
// router.post("/API/sendemail", auth, adminController.messageAll);
// router.get("/API/getmembers", adminController.FetchMembers);
// router.get("/API/getreferals", adminController.getReferrals);
// router.get("/API/getallusers", auth, adminController.FetchAllUsers);
// router.get("/API/getadmin/:id", auth, adminController.getAdmin);
// router.post(
//   "/API/acknowledgereciept",
//   auth,
//   adminController.acknowledgeReciept
// );
// router.post(
//   "/API/acknowledgeincreasereciept",
//   auth,
//   adminController.acknowledgeIncreaseReciept
// );
// router.post(
//   "/API/acknowledgedecreasereciept",
//   auth,
//   adminController.acknowledgeDecreaseReciept
// );
// router.post("/API/declinereciept", auth, adminController.declineReciept);
// router.post(
//   "/API/updateprofile",
//   multerUploads,
//   authController.updateUserProfile
// );
// router.post("/API/addproduct", multerUploads, adminController.addProduct);
// router.post("/API/updateproduct", multerUploads, adminController.updateProduct);
// router.get("/API/getproducts", adminController.getProducts);
// router.delete("/API/removeproducts", adminController.removeProducts);
// router.delete("/API/removerequest", adminController.removeCommodityReq);
// router.get("/API/commodityrequests", adminController.fetchCommodityRequests);

module.exports = router;
