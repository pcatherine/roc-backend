require('dotenv').load();

module.exports = {
    username:       process.env.DB_USER         || 'pybvvpccmytcmf',
    password:       process.env.DB_PWD          || 'ce1a09269e86e51e4696b325a44138790e2c882a7c1e0450baaba40fa6748784',
    database:       process.env.DB_NAME         || 'ddcbqlc0tnv1p',
    host:           process.env.DB_HOST         || 'ec2-174-129-254-231.compute-1.amazonaws.com',
    dialect:        process.env.DB_DIALECT      || 'postgres',
  };