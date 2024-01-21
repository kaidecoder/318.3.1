const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const users = require("../data/users");
const error = require("../utilities/error");
const comments = require("../data/comments");

router
  .route("/:id/comments")
  //Retrieves comments made by the user with the specified id. GET /users/:id/comments

  .get((req, res, next) => {
    let user = users.filter((user) => {
      return user.id == parseInt(req.params.id);
    });
    console.log;
    let comment = comments.filter((comment) => {
      for (let item of user) {
        return comment.id == item.id;
      }
    });
    console.log(comment);
    res.send(comment);
    //Code hangs here, WHY??????
  })

  //Retrieve comments made by the user with the specified id on the post with the specified postId. GET /users/:id/comments?postId=<VALUE>
  .get((req, res) => {
    let user = users.filter((user) => {
      return user.id == req.params.id;
    });
    let post = posts.filter((p) => {
      if (p.userId == user.id) {
        return p;
      }
    });

    let comment = comments.filter(
      (comment) => comment["post.userId"] == comment["user.id"]
    );
    console.log(comment);
    res.send(comment);
    //LOST ON THIS ONE
  });

module.exports = router;
