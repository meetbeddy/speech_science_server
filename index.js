const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinaryConfig = require("./configs/cloudinaryConfig").cloudConfig;

const user = require("./routes/api/user");
const admin = require("./routes/api/admin");

const env = require("dotenv");
env.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(resolve(__dirname, "public")));
app.use("*", cloudinaryConfig);

//database connect
// const db = "mongodb://localhost:27017/finapp";
const db = process.env.DB_URI;

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

//handle route
app.use("/api/user", user);
app.use("/api/admin", admin);

//start app
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));
