const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Referal = require("../models/Referal");
const Pupil = require("../models/Pupils");

exports.getReferrals = async (req, res) => {
  try {
    const referrals = await Referal.find()
      .populate({
        path: " userId",
        model: "User",
      })
      .populate([
        {
          path: "referedUsers",
          model: "User",
        },
      ]);

    res.status(200).json({ referrals });
  } catch (err) {
    res
      .status(500)
      .json({ message: "something went wrong", error: err.message });
  }
};

/*@route GET
 @desc get admin
 @access private*/

exports.getAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Admin.findOne({ _id: id });
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "something went wrong", error: err.message });
  }
};

/*@route GET
 @desc get all users
 @access private*/

exports.FetchEnrollments = async (req, res) => {
  try {
    const enrollment = await Pupil.find();

    res.status(200).json(enrollment);
  } catch (err) {
    res
      .status(500)
      .json({ message: "something went wrong", error: err.message });
  }
};

/*@route POST
 @desc Admin Creation
 @access private*/

exports.createRef = async (req, res) => {
  const { phone, fullName } = req.body;

  try {
    const existingUser = await Referal.findOne({ phone: phone });

    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }

    let number = phone.slice(-4);
    let name = fullName?.split(" ")[0];
    const username = `${name}-${number}`;

    const user = await Referal.create({
      phone,
      name: fullName,
      username,
    });

    res.status(200).json({ message: "successfully created", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

/*@route POST
 @desc login for admins
 @access public*/
exports.AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await Admin.findOne({ email: email });
  try {
    if (!existingUser)
      return res.status(404).json({ message: "user does not exist" });
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect)
      return res.status(400).json({ message: "incorrect password" });
    const token = jwt.sign(
      {
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser._id,
        accessLevel: existingUser.accessLevel,
      },
      process.env.TOKEN_SECRET
    );
    res.status(200).json({ user: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

exports.confirmEnrollment = async (req, res) => {
  const { id } = req.body;

  try {
    let user = await Pupil.findOne({
      _id: id,
    });

    if (user.confirmed)
      return res.status(400).json({ message: "user is already confirmed" });
    user.confirmed = true;
    user.save();

    res.status(200).json({ message: "user confirmed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};
