const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
const { MODERATOR_LEVEL } = require("../constants/accessLevel");

const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  accessLevel: {
    type: Number,
    default: MODERATOR_LEVEL,
  },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
