const mongoose = require("mongoose");
const { Schema } = mongoose;

const pupilSchema = new Schema(
  {
    fullName: { type: String, required: true },
    pupilClass: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    schoolName: { type: String, required: true },
    schoolAddress: { type: String, required: true },
    schoolPhone: { type: String, required: true },
    parentPhone: { type: String, required: true },
    passport: { type: String, required: true },
    paymentOption: { type: String, required: true },
    payerName: { type: String, required: true },
    tellerNumber: String,
    amountPaid: { type: String, required: true },
    paymentDate: { type: String, required: true },
    bankName: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    tag: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pupil", pupilSchema);
