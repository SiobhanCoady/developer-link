'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};
let SearchModel = require("pg-search-sequelize");

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  let model = db[modelName];
  if (model.associate) {
    model.associate(db);
  }
  if ('referenceModel' in model.options) {
    model.referenceModel = db[model.options.referenceModel];
  }
  if ('search' in model.options) {
    db[modelName] = new SearchModel(model);
  }
  if ('customHooks' in model.options && 'afterSave' in model.options.customHooks) {
    let callback = () => model.options.customHooks.afterSave(db);
    model.afterCreate(callback);
    model.afterBulkCreate(callback);
    model.afterDestroy(callback);
    model.afterBulkDestroy(callback);
    model.afterUpdate(callback);
    model.afterBulkUpdate(callback);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
