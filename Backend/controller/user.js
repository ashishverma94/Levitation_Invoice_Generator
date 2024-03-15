const express = require("express");
const User = require("../model/user.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const sendToken = require("../utils/jwtToken.js");
const { isAuthenticated } = require("../middleware/auth.js");

const router = express.Router();

//  USER REGISTRATION
router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(email);
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      res.status(400).json("User already exists");
    }

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    const activationToken = createActivationToken({ name, email });
    user.token = activationToken;
    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// USER ACTIVATION TOKEN
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "2h",
  });
};

// LOGIN USER
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields", 400));
      }
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Wrong credentials", 400));
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// LOAD USER
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    console.log("load user user ") ;
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// LOGOUT USER
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Log out Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

module.exports = router;
