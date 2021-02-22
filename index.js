const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoute = require("./Routes/posts");
const userRoute = require("./Routes/getUser")
dotenv.config();

mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connect");
  }
);

app.use(express.json());
const authRoute = require("./Routes/auth");

app.use("/api/user", authRoute);
app.use("/api/post", postRoute);
app.use("/api/details", userRoute);



app.listen("3006", () => {
  console.log("Hello");
});
