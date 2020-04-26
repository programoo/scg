const bodyParser = require('body-parser');
const express = require('express');

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

// const direction = require('./api/direction');
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