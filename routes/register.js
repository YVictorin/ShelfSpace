import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import users from '../users.js';
dotenv.config();

const router = express.Router();

router.get('/', (req, res) => {
    res.render('register', { noPartial: true });
})

router.post('/', async (req, res) =>  {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),   //when there is another database this will be automatically generated, but just for now
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        res.redirect('/login')
    } catch(e) {
        console.log(e);
        res.redirect('/register');
    }
})

export default router; 

