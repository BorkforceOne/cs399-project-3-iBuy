/**
 * Created by Brandon Garling on 11/14/2016.
 */
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');
const encryption = require('../user_modules/encryption');

/* LOGIN REQUEST */
router.post('/api/v1/auth', function(req, res, next) {
    res.type('json');
    User.findOne({
        where: {
            Email: req.body.Email
        }
    })
        .then(user => {
            console.log(user);
            if (user === null)
                throw "User does not exist";
            return user;
        })
        .then(user => encryption.validiateHash(req.body.Password, user.Salt, user.Password))
        .then(result => {
            console.log(result);
            let response = restUtils.prepareResponse({}, ["Done"]);
            res.send(JSON.stringify(response));
        })
        .catch(function (err) {
            let response = restUtils.prepareResponse({}, [err]);
            res.send(JSON.stringify(response));
        });
});

module.exports = router;
