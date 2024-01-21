const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const error = require("../utilities/error");

router
    //ROUTE /api/posts - all the posts
  .route("/")
  .get((req, res) => {
    //Retrieve all posts by a user with the specified postId
    //GET /api/posts?userId=<VALUE>
    // http://localhost:3000/api/posts?userId=1?&api-key=perscholas
    const userPosts = posts.filter(post => {
        return post.userId == parseInt(req.query.userId)
    })
    if(userPosts){
        res.send(userPosts)
    }else{
        next(error(400, "User has no Posts"))
    }
    const links = [
      {
        href: "posts/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ posts, links });
  })
  //Create all posts
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  //ROUTE /api/posts/:id A single user
  .route("/:id")
  //READ - a single user
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    
    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (post) res.json({ post, links });
    else next();
  })
  //Update a single user
  .patch((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })

  //Delete a single user
  .delete((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });



module.exports = router;
