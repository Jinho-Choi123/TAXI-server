var express = require('express');
var router = express.Router();

const Group = require('../../models/Group');

const myPageMiddleware = (req, res, next) => {
    /*
    req: {
        userId: " "
    }
    */
    console.log(req);
    const userid = req.body.userId;
    console.log("user id is " + userid);

    Group.find({ members: { $elemMatch: { $eq: userid } } })
        .then((data) => {
            res.json({
                data: data
            })
        })
        .catch((err) => {
            throw err;
        })
}

module.exports = myPageMiddleware;