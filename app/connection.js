const config 		= require('./config');
const mysqlModel 	= require('mysql-model');

const connection = mysqlModel.createConnection({
  host     : config.db_host,
  user     : config.db_user,
  password : config.db_password,
  database : config.db_database
});

module.exports = connection;