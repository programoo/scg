const express = require('express');

const app = express();
const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
];

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/hello', (req, res) => {
    res.send("<h1>Hello Javascript Developer</h1>");
})

app.get('/directions', (req, res) => {
    res.render('directions', {
        prompt: "Who is barried in ground tombee?",
        hint: "This about who is this ?",
        colors: colors,
        cache: true
    });
})

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});


// const direction = require('./api/direction');
// const abc = require('./calculation/abc');
// const xyz = require('./calculation/xyz');

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
