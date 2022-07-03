'use strict';
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize;
let db_name=process.env.DB_DATABASE_NAME
let db_username=process.env.DB_USERNAME
let db_password=process.env.DB_PASSWORD
const customizeConfig = {
  "dialect": "postgres",
  "logging": false,
  "query": {
    "raw": true
  },
  "timezone": "+09:00",
  "dialectOptions": {
    "ssl": {
      "require": true,
      "rejectUnauthorized": false
    }
  }
}
sequelize = new Sequelize(db_name, db_username, db_password, customizeConfig);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
