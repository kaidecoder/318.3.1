const express = require("express");
const router = express.Router();
const _ = require("lodash")

const posts = require("../data/posts");
const users = require("../data/users")
const comments = require("../data/comments")
const error = require("../utilities/error");


router
    .route("/")
    //Retrieves comments by the user with the specified userId. GET /comments?userId=<VALUE>
    .get((req, res, next) => {
        const comment = comments.find(c => {
            return c.userId == parseInt(req.query.userId)
        })

        if(comment){
        res.send(comment)
    }else{
        next(error(400, "User has no Comments"))
    }
    })

    //Get all comments GET /comments
    .get((req, res, next) => {
        comments.forEach(comment => {
            console.log(comment)
        })
        res.send("GET ALL", comments)
        next()
    })
    // res.status(status).send(body)

    //Post a new comment object POST /comments
    .post((req, res, next) => {
            let id = _.uniqueId()
            let userId = _.uniqueId() + 50
            let postId = _.uniqueId() + 50
            let body = req.body.comment
            let obj = { id, userId, postId, body };
        comments.push(obj);
        // res.status(201).json(obj);
        console.log("POST ONE", comments);
        // next(error(400, "Insufficient Data"))
        
    })

router
    .route("/:id")
    //Retrieves the comment with the specified id. GET /comments/:id
    .get((req, res, next) => {
        const comment = comments.find(c => {
            return c.id == parseInt(req.params.id)
        })
        console.log("GET ONE", comment)
        res.send(comment)
    })

    //Update a comment with the specified id with a new body. PATCH /comments/:id
    .patch((req, res) => {
        let id = parseInt(req.params.id);
        let body = req.body.comment;
        let idx = comments.findIndex(item => item.id === id);
        comments[idx].body = body;
        res.status(200).json(comments[idx]);
        console.log("PATCH", comments);
    })

    // Delete a comment with the specified id. DELETE /comments/:id
    .delete((req, res, next) => {
        let id = req.params.id;
        const comment = comments.filter(item => item.id == id);
        res.status(204).end()
        console.log("DELETE ONE", comment);
        next()
    })

module.exports = router