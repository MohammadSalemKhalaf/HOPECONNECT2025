import mysql2 from 'mysql2';

const pool = mysql2.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD ||'123456',
    database: process.env.DB_NAME ||'hopeconnect'
}).promise();


// const qry = await pool.query('SELECT * FROM orphan');
// console.log(qry[0]);



export default await pool;