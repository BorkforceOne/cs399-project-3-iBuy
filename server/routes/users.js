const express = require('express');
const router = express.Router();
const User = require('../models/user');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');

/* GET users listing. */
router.get('/api/v1/users', function(req, res, next) {
    res.type('json');
    User.findAll()
        .then(serializer.serializeModels)
        .then(restUtils.prepareResponse)
        .then(payload => restUtils.sendResponse(payload, req, res))
        .catch(error => restUtils.catchErrors(error, req, res));
});

/* Add a new user */
router.post('/api/v1/users', function(req, res, next) {
    res.type('json');
    let newEntity = User.build();

    newEntity['Firstname'] = req.body.Firstname;
    newEntity['Lastname'] = req.body.Lastname;
    newEntity['Email'] = req.body.Email;

    newEntity.changePassword(req.body.Password)
        .then(entity => entity.save())
        .then(serializer.serializeModel)
        .then(restUtils.prepareResponse)
        .then(payload => restUtils.sendResponse(payload, req, res))
        .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
