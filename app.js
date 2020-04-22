//const express = require('express');
//const app = express();
//app.listen(3000);

const direction = require('./api/direction');
const abc = require('./calculation/abc');
const xyz = require('./calculation/xyz');

// A = 21
// A_B = 23
// A_C = -21
// const abcResult = abc.findBC(A, A_B, A_C)
// console.dir(abcResult)
//
// const xyzResult = xyz.isString(['X', 'Y', '5', '9', '23', 'Z', "", null, undefined, 0]);

direction.getDirection()