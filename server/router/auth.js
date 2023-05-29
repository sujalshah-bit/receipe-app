const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const authenticate = require('../middleware/authentication')

// User Sign Up Route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body.user;
  if (!email || !password) {
    return res.status(402).json({ message: "please fill all require field" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res
        .status(422)
        .json({ message: "user already registered with this email" });
    } else {
      const user = new User({ email, password });
      await user.save();
      res.status(201).json({ message: "User signup" });
    }
  } catch (err) {
    console.log("signup Error: ", err);
  }
});

// User Login Up Route

router.post("/login", async (req, res) => {
  const { email, password } = req.body.user;
  if (!email || !password) {
    return res.status(422).json({ message: "please fill all require field" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      const isMatch = bcrypt.compare(password, userExist.password);
      if (isMatch) {
        const token = await userExist.generateAuthToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 25892000000),
          sameSite: "none",
          path: "/",
          secure: true,
        });
        res.cookie("userId", userExist._id.toString(), {
          expires: new Date(Date.now() + 25892000000),
          sameSite: "none",
          path: "/",
          secure: true,
        });
        res.send(userExist._id)
        res.status(201).json({ message: "user login successfully" });
      } else {
        res.status(402).json({ message: "Invalid Credentials" });
      }
    } else {
      res.status(402).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log("login Error: ", err);
  }
});

router.get('/',authenticate, (req,res)=>{
    if (!req.rootUser) {
      res.status(402).json({ message: "token is not assigned" });
    } else {
      res.send(req.rootUser);
    }
})
router.get('/logout', (req, res) => {
  res.clearCookie('jwt', {
    sameSite: 'none',
    path: '/',
    secure: true,
  });

  res.clearCookie('userId', {
    sameSite: 'none',
    path: '/',
    secure: true,
  });

  res.status(200).json({ message: 'Cookies deleted' });
});

module.exports = router;
