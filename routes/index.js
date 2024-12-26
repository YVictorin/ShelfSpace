import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    if(!req.user) {
        res.redirect('/register')
    } else {
        res.render('index', { name: req.user.name}); //the user object from passport
    }
  
});

export default router;
