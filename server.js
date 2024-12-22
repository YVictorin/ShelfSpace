import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import indexRouter from './routes/index'

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)

//error handling for db, if you mispelled the username for example
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Database is down, try again later.')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000')
})