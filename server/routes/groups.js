const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');

/* GET groups listing. */
router.get('/api/v1/groups', function(req, res, next) {
    let params = {
        'UserId': req.session.userId
    };

    Group.findAll()
        .then(serializer.serializeModels)
        .then(restUtils.prepareResponse)
        .then(payload => restUtils.sendResponse(payload, req, res))
        .catch(error => restUtils.catchErrors(error, req, res));
});

/* Add a new group */
router.post('/api/v1/groups', function(req, res, next) {
    let data = {
        'Name': req.body.Name,
        'Color': req.body.Color,
        'CreatedById': req.session.userId
    };

    let newEntity = Group.build();

    newEntity['Name'] = data.Name;
    newEntity['Color'] = data.Color;
    newEntity['CreatedById'] = data.CreatedById;

    newEntity.save()
        .then(serializer.serializeModel)
        .then(restUtils.prepareResponse)
        .then(payload => restUtils.sendResponse(payload, req, res))
        .catch(error => restUtils.catchErrors(error, req, res))
});


/* Modify an existing group */
router.put('/api/v1/groups/:id', function(req, res, next) {
    let params = {
        'UserId': req.session.userId,
        'id': req.params.id
    };

    let data = {
        'Name': req.body.Name,
        'Color': req.body.Color
    };

    Group.findOne({
        where: {
            id: params.id
        }
    })
        .then(entity => {
            if (entity === null)
                throw "Entity does not exist";

            entity['Name'] = data.Name;
            entity['Color'] = data.Color;

            return entity;
        })
        .then(entity => entity.save())
        .then(serializer.serializeModel)
        .then(restUtils.prepareResponse)
        .then(payload => restUtils.sendResponse(payload, req, res))
        .catch(error => restUtils.catchErrors(error, req, res))
});

/* Delete group */
router.delete('/api/v1/groups/:id', function(req, res, next) {
    let params = {
        'UserId': req.session.userId,
        'id': req.params.id
    };

    Group.destroy({
        where: {
            id: params.id
        }
    })
        .then((success) => {
            if (success)
                return {};
            else
                throw "Entity does not exist";
        })
        .then(restUtils.prepareResponse)
        .then(payload => restUtils.sendResponse(payload, req, res))
        .catch(error => restUtils.catchErrors(error, req, res));
});

module.exports = router;
