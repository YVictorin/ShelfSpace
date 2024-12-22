import express from 'express'
import Author from '../models/author.js';
const router = express.Router();

//All authors endpoint
router.get('/', (req, res) => {
    res.render('authors/index')
})

//New author endpoint
router.get('/new', (req, res) => {
    res.render('authors/new', {author: {name: ''} }) //name represents an empty Author object doing this because we have a static class for author
})


//To create an author endpoint
router.post('/', async (req, res) => {

    //you need to npm i body-parser first in order to have parse the .body property
     //.body is the body of the form that is posting and .name is the name attribute of the input in that form
     const userAuthorName = req.body.name; //explicitly tell the server which params we want to accept i.e only name 

    //Form validation for input
    if(!userAuthorName || typeof userAuthorName !== 'string' || userAuthorName.trim() === '') {
        return res.status(400).render('author/new', {
            errorMessage: 'Name is required and must be a valid string',
        })
    }

    try {
        const newAuthorId = await Author.create(userAuthorName);
        // res.redirect(`/authors/${newAuthorId}`);
        res.redirect(`authors`);
    } catch(e) {
        console.error('Error creating author: ', e);
        res.status(500).render('authors/new', {
            errorMessage: 'Error creating Author, Please try again',
    
        })
    }

})


export default router