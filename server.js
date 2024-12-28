import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';
import indexRouter from './routes/index.js'; 
import authorRouter from './routes/authors.js';
import bodyParser from 'body-parser';
import  initDatabase  from './database/initDatabase.js';

let successfullyInitDB = false; //global flag

// Get the current file's directory name in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set views and other settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); //path.join for better cross-platform compatibility
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

//Middleware order matters in Express, they MUST be set before any route handlers that depend on them
app.use(bodyParser.urlencoded({limit: '10mb', extended: false})) //directly from the documentation

// Middleware to check database initialization
app.use((req, res, next) => {
    if(!successfullyInitDB) {
        return res.status(503).send('Shelf Space is down due to database issues')
    }
    next();
})



// Use the routers for each respective route
app.use('/', indexRouter);
app.use('/authors', authorRouter); //every route will be prepended with /author


//base error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Shelf Space is down, try again later.')
})

try {
    await initDatabase();
    successfullyInitDB = true;
    app.listen(process.env.PORT || 8080,  () => {
        console.log('Listening on port ' + process.env.PORT)
    })
} catch (e) {
    successfullyInitDB = false;
    console.error('Failed to start server due to database initialization issues', e)
}



