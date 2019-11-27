const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const winston = require("winston");

const Op = Sequelize.Op

module.exports = app => {
  const config = app.libs.config;

  const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
      ssl: true,
      // encrypt: true,
      options: { encrypt: true, }
      // useUTC: false, // -->Add this line. for reading from database
    },
    timezone: '-03:00',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // logging: winston.error,
    // operatorsAliases: {
    //   $and: Op.and,
    //   $or: Op.or,
    //   $eq: Op.eq,
    //   $ne: Op.ne,
    //   $gt: Op.gt,
    //   $lt: Op.lt,
    //   $lte: Op.lte,
    //   $in: Op.in,
    //   $notIn: Op.notIn,
    //   $like: Op.like,
    //   $between: Op.between
    // }
  })


  db = {
    sequelize,
    Sequelize,
    models: {}
  };

  const dir = path.join(__dirname, 'models');

  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    db.models[model.name] = model;
  });

  Object.keys(db.models).forEach(key => {
    if (db.models[key].hasOwnProperty('associate')) {
      db.models[key].associate(db.models)
    }
  })

  return db;

};