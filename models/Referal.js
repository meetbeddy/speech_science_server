const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReferalSchema = new Schema({
  name: String,
  phone: String,
  referedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pupil",
    },
  ],
  username: { type: String },
});

module.exports = mongoose.model("Referal", ReferalSchema);
