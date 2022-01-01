// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// const User = require("../models/User");
// const Admin = require("../models/Admin");
// const LastMemberId = require("../models/LastMemberId");
// const IncreaseSavingDetail = require("../models/IncreaseSavingDetail");
// const DecreaseSavingDetail = require("../models/DecreaseSavingDetail");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const Referal = require("../models/Referal");
// const sendEmail = require("../services/mailgun").memberConfirmation;
// const InitialSaving = require("../models/InitialSavingDetail");
// const sendInvite = require("../services/mailgun").adminInvite;
// const sendReciept = require("../services/mailgun").recieptAcknowledgement;
// const addToList = require("../services/mailgun").addMemberToMailList;
// const messageAll = require("../services/mailgun").messageAllMembers;
// const Product = require("../models/Products");
// const CommodityReq = require("../models/CommodityRequest");
// const crypto = require("crypto");
// const multer = require("../middleware/multer");
// const cloudinary = require("cloudinary");
// const axios = require("axios");

// exports.getReferrals = async (req, res) => {
//   try {
//     const referrals = await Referal.find()
//       .populate({
//         path: " userId",
//         model: "User",
//       })
//       .populate([
//         {
//           path: "referedUsers",
//           model: "User",
//         },
//       ]);

//     res.status(200).json({ referrals });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };

// const getNumbers = async () => {
//   const users = await User.find(
//     {
//       confirmed: true,
//     },
//     { _id: 0, phone: 1 }
//   ).lean();

//   const numbers = [];
//   let newString;
//   users.forEach((user) => {
//     if (user.phone.charAt(0) === "0") {
//       newString = parseInt(user.phone, 10);
//       let countryCode = "234";
//       numbers.push(Number(countryCode.concat(newString.toString())));
//     } else {
//       newString = parseInt(user.phone, 10);
//       numbers.push(newString);
//     }
//   });
//   return numbers.join();
// };
// exports.messageAll = async (req, res) => {
//   try {
//     let response;

//     const contacts = await getNumbers();

//     if (req.body.sendType === "sms") {
//       response = await axios.get(
//         `http://api.ebulksms.com:8080/sendsms?username=katlybedrick@gmail.com&apikey=ba1c00bb9ba62eb548cd1851abcc36c570e4ed1b&sender=LMCS&messagetext=${req.body.message}&flash=0&recipients=${contacts}`
//       );
//     } else if (req.body.sendType === "email") {
//       messageAll(req.body.subject, req.body.message);
//     } else if (req.body.sendType === "both") {
//       response = await axios.get(
//         `http://api.ebulksms.com:8080/sendsms?username=katlybedrick@gmail.com&apikey=ba1c00bb9ba62eb548cd1851abcc36c570e4ed1b&sender=LMCS&messagetext=${req.body.message}&flash=0&recipients=${contacts}`
//       );

//       messageAll(req.body.subject, req.body.message);
//     }

//     console.log(response);
//     res.status(200).json({ message: "sent successfully" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };
// /*@route GET
//  @desc confirm user
//  @access private*/

// exports.confirmUser = async (req, res) => {
//   const id = req.params.id;

//   try {
//     if (!req.user.accessLevel)
//       return res.status(401).json({
//         message: "you dont have the permission to carry out this action",
//       });

//     let user = await User.findOne({
//       _id: id,
//     });

//     if (user.confirmed)
//       return res.status(400).json({ message: "user is already confirmed" });

//     let recentId = await LastMemberId.findOne();

//     if (!recentId) {
//       recentId = await new LastMemberId({
//         userId: user._id,
//       }).save();
//     }

//     const generatedMemberId = await generateMemberId(recentId.memberId);

//     const lastGeneratedMemberId = generatedMemberId.slice(-6);

//     recentId.memberId = lastGeneratedMemberId;
//     recentId.userId = user._id;
//     recentId.save();
//     user.confirmed = true;
//     user.confirmedBy = req.user.name;
//     user.memberId = generatedMemberId;
//     user.save();
//     const person = {
//       name: user.name,
//       subscribed: true,
//       address: user.email,
//     };
//     addToList.members().create(person, function (error, data) {
//       console.log(data);
//     });
//     sendEmail(user.email, user.name, user.memberId);
//     res.status(200).json({ message: "user confirmed successfully" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };

// /*@route GET
//  @desc get confirmed user
//  @access public*/

// exports.FetchMembers = async (req, res) => {
//   try {
//     const users = await User.find(
//       {
//         confirmed: true,
//       },
//       { _id: 0, name: 1, memberId: 1, email: 1, phone: 1, birthDate: 1 }
//     )
//       .lean()
//       .populate({
//         path: "employmentDetails",
//         model: "EmploymentDetail",
//         select: { _id: 0, ippisNum: 1, staffNum: 1 },
//       })
//       .populate({
//         path: "paymentDetails",
//         model: "PaymentDetail",
//         select: { _id: 0 },
//       });

//     let data = [];
//     let flattenObj = (obj) => {
//       let result = {};
//       for (const i in obj) {
//         if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
//           const temp = flattenObj(obj[i]);
//           for (const j in temp) {
//             result[j] = temp[j];
//           }
//         } else {
//           result[i] = obj[i];
//         }
//       }
//       return result;
//     };

//     users.forEach((user, index) => {
//       data.push(flattenObj(user));
//     });

//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ message: "something went wrong", err: err.message });
//   }
// };

// /*@route GET
//  @desc get admin
//  @access private*/

// exports.getAdmin = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const user = await Admin.findOne({ _id: id });
//     res.json(user);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };

// /*@route GET
//  @desc get all users
//  @access private*/

// exports.FetchAllUsers = async (req, res) => {
//   try {
//     const users = await User.find()
//       .populate({
//         path: "paymentDetails",
//         model: "PaymentDetail",
//       })
//       .populate({
//         path: "initialSavingsRequest",
//         model: "InitialSaving",
//       })
//       .populate({
//         path: "increaseSavingsRequest",
//         model: "IncreaseSaving",
//       })
//       .populate({
//         path: "decreaseSavingsRequest",
//         model: "DecreaseSaving",
//       })
//       .populate({
//         path: "employmentDetails",
//         model: "EmploymentDetail",
//       });

//     res.status(200).json(users);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };

// /*@route POST
//  @desc Admin Creation
//  @access private*/
// exports.CreateModerator = async (req, res) => {
//   const { email, phone, password, fullname } = req.body;

//   try {
//     if (req.user.accessLevel < 3)
//       return res.status(401).json({
//         message: "you dont have the permission to carry out this action",
//       });
//     const existingUser = await Admin.findOne({ email: email });

//     if (existingUser) {
//       return res.json({ message: "user already exist" });
//     }

//     const hashedpassword = await bcrypt.hash(password, 12);
//     const user = await Admin.create({
//       email,
//       phone,
//       password: hashedpassword,
//       name: fullname,
//     });
//     sendInvite(email, fullname, password);
//     res.status(200).json({ message: "successfully created admin", user });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: error.message });
//   }
// };

// /*@route POST
//  @desc login for admins
//  @access public*/
// exports.AdminLogin = async (req, res) => {
//   const { email, password } = req.body;
//   const existingUser = await Admin.findOne({ email: email });
//   try {
//     if (!existingUser)
//       return res.status(404).json({ message: "user does not exist" });
//     const passwordCorrect = await bcrypt.compare(
//       password,
//       existingUser.password
//     );
//     if (!passwordCorrect)
//       return res.status(400).json({ message: "incorrect password" });
//     const token = jwt.sign(
//       {
//         name: existingUser.name,
//         email: existingUser.email,
//         id: existingUser._id,
//         accessLevel: existingUser.accessLevel,
//       },
//       process.env.TOKEN_SECRET
//     );
//     res.status(200).json({ user: existingUser, token });
//   } catch (err) {
//     res.status(500).json({ message: "something went wrong" });
//   }
// };

// /*@route POST
//  @desc initial instruction receipt acknowledgement
//  @access private*/
// exports.acknowledgeReciept = async (req, res) => {
//   const { userdata } = req.body;

//   try {
//     const filter = { _id: userdata.initialSavingsRequest._id };
//     const update = { acknowledged: "seen" };
//     await InitialSaving.findOneAndUpdate(filter, update, { new: true });
//     sendReciept(
//       userdata.email,
//       userdata.name,
//       userdata.initialSavingsRequest,
//       userdata.memberId
//     );
//     res.status(200).json({ message: "successful" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };

// exports.declineReciept = async (req, res) => {
//   const { userdata } = req.body;
//   try {
//     const filter = { _id: userdata.initialSavingsRequest._id };
//     const update = { acknowledged: "declined" };
//     await InitialSaving.findOneAndUpdate(filter, update, { new: true });
//     res.status(200).json({ message: "successfully declined" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };

// /*@route POST
//  @desc increase instruction receipt acknowledgement
//  @access private*/
// exports.acknowledgeIncreaseReciept = async (req, res) => {
//   const { userdata } = req.body;

//   try {
//     const filter = { _id: userdata.increaseSavingsRequest._id };
//     const update = { acknowledged: "seen" };
//     await await IncreaseSavingDetail.findOneAndUpdate(filter, update, {
//       new: true,
//     });

//     sendReciept(
//       userdata.email,
//       userdata.name,
//       userdata.increaseSavingsRequest,
//       userdata.memberId
//     );
//     res.status(200).json({ message: "successful" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };

// /*@route POST
//  @desc increase instruction receipt acknowledgement
//  @access private*/
// exports.acknowledgeDecreaseReciept = async (req, res) => {
//   const { userdata } = req.body;

//   try {
//     const filter = { _id: userdata.decreaseSavingsRequest._id };
//     const update = { acknowledged: "seen" };
//     await await DecreaseSavingDetail.findOneAndUpdate(filter, update, {
//       new: true,
//     });

//     sendReciept(
//       userdata.email,
//       userdata.name,
//       userdata.decreaseSavingsRequest,
//       userdata.memberId
//     );
//     res.status(200).json({ message: "successful" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };
// //LMCS/month/year/sixdigitsequence
// generateMemberId = (lastid) => {
//   let todayDate = new Date();
//   let month = todayDate.getMonth() + 1;
//   let year = todayDate.getFullYear();
//   let num = parseInt(lastid) + 1;

//   let sequence = num + "";
//   while (sequence.length < 6) sequence = "0" + sequence;

//   let id = `LMCS/${month}/${year}/${sequence}`;

//   return id;
// };

// exports.addProduct = async (req, res) => {
//   const { productName, variation, price, productImage, description } = req.body;

//   let d = new Date();
//   let time = d.getTime();
//   let id = crypto.randomBytes(20).toString("hex");
//   let productId = `${productName}-${id.slice(-6)}-${time}`;

//   let decodedVar = JSON.parse(variation);
//   let decodedPrice = JSON.parse(price);

//   try {
//     let imageUrl;
//     if (req.files) {
//       const pass = multer.dataUri(req.files.productImage[0]).content;
//       let image = await cloudinary.uploader.upload(pass);
//       imageUrl = image.url;
//     }

//     const product = await new Product({
//       productName,
//       productId,
//       variations: decodedVar,
//       prices: decodedPrice,
//       description,
//       productImage: imageUrl,
//     }).save();

//     res.status(200).json({ message: "submitted successfully", product });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   const {
//     productName,
//     variation,
//     price,
//     description,
//     productId,
//     productStatus,
//   } = req.body;

//   const decodedVar = JSON.parse(variation);
//   const decodedPrice = JSON.parse(price);

//   try {
//     const product = await Product.findOne({ productId: productId });
//     if (!product) return res.status(400).json({ message: "product not found" });

//     if (req.files.productImage) {
//       const pass = multer.dataUri(req.files.productImage[0]).content;
//       let image = await cloudinary.uploader.upload(pass);
//       product.productImage = image.url;
//     }

//     product.productStatus = productStatus;
//     product.variations = decodedVar;
//     product.prices = decodedPrice;
//     product.description = description;
//     product.productName = productName;

//     await product.save();

//     res.status(200).json({ message: "submitted successfully", product });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };
// exports.getProducts = async (req, res) => {
//   try {
//     const product = await Product.find();

//     res.status(200).json(product);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };

// exports.fetchCommodityRequests = async (req, res) => {
//   try {
//     const commodityRequests = await CommodityReq.find();
//     res.status(200).json(commodityRequests);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };

// exports.removeProducts = async (req, res) => {
//   // const product = await Product.find();
//   const product = await Product.deleteMany({
//     _id: {
//       $in: [req.body.id],
//     },
//   });

//   try {
//     res.status(200).json({ message: "deleted successfully", product });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };

// exports.removeCommodityReq = async (req, res) => {
//   const commodityReq = await CommodityReq.deleteMany({
//     _id: {
//       $in: [req.body.id],
//     },
//   });

//   try {
//     res.status(200).json({ message: "deleted successfully", commodityReq });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };
