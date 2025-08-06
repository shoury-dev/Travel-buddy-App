// Database Switcher - Choose your database type
const DATABASE_TYPE = process.env.DATABASE_TYPE || 'local'; // 'local' or 'mongo'

let database;

if (DATABASE_TYPE === 'mongo') {
  database = require('./mongoDatabase');
  console.log('🔄 Using MongoDB Database');
} else {
  database = require('./localDatabase');
  console.log('🔄 Using Local JSON Database');
}

module.exports = database;
