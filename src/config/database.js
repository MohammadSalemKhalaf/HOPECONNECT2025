import mysql2 from "mysql2";

const pool = mysql2
  .createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "hopeconnect"
  })
  .promise();

// const qry = await pool.query('SELECT * FROM orphan');
// console.log(qry[0]);

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connection has been established successfully.");
    connection.release(); // back to pool
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

export default await pool;
