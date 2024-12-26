import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { name: req.user.name }); //the user object created due to passport
});

export default router;
