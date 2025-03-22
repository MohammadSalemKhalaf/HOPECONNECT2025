import mysql2 from 'mysql2';

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'hopeconnect'
}).promise();


// const qry = await pool.query('SELECT * FROM orphan');
// console.log(qry[0]);



export default await pool;