const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');

/* GET items listing. */
router.get('/api/v1/items', function(req, res, next) {
    res.type('json');
    Item.findAll()
        .then(serializer.serializeModels)
        .then(restUtils.prepareResponse)
        .then(payload => restUtils.sendResponse(payload, req, res))
        .catch(error => restUtils.catchErrors(error, req, res));
});

/* Add a new item */
router.post('/api/v1/items', function(req, res, next) {
    let data = {
        'Name': req.body.Name,
        'Quantity': req.body.Quantity,
        'Cost': req.body.Cost,
        'Category': req.body.Category,
        'Due': req.body.Due,
        'GroupId': req.body.GroupId,
        'DateCompleted': req.body.DateCompleted,
        'Completed': req.body.Completed,
        'CompletedById': req.body.CompletedById,
        'CreatedById': req.session.userId
    };

    let newEntity = Item.build();

    newEntity['Name'] = data.Name;
    newEntity['Quantity'] = data.Quantity;
    newEntity['Cost'] = data.Cost;
    newEntity['Category'] = data.Category;
    newEntity['Due'] = data.Due;
    newEntity['GroupId'] = data.GroupId;
    newEntity['CreatedById'] = data.CreatedById;
    newEntity['DateCompleted'] = data.DateCompleted;
    newEntity['Completed'] = data.Completed;
    newEntity['CompletedById'] = data.CompletedById;

    newEntity.save()
        .then(serializer.serializeModel)
        .then(restUtils.prepareResponse)
        .then(payload => restUtils.sendResponse(payload, req, res))
        .catch(error => restUtils.catchErrors(error, req, res))
});

/* Modify an existing item */
router.put('/api/v1/items/:id', function(req, res, next) {
    let params = {
        'UserId': req.session.userId,
        'id': req.params.id
    };

    let data = {
        'Name': req.body.Name,
        'Quantity': req.body.Quantity,
        'Cost': req.body.Cost,
        'Category': req.body.Category,
        'Due': req.body.Due,
        'GroupId': req.body.GroupId,
        'DateCompleted': req.body.DateCompleted,
        'Completed': req.body.Completed,
        'CompletedById': req.body.CompletedById
    };

    Item.findOne({
        where: {
            id: params.id
        }
    })
        .then(entity => {
            if (entity === null)
                throw "Entity does not exist";

            entity['Name'] = data.Name;
            entity['Quantity'] = data.Quantity;
            entity['Cost'] = data.Cost;
            entity['Category'] = data.Category;
            entity['Due'] = data.Due;
            entity['GroupId'] = data.GroupId;
            entity['DateCompleted'] = data.DateCompleted;
            entity['Completed'] = data.Completed;
            entity['CompletedById'] = data.CompletedById;

            return entity;
        })
        .then(entity => entity.save())
        .then(serializer.serializeModel)
        .then(restUtils.prepareResponse)
        .then(payload => restUtils.sendResponse(payload, req, res))
        .catch(error => restUtils.catchErrors(error, req, res))
});

/* Delete item */
router.delete('/api/v1/items/:id', function(req, res, next) {
    let params = {
        'UserId': req.session.userId,
        'id': req.params.id
    };

    Item.destroy({
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
