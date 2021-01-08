var express = require('express');
var router = express.Router();
const Group = require('../../models/Group');
const Chat = require('../../models/Chat');

const createGroupMiddleware = (req, res, next) => {
    /*
    req: {
        userId: " ",
        time: " ",
        startPoint: " ",
        endPoint: " ",
    }
    */

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    let today = new Date();
    const groupid = today.getFullYear().toString() + today.getMonth().toString() + today.getTime().toString() + makeid(40);
    const time = req.body.time;
    const startpoint = req.body.startPoint;
    const endpoint = req.body.endPoint;
    const member = [req.body.userId];
    const creator = req.body.userId;

    const group = new Group({
        groupId: groupid,
        startPoint: startpoint,
        endPoint: endpoint,
        time: time,
        members: member,
        creator: creator
    })

    const chat = new Chat({
        roomId: groupid,
        content: []
    })

    group.createIndex()

    group.save()
        .then(() => {
            chat.save()
                .then(() => {
                    res.send({ msg: "Creating Group success!!" });
                })
        })
        .catch((err) => {
            throw err;
        })

}

module.exports = createGroupMiddleware;