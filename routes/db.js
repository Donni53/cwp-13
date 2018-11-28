const db = {};
db.Sequelize = require('sequelize');
db.db = require('../models')(db.Sequelize, db.config);

module.exports = db;