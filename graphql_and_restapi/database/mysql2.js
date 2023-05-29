import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10,
  })
  .promise();

export async function useQuery(query, values) {
  try {
    const promisePool = pool;
    const [rows, fields] = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.log("MYsql Error:", err.message);
    throw err;
  }
}
