const multer = require("../middleware/multer");
const cloudinary = require("cloudinary");
const Pupil = require("../models/Pupils");
const Referal = require("../models/Referal");

exports.registerPupil = async (req, res) => {
  const {
    fullName,
    pupilClass,
    age,
    gender,
    schoolAddress,
    schoolName,
    schoolPhone,
    parentPhone,
    paymentOption,
    payerName,
    tellerNumber,
    amountPaid,
    paymentDate,
    bankName,
    refererId,
  } = req.body;
  try {
    let images = await handleUploads(req);

    const pupil = await Pupil.create({
      fullName,
      pupilClass,
      age,
      gender,
      schoolAddress,
      schoolName,
      schoolPhone,
      parentPhone,
      paymentOption,
      payerName,
      tellerNumber,
      amountPaid,
      paymentDate,
      bankName,
      passport: images.passport.url,
    });
    if (refererId) {
      handleReferer(refererId, pupil);
    }
    res.status(200).json({ message: "registration successful" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "something went wrong", error: err.message });
  }
};

handleUploads = async (req) => {
  let passport;

  let file1 = req.files.passport[0];

  if (req.files) {
    const pass = multer.dataUri(file1).content;

    passport = await cloudinary.uploader.upload(pass, {
      folder: "speechscience",
    });
  }
  return {
    passport,
  };
};

handleReferer = async (referalid, pupil) => {
  const id = pupil._id;

  const referal = await Referal.findOne({ username: referalid });
  const referedUser = referal.referedUsers;
  referedUser.push(id);
  referal.referedUsers = referedUser;
  referal.save();
};

// exports.generateReferalink = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.user.email });
//     let memberId = user.memberId.slice(-6);
//     let name = user.name?.split(" ")[0];
//     const newId = `${name}-${memberId}`;
//     let referal = await Referal.findOne({ username: newId });

//     if (!referal) {
//       referal = await new Referal().save();

//       referal.userId = user._id;
//       referal.username = `${name}-${memberId}`;
//       referal.save();
//     }
//     let link = `https://lmcsnigltd.org.ng/signup/?ref=${referal.username}`;
//     return res.status(200).json({ message: link });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };
// exports.getReferer = async (req, res) => {
//   const username = req.params.ref;

//   try {
//     const referal = await Referal.findOne({ username: username });
//     if (!referal) {
//       return res.status(401).json({ message: "invalid code" });
//     }

//     const user = await User.findOne({ _id: referal.userId });

//     res.status(200).json({ user });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "something went wrong", error: err.message });
//   }
// };
