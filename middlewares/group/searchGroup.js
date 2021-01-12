var express = require('express');
var router = express.Router();
const Group = require('../../models/Group');
const axios = require('axios');

const searchGroupMiddleware = (req, res, next) => {
    /*
    req: {
        endpointaddress: " ",
        matchdate: " ",
    }
    */
    const request = req.body;
    const morning = new Date(request.matchdate);
    morning.setSeconds(1);
    morning.setHours(0);
    morning.setMinutes(0);

    const midnight = new Date(request.matchdate);
    midnight.setSeconds(59);
    midnight.setHours(23);
    midnight.setMinutes(59);

    const endpointAddr = req.body.endpointaddress;

    axios.post('http://localhost:8080/geo/search', {
            address: endpointAddr
        })
        .then((response) => {
            if (response.data.status) {
                const endpoint = response.data.location;
                const lattitude = endpoint.coordinates[1];
                const longitude = endpoint.coordinates[0];

                Group.find({
                    time: { $gte: morning, $lt: midnight },
                    endPoint: {
                        $near: {
                            $maxDistance: 300,
                            //$geometry: endpoint
                            $geometry: {
                                type: 'Point',
                                coordinates: [longitude, lattitude]
                            }
                        }
                    },
                    member_num: {
                        $lt: 4,
                        $gte: 1
                    }
                }, (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        res.json({ data: data });
                    }
                })

            } else {
                res.status(201).json({});
            }
        })
        .catch((err) => {
            throw err;
        })



}

module.exports = searchGroupMiddleware;