const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const controller = require("./controller/main");
const userController = require("./controller/userController");
require("dotenv").config();
const auth = require("./auth");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Connecting the DB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.get("/", auth.isLoggedIn, controller.homePage);
app.get("/add-question", controller.addQuestion);
app.post("/new-question", controller.addNewQuestion);
app.get("/question/:id", controller.seeMore);

app.get("/delete-question/:id", controller.deleteQuestion);
app.get("/edit-page/:id", controller.editQuestion);
app.post("/update-question/:id", controller.updateQuestion);
app.get("/edit-comment/:id", controller.editComment);

app.get("/register", auth.checkAuth, userController.register);
app.get("/login", auth.checkAuth, userController.login);
app.post("/create-user", userController.createUser);
app.post("/login-user", userController.loginUser);
app.get("/logged-out", userController.logOut);
app.post("/add/:id/comment", controller.addComment);
app.get("/deleteComment/:id", controller.deleteComment);
app.post("/update-comment/:id", controller.updateComment);

const port = 4000;
app.listen(process.env.PORT || port, () =>
  console.log(`server running on ${port}`)
);
