import pool from './connectionPool.js';

//mysql does not have built-in schema defintion like Mongoose so you must create tables manually
 async function createAuthorTable() {
    const connection = await pool.getConnection();
    try {
        // Seperate different queries in different .query calls
        await connection.query('USE shelf_space');

        // Create the authors table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS authors (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            )
        `);
        console.log('Author table created successfully');
    } catch (e) {
        console.error('Error creating author table', e);
    } finally {
        connection.release();
    }
}

export default createAuthorTable;