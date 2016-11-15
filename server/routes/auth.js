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
router.post('/api/v1/auth/login', function(req, res, next) {
    let foundUser = null;
    res.type('json');
    User.findOne({
        where: {
            Email: req.body.Email
        }
    })
        .then(user => {
            if (user === null)
                throw "Invalid email or password";
            foundUser = user;
            return user;
        })
        .then(user => encryption.validiateHash(req.body.Password, user.Salt, user.Password))
        .then(result => {
            if (result === false)
                throw "Invalid email or password";
            let serialized = serializer.serializeModel(foundUser);
            let response = restUtils.prepareResponse(serialized);
            req.session.userId = foundUser.id;

            res.send(JSON.stringify(response));
        })
        .catch(function (err) {
            let response = restUtils.prepareResponse({}, [err]);
            res.send(JSON.stringify(response));
        });
});

/* LOGOUT REQUEST */
router.post('/api/v1/auth/logout', function(req, res, next) {
    console.log(req.session.userId);
    req.session.destroy();
    res.type('json');
    let response = restUtils.prepareResponse({}, []);
    res.send(JSON.stringify(response));
});


module.exports = router;
