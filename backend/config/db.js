import mysql from 'mysql2';
require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'selvakathir',
  database: 'candidate_database'
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('MySQL connected');
  }
});

export default db;
