import pool from './connectionPool.js';

 async function createBooksTable() {
    const connection = await pool.getConnection();
    try {
        await connection.query('USE shelf_space');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS books (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                contents TEXT NOT NULL,
                created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Books table created successfully');
    } catch (e) {
        console.error('Error creating books table', e);
    } finally {
        connection.release();
    }
}

export default createBooksTable;