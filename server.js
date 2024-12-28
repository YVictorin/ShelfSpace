import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';
import dotenv from 'dotenv';
dotenv.config();


import indexRouter from './routes/index.js'; 
import authorRouter from './routes/authors.js';
import loginRouter from './routes/login.js';
import registerRouter from './routes/register.js';
import bodyParser from 'body-parser';
import  initDatabase  from './database/initDatabase.js';

let successfullyInitDB = false; //global flag
import initPassport from './passport-config.js';
import users from './users.js';


const app = express();
const port = process.env.PORT || 3306;

// Get the current file's directory name in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Set views and other settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); //path.join for better cross-platform compatibility
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

initPassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);


//Middleware order matters in Express, they MUST be set before any route that depends on them
app.use(bodyParser.urlencoded({limit: '10mb', extended: false})) //directly from the documentation

// Middleware to check database initialization
app.use((req, res, next) => {
    if(!successfullyInitDB) {
        return res.status(503).send('Shelf Space is down due to database issues')
    }
    next();
})


// Middleware setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//default error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Shelf Space is down, try again later.')
})

// Use the routers for each respective route
app.use('/', indexRouter);
app.use('/authors', authorRouter); //every route will be prepended with /authors
app.use('/register', registerRouter);
app.use('/login', loginRouter);



try {
    await initDatabase();
    successfullyInitDB = true;
    app.listen(process.env.PORT || 3309,  () => {
        console.log('Listening on port ' + process.env.PORT)
    })
} catch (e) {
    successfullyInitDB = false;
    console.error('Failed to start server due to database initialization issues', e)
}





