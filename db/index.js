const Fleet = require('./fleet');
const Motion = require('./motion');
const Vehicle = require('./vehicle');
const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

module.exports = (Sequelize, config)=>
{
    const sequelize = new Sequelize({
        dialect: 'mysql',
        database: 'tracking',
        username: 'root',
        host: 'localhost',
        port: '3306',
        password: 'password',
        logging: true,
    })
    const fleets = Fleet(Sequelize, sequelize);
    const motions = Motion(Sequelize, sequelize);
    const vehicles = Vehicle(Sequelize, sequelize);

    motions.belongsTo(vehicles, {foreignKey: 'vehicleId', targetKey: 'id'});
    vehicles.belongsTo(fleets, {foreignKey: 'fleetId', targetKey: 'id'});


    return {
        fleets,
        motions,
        vehicles,
        sequelize: sequelize,
        Sequelize: Sequelize
    };
}