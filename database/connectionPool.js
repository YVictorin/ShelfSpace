import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config();

const createDatabaseIfNotExists = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    })

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    } catch (e) {
        console.log(`Error creating database ${process.env.DB_NAME}`, e)
    } finally {
        await connection.end(); //ending standalone connection since this is not a connection pool
    }
}

await createDatabaseIfNotExists();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default pool;
