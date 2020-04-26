const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const routes = require('./controllers/index');
const profiles = require('./controllers/profiles');
const directions = require('./controllers/directions');
const apiLines = require('./controllers/api/lines');

const app = express();
// Development
app.disable('view cache');
app.set('etag', false)
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use('/', routes);
app.use('/profiles', profiles);
app.use('/directions', directions);

/////////////////////////////////////////////////////// APIs
app.use('/api/lines', apiLines);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('The application is running on localhost:3000');
});

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'development.db'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database successful!');
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
})();

// Movie model
// Movie model
class Movie extends Sequelize.Model {}
Movie.init({
    title: Sequelize.STRING,
}, { sequelize });

(async () => {
    await sequelize.sync({ force: true });

    try {
        const movieInstances = await Promise.all([
            Movie.create({
                title: 'Toy Story'
            }),
            Movie.create({
                title: 'The Incredibles'
            }),
        ]);
        const moviesJSON = movieInstances.map(movie => movie.toJSON());
        console.log(moviesJSON);

    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
})();


// const abc = require('./lib/abc');
// const xyz = require('./lib/xyz');

// A = 21
// A_B = 23
// A_C = -21
// const abcResult = abc.findBC(A, A_B, A_C)
// console.dir(abcResult)
//
// const xyzResult = xyz.isString(['X', 'Y', '5', '9', '23', 'Z', "", null, undefined, 0]);

// const modes = ['transit', 'driving', 'walking', 'bicycling'];
//
// modes.forEach(mode => {
//     console.log(mode);
//     direction.getDirection(mode)
// });