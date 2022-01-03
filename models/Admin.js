const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  accessLevel: {
    type: Number,
    default: 3,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Admin", AdminSchema);
