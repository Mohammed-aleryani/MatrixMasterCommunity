const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  res.render("reg", {
    success: null,
    err: null,
  });
};

const loginUser = async (req, res) => {
  let existedUser = await userSchema.findOne({ email: req.body.email });
  if (existedUser) {
    let correctPassword = await bcrypt.compare(
      req.body.password,
      existedUser.password
    );

    if (correctPassword) {
      let userId = existedUser._id;
      let token = await jwt.sign({ userId }, "just jwt token for node");
      res.cookie("jwt", token);
      let currentUser = {
        email: existedUser.email,
      };
      res.cookie("current_user", currentUser);
      res.redirect("/");
    } else {
      res.render("login", {
        err: "password is not correct",
      });
    }
  } else {
    res.render("login", {
      err: "user is not exist please sign up first!",
    });
  }
};

const login = (req, res) => {
  res.render("login", {
    err: null,
  });
};

const logOut = (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("current_user");
  res.redirect("/login");
};

const createUser = async (req, res) => {
  let existedUser = await userSchema.findOne({ email: req.body.email });
  console.log(existedUser);
  if (existedUser) {
    res.render("reg", {
      success: null,
      err: "user is already exist",
    });
  } else {
    let hashedPass = await bcrypt.hash(req.body.password, 10);
    let newUser = {
      ...req.body,
      password: hashedPass,
      repeatPassword: hashedPass,
    };
    let user = new userSchema(newUser);
    user
      .save()
      .then(() => {
        console.log("New user has been added");
        res.render("reg", {
          success: "you have been registered",
          err: null,
        });
      })
      .catch((err) => {
        res.render("reg", {
          success: null,
          err: "user is already exist",
        });
      });
  }
};

module.exports = {
  register,
  login,
  createUser,
  loginUser,
  logOut,
};
