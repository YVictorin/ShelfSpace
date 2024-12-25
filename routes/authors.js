import express from 'express'
import Bookstore from '../models/bookstore.js';
const router = express.Router();

//All authors endpoint
router.get('/', async(req, res) => {

    //since this is a get route, use .query instead of .body which is for post routes in order to access the params
    if(req.query.name === null || req.query.name === '') {
        res.render('authors/index', {
            errorMessage: 'You must enter a name to search for'
        })
    } 
    try {
        const authors = await Bookstore.findAuthorByName(req.query.name);
        res.render('authors/index', {
            author: authors,
            searchOption: req.query
        }) 
    } catch(e) {
        res.redirect('/');
        console.error("Could not get all authors: ", e)
    }
   
})

//New author endpoint
router.get('/new', (req, res) => {
    res.render('authors/new', {author: { name: '' } }) //name will represent an empty Author object doing this because we have a static class for author
})


//To create an author endpoint
router.post('/', async (req, res) => {

    //you need to npm i body-parser first in order to have parse the .body property
     //.body is the body of the form that is posting and .name is the name attribute of the input in that form
     const userAuthorName = req.body.name; //explicitly tell the server which params we want to accept i.e only name 

     try {
        // Validate input first
        if (typeof userAuthorName !== 'string' || userAuthorName.trim() === '') {
            return res.status(400).render('authors/new', {
                author: { name: '' },
                errorMessage: 'Name is required and must be a valid string',
            });
        }
    
        // Create the author in the db
        const newAuthorId = await Bookstore.createAuthor(userAuthorName);
    
        // Redirect to authors page
        // res.redirect(`authors/${userAuthorName.id}`);
        res.redirect('authors');
    } catch (e) {
        console.error('Error creating author: ', e);
        res.status(500).render('authors/new', {
            author: { name: '' },
            errorMessage: 'Error creating Author, Please try again',
        });
    }
    

})


export default router