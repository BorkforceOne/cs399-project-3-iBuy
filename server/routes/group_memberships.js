const express = require('express');
const router = express.Router();
const GroupMembership = require('../models/group_membership');
const serializer = require('../user_modules/serializer');
const restUtils = require('../user_modules/rest-utils');

/* GET group memberships listing. */
router.get('/api/v1/group-memberships', function(req, res, next) {
    let params = {
        'UserId': req.session.userId
    };

    GroupMembership.findAll({
        where: {
            UserId: params.UserId
        }
    })
        .then(serializer.serializeModels)
        .then(restUtils.prepareResponse)
        .then(payload => restUtils.sendResponse(payload, req, res))
        .catch(error => restUtils.catchErrors(error, req, res));
});

/* Add a new group membership */
router.post('/api/v1/group-memberships', function(req, res, next) {
  let newEntity = GroupMembership.build();

  newEntity['UserId'] = req.body.UserId;
  newEntity['GroupId'] = req.body.GroupId;

  newEntity.save()
      .then(serializer.serializeModel)
      .then(restUtils.prepareResponse)
      .then(payload => restUtils.sendResponse(payload, req, res))
      .catch(error => restUtils.catchErrors(error, req, res))
});

/* Delete group membership */
router.delete('/api/v1/group-memberships/:id', function(req, res, next) {
    let params = {
        'id': req.params.id
    };

    GroupMembership.destroy({
        where: {
            UserId: params.UserId,
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
