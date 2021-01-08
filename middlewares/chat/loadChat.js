var express = require('express');
var router = express.Router();

const Chat = require('../../models/Chat');

const loadChatMiddleware = (req, res, next) => {
    /*
    req: {
        roomId: " "
    }
    */
    const roomid = req.roomId;
    Chat.find({ roomId: roomid }, (err, data) => {
        if (err) throw err;
        else {
            res.send(data.content);
        }
    })
}