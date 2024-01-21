const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const error = require("../utilities/error");
const comments = require("../data/comments")

router
    .route("/:id/comments")
    //Retrieves all comments made on the post with the specified id. GET /posts/:id/comments
    .get((req, res) => {
        let post = posts.filter(post => {
            return post.id == parseInt(req.params.id)
        })
        console.log
        let comment = comments.filter(comment => {
            for(let item of post){
                return comment.id == item.id
            }
        })
        console.log(comment)
        res.send(comment)
        //Code hangs here, WHY??????
    })

    //Retrieves all comments made on the post with the specified id by a user with the specified userId. GET /posts/:id/comments?userId=<VALUE>
    .get((req, res) => {
        let id = parseInt(req.query.userId)
        let post = posts.filter(post => {
            return post.id == id
        })
        let comment = comments.filter(comment => {
            for(let item of post){
                return comment.id == item.id
            }
        })
        console.log(comment)
        res.send(comment)
    })
    //HANGS  WHY??????





module.exports = router