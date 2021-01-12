const dotenv = require('dotenv');
var express = require('express');
var router = express.Router();
const User = require('../../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const verify = (password, hash) => {
    const hash_ = crypto.pbkdf2Sync(password, (process.env.PASSWORD_HASH_SALT).toString('base64'), 90194, 64, 'sha512').toString('base64');
    return hash_ === hash;
}

const loginMiddleware = (req, res, next) => {
    /**
    req: {
        userId: " ",
        userPassword: " "
    }
     */
    const userid = req.body.userId;
    const userpassword = req.body.userPassword;

    const check = (data) => {
        if (data == null) {
            res.send({ msg: "No such ID or PASSWORD", success: false });
        } else {
            if (verify(userpassword.toString('base64'), data.userPassword.toString('base64'))) {
                //login success. 
                return new Promise((resolve, reject) => {
                    jwt.sign({
                            userId: userid
                        },
                        process.env.JWT_SECRET, {
                            expiresIn: '24h',
                            issuer: 'zinos.xyz',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            else resolve(token)
                        }
                    )
                })

            } else {
                res.status(201).json({
                    msg: "login failed",
                    success: false
                })
            }
        }
    }


    const respond = (token) => {
        return res.json({
            msg: 'logged in successfully',
            success: true,
            jwt: token
        })
    }

    const onError = (err) => {
        return res.status(405).json({
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