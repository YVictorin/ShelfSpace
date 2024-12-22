// if (process.env.NODE_ENV !== 'production') {
//     //must use dynamic imports to add import in a conditional
//     await import('dotenv').then((dotenv) => dotenv.config());
// }

import mysql from 'mysql2'
import dotenv from 'dotenv';
dotenv.config();

// a pool is a collection of connections to the db, instead of making a brand new connection for each and every query, can be reused
const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise() //allows you to use the promise api versionof mysql meaning async/await

export async function getBooks() {
    const [rows] = await pool.query("SELECT * FROM books")
    return rows
}

export async function getBook(id) {

// this is bad practice including user info directing into queries
//     const [book] = await pool.query(`
//     SELECT * 
//     FROM books
//     WHERE id = ${id}  
// `, [id])


//this is called a prepared statement: sending the sql and the values to the db completely seperately by using ?
//since this is likely coming over an http request it's untrusted data which cause sql injection attacks meaning people can get any sort of data they want from your db  
    const [book] = await pool.query(`
        SELECT * 
        FROM books
        WHERE id = ?   
    `, [id])
    return book[0]; //since select statements always return an array do an index at 0 to get the first object
}

export async function createBook(title, content) {
    const [result] = await pool.query(`
    INSERT INTO books (title, contents)
    VALUES (?, ?)
    `, [title, content])
    const id = result.insertId;
    return getBook(id)
}

// const result = await createBook('hakomari', 'time-traveling experience')
// console.log(result);

// const book = await getBook(1);
// console.log(book);