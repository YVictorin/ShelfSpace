import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', { noPartial: true, messages: req.flash() });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true //no users with that email or password is incorrect based on what the user entered
}));

export default router;
