require('dotenv').load();

module.exports = {
    username:       process.env.DB_USER         || 'hihmonoexywrax',
    password:       process.env.DB_PWD          || '4cc2610c806bfe90dc16b51e737ab8066797d6082fcd2ed1348c9e67afdcd106',
    database:       process.env.DB_NAME         || 'd66kdl31pa7ecf',
    host:           process.env.DB_HOST         || 'ec2-174-129-229-162.compute-1.amazonaws.com',
    dialect:        process.env.DB_DIALECT      || 'postgres',
  };