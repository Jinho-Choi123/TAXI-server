const dotenv = require('dotenv');
var express = require('express');
var router = express.Router();
const User = require('../../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const verify = (password, hash) => {
    const hash_ = crypto.pbkdf2Sync(password, (process.env.PASSWORD_HASH_SALT).toString('base64'), 90194, 64, 'sha512').toString('base64');
    console.log(hash + "\n");
    console.log(hash_ + "\n");
    return hash_ === hash;
}

const loginMiddleware = (req, res, next) => {
    console.log("got auth login request");
    const userid = req.body.userId;
    const userpassword = req.body.userPassword;
    console.log(userid);
    console.log(userpassword);

    const check = (data) => {
        if (data == null) {
            res.send({ msg: "No such ID or PASSWORD", success: false });
            return;
        } else {
            if (verify(userpassword.toString('base64'), data.userPassword.toString('base64'))) {
                console.log("gooooooooooooood");
                //login success. 
                const p = new Promise((resolve, reject) => {
                    jwt.sign({
                            userId: userid,
                            isTeacher: data.isteacher
                        },
                        process.env.JWT_SECRET, {
                            expiresIn: '24h',
                            issuer: 'zinos.xyz',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token)
                        }
                    )
                })

                return p;
            } else {
                console.log("hellllllllllllllllo");
                res.status(201).json({
                    msg: "login failed",
                    success: false
                })
            }
        }
    }


    const respond = (token) => {
        res.json({
            msg: 'logged in successfully',
            success: true,
            jwt: token
        })
    }

    const onError = (err) => {
        res.status(403).json({
            msg: err.message,
            success: false

        })
    }

    User.findOne({ userId: userid })
        .then(check)
        .then(respond)
        .catch(onError)
}

module.exports = loginMiddleware;