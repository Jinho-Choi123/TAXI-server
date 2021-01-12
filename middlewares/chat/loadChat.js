var express = require('express');
var router = express.Router();

const Chat = require('../../models/Chat');

const loadChatMiddleware = (req, res, next) => {
    /*
    req: {
        roomId: " "
    }
    */
    const roomid = req.body.roomId;
    console.log(roomid);
    Chat.find({ roomId: roomid }, (err, data) => {
        console.log(data[0]);
        if (err) throw err;
        else {
            res.json({ data: data[0].content });
        }
    })
}

module.exports = loadChatMiddleware;