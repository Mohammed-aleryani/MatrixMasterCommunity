const userQuestion = require("../models/question");
const commentModel = require("../models/comments");

const homePage = (req, res) => {
  userQuestion
    .find()
    .then((data) => {
      res.render("home", {
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const addQuestion = (req, res) => {
  res.render("addQuestion");
};

const addNewQuestion = (req, res) => {
  const current_user = req.headers.cookie.split("; ")[1];
  let questionObj = {
    title: req.body.title,
    description: req.body.description,
    owner: current_user,
  };
  let newQuestion = userQuestion(questionObj);
  newQuestion
    .save()
    .then(() => {
      console.log(newQuestion);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const seeMore = (req, res) => {
  const current_user = req.headers.cookie.split("; ")[1];
  userQuestion
    .findById(req.params.id)
    .populate("comments")
    .then((question) => {
      res.render("question.ejs", {
        question: question,
        current_user: current_user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteQuestion = (req, res) => {
  userQuestion
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const editQuestion = (req, res) => {
  userQuestion
    .findById(req.params.id)
    .then((question) => {
      if (question) {
        res.render("editPage", {
          question: question,
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const updateQuestion = (req, res) => {
  userQuestion.findById(req.params.id).then((question) => {
    (question.title = req.body.title),
      (question.description = req.body.description);

    question
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const addComment = (req, res) => {
  const current_user = req.headers.cookie.split("; ")[1];
  console.log(current_user);
  let commentObj = {
    comment: req.body.comment,
    owner: current_user,
  };
  let newComment = new commentModel(commentObj);
  newComment.user = req.params.id;

  newComment
    .save()
    .then((comment) => {
      userQuestion
        .findById(req.params.id)
        .populate("comments")
        .then((question) => {
          question.comments.push(comment);
          question.save();
          console.log(newComment);
          res.redirect(`/question/${question._id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteComment = (req, res) => {
  commentModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("back");
    })
    .catch((err) => {
      console.log(err);
    });
};

const editComment = (req, res) => {
  commentModel
    .findById(req.params.id)
    .then((comment) => {
      if (commentModel) {
        res.render("commentEditPage", {
          comment: comment,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateComment = (req, res) => {
  console.log(req.body);
  commentModel.findById(req.params.id).then((comment) => {
    comment.comment = req.body.comment;

    comment
      .save()
      .then(() => {
        res.redirect(`/question/${comment.user._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = {
  homePage,
  addQuestion,
  addNewQuestion,
  seeMore,
  addComment,
  deleteQuestion,
  deleteComment,
  editQuestion,
  updateQuestion,
  editComment,
  updateComment,
};
