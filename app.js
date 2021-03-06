const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const routes = require('./controllers/index');
const profiles = require('./controllers/profiles');
const directions = require('./controllers/directions');
const apiLines = require('./controllers/api/lines');

const abc = require('./lib/abc');
const xyz = require('./lib/xyz');

const app = express();


app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use('/', routes);
app.use('/profiles', profiles);
app.use('/directions', directions);

/////////////////////////////////////////////////////// APIs //////////////////////////////////////////////////////////
app.use('/api/lines', apiLines);

/////////////////////////////////////////////////////// HANDLE ERROR WITH MIDDLEWARE //////////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/////////////////////////////////////////////////////// SEED DATABASE //////////////////////////////////////////////////////////
const db = require('./db');
const {Direction} = db.models;

(async () => {
    await db.sequelize.sync({force: true});
    try {
        const direction = await Direction.create({
            sourceTitle: 'SCG 100 years building',
            destinationTitle: 'Central World',
            sourceLat: 10.55555,
            sourceLat: 13.8058793,
            sourceLng: 100.5375317,
            destinationLat: 13.7466304,
            destinationLng: 100.5393351
        });
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
})();

/////////////////////////////////////////////////////// START SERVER //////////////////////////////////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('The application is running on localhost:3000');
});



/////////////////////////////////////////////////////// BASIC CALCULATION //////////////////////////////////////////////////////////
A = 21
A_B = 23
A_C = -21
const abcResult = abc.findBC(A, A_B, A_C)
console.dir(abcResult)

const xyzResult = xyz.isString(['X', 'Y', '5', '9', '23', 'Z', "", null, undefined, 0]);
