/**
 * Created by Brandon Garling on 11/15/2016.
 */
const Sequelize = require('sequelize');
const database = require('../user_modules/database');

module.exports = {};

/**
 * An Item model
 * @type {*}
 */
const Item = database.sequelize.define('item', {
    Name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    Quantity: {
        allowNull: false,
        type: Sequelize.REAL
    },
    Cost: {
        allowNull: false,
        type: Sequelize.DOUBLE
    },
    Category: {
        allowNull: false,
        type: Sequelize.STRING
    },
    Due: {
        allowNull: false,
        type: Sequelize.DATE
    },
    Completed: {
        type: Sequelize.BOOLEAN
    },
    DateCompleted: {
        type:Sequelize.DATE
    }
},{
    instanceMethods: {
        getSerializableFields: function() {
            return Item.getSerializableFields();
        }
    },
});

/**
 * The fields that should be serialized and sent to the client
 * @returns {[string]}
 */
Item.getSerializableFields = function () {
    return ['id', 'CreatedById', 'CompletedById', 'GroupId', 'DateCompleted', 'Completed', 'Quantity', 'Cost', 'Category', 'Due', 'createdAt', 'updatedAt'];
};

module.exports = Item;
