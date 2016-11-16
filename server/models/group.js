/**
 * Created by Brandon Garling on 11/15/2016.
 */
const Sequelize = require('sequelize');
const database = require('../user_modules/database');
const encryption = require('../user_modules/encryption');

const GroupMembership = require('./group_membership');
const Item = require('./item');

module.exports = {};

/**
 * A User model, this holds user information
 * @type {*}
 */
const Group = database.sequelize.define('group', {
    Name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    Color: {
        allowNull: false,
        type: Sequelize.STRING
    },
    Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
},{
    instanceMethods: {
        getSerializableFields: function() {
            return Group.getSerializableFields();
        },
    },
});

Group.hasMany(GroupMembership, {
    foreignKey: {
        name: 'GroupId',
        allowNull: false
    }
});

Group.hasMany(Item, {
    foreignKey: {
        name: 'GroupId',
        allowNull: false
    }
});

/**
 * The fields that should be serialized and sent to the client
 * @returns {[string]}
 */
Group.getSerializableFields = function () {
    return ['Id', 'Name', 'Color', 'CreatedById', 'createdAt', 'updatedAt'];
};

module.exports = Group;
