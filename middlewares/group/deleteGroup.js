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

    Group.updateOne({ groupId: groupid }, { $pull: { members: userid }, $inc: { member_num: -1 } }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(400).json({
                msg: err.message
            })
        } else {
            res.json({
                msg: "Leaved Group"
            })
        }
    })

}

module.exports = deleteGroupMiddleware;