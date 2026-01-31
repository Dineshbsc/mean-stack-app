const mysql = require('mysql2');

const sqldb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mean_db_auth'
});

sqldb.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('✅ MySQL connected Successfully');
});

module.exports = sqldb;
