const router = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ResisterValidation, LoginValidation } = require("../validation");

router.post("/resister", async (req, res) => {
  const { error } = ResisterValidation(req.body);
  if (error) return res.status(202).send(error.details[0].message);

  const existemail = await User.findOne({
    email: req.body.email
  });
  if (existemail) return res.status(400).send("Email Exist");

  // Hash Passwood
  const salt = await bcrypt.genSalt(8);
  const hashpass = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashpass,
    date: req.body.date
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/login", async (req, res) => {
  const { error } = LoginValidation(req.body);
  if (error) return res.status(202).send(error.details[0].message);

  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send("Creandatills is not write");

  // Password Check
  const pass = await bcrypt.compare(req.body.password, user.password);
  if (!pass) return res.status(400).send("Wrong Password");
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email
    },
    process.env.Token_secret
  );
  res.header("auth-token", token).send(token);
});

module.exports = router;
