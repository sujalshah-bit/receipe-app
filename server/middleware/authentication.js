const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authenticate = async (req, res, next) => {
  if (!req.cookies.jwt) {
    next();
  } else {
    try {
      const token = req.cookies.jwt;
      const verifyToken = jwt.verify(
        token,
       process.env.SECERET_KEY
      );
      const rootUser = await User.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });
      if (!rootUser) {
        throw new Error("User Not Found");
      }
      req.token = token;
      req.rootUser = rootUser;
      req.userID = rootUser._id;
      next();
    } catch (error) {
      res.status(401).send("Unauthorized : no token provided");

      console.log(error);
    }
  }
};

module.exports = authenticate;
