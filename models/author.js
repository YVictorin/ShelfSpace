import pool from '../database/connectionPool.js'

class Author {
    //using static classes so there is no need for instantiating, this approach is also used in Mongoose and other ORMs
    //not working with instance data like changing individual author objects, it's better to use static methods
    static async create(name) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query(`INSERT INTO authors (name) VALUES (?)`, [name])
            return result.insertId;
        } catch (e) {
            console.error('error inserting author: ', e)
        } finally {
            connection.release();
        }
    }

    static async findById(id) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query(`SELECT * FROM authors WHERE id = ?`, [id]);
            return rows;
        } catch(e) {
            console.error('Error finding author ID: ', id + "\n", e)
        } finally {
            connection.release(); //returns the connection back to the pool, making it available for other operations, if not released could led to ER_CON_COUNT_ERROR (too many connections)
        }
    }

    static async getAll() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query(`SELECT * FROM authors`);
            return rows;
        } catch (e) {
            console.error('Error fetching authors', e);
        } finally {
            connection.release();
        }
    }

    static async getCount() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query(`SELECT COUNT(name) AS count_authors FROM authors`);
            return rows;
        } catch(e) {
            console.error('Error getting the count of authors', e);
        } finally {
            connection.release();
        }
    }
}

export default Author