import express from 'express'
import Bookstore from '../models/bookstore.js';
const router = express.Router();

//All Books endpoint
router.get('/', async(req, res) => {
    res.send('All Books');
})

//New Book endpoint
router.get('/new', (req, res) => {
    res.send('New Books');
})


//Create an book endpoint
router.post('/',  async (req, res) => {
    res.send('Create Books');
})


export default router