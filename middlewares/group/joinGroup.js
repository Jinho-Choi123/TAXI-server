var express = require('express');
var router = express.Router();

const Group = require('../../models/Group');

const joinGroupMiddleware = (req, res, next) => {
    /**
    req: {
        groupId: " ",
        userId: " "
    }
     */

    const groupid = req.body.groupId;
    const userid = req.body.userId;

    Group.findOne({ groupId: groupid }, async(err, data) => {
        if (err) throw err;

        if (data.members.length >= 4) return res.json({ msg: "Group is filled." })
        else if (data.members.includes(userid)) return res.json({ msg: "Already joined" })
        else {
            await Group.updateOne({ groupId: groupid }, { $push: { members: userid } })
            return res.json({ msg: "Joined Group!" });
        }
    })
}

module.exports = joinGroupMiddleware;