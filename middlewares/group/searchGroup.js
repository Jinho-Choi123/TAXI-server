var express = require('express');
var router = express.Router();
const Group = require('../../models/Group');

const searchGroupMiddleware = (req, res, next) => {
    /*
    req: {
        endPoint: " ",
        time: " ",

    }
    */
    const time = new Date(req.body.time);
    console.log(time);
    const endpoint = req.body.endPoint;

    var add_minutes = function(dt, minutes) {
        return new Date(dt.getTime() + minutes * 60000);
    }

    const time1 = add_minutes(time, 30);
    const time2 = add_minutes(time, -30);
    console.log(time1);
    console.log(time2);

    Group.find({
        time: { $gte: time2, $lt: time1 },
        endPoint: {
            $near: {
                $maxDistance: 500,
                $geometry: endpoint
            }
        },
        members: {
            $size: {
                $lt: 4
            }
        }


    }, (err, data) => {
        console.log(data);
        if (err) throw err;
        else {
            res.json(data);
        }
    })

}

module.exports = searchGroupMiddleware;