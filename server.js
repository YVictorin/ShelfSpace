import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';
import indexRouter from './routes/index.js'; 
import authorRouter from './routes/authors.js';
import bodyParser from 'body-parser';

// Get the current file's directory name in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3306;

const app = express();

// Set views and other settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); //path.join for better cross-platform compatibility
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

//Middleware order matters in Express, they MUST be set before any route handlers that depend on them
app.use(bodyParser.urlencoded({limit: '10mb', extended: false})) //directly from the documentation


// Use the routers for each respective route
app.use('/', indexRouter);
app.use('/authors', authorRouter); //every route will be prepended with /author


//base error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Shelf Space is down, try again later.')
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

