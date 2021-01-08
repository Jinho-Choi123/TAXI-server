var express = require('express');
var router = express.Router();
const Group = require('../../models/Group');

const deleteGroupMiddleware = (req, res, next) => {
    /*
    req: {
        groupId: " ",
        userId: " "
    }
    */
    const groupid = req.body.groupId;
    const userid = req.body.userId;

    Group.findOneAndDelete({ groupId: groupid, creator: userid }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(400).json({
                msg: err.message
            })
        } else {
            res.json({
                msg: "Group Deleted"
            })
        }
    })

}

module.exports = deleteGroupMiddleware;