var express = require('express');
var router = express.Router();
const User = require('../../models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');

const registerMiddleware = (req, res, next) => {
    const userid = req.body.userId;
    const userpassword = req.body.userPassword;
    const isteacher = req.body.isTeacher;

    //check if userid already exists in the db
    User.findOne({ userId: userid }, (err, data) => {
        if (err) {
            res.send({ msg: err });
        } else {
            if (data != null) {
                res.send({ msg: "user ID already exists" });
                return;
            } else {
                crypto.pbkdf2(userpassword, (process.env.PASSWORD_HASH_SALT).toString('base64'), 90194, 64, 'sha512', (err, key) => {
                    if (err) throw err;
                    else {
                        const user = new User({
                            userId: userid,
                            userPassword: key.toString('base64'),
                            isTeacher: isteacher
                        })
                        user.save();
                    }
                })

                res.send({ msg: "success" });
                return;
            }
        }
    })


}

module.exports = registerMiddleware;