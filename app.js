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
//app.use('/css', express.static('css'))

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use('/', routes);
app.use('/profiles', profiles);
app.use('/directions', directions);

app.use('/api/lines', apiLines);

//

//
// const channel_excess_token = 'gKhGxHBRkyngeOe337T2dGxAeTpzAdF1N0xyHxRnJB6RIm9ZcTbsOiweAnzQQWiNeikIToTnasPc60IQu5tpxPNvnIweF5wMCYjCoEoWyWwrXowmVOAYx/l5BN4/NaEO0u43MMQw29F9lpkSG0NljgdB04t89/1O/w1cDnyilFU='
//
// app.get('/webhook', (req, res) => {
//     console.log("I saw line message here on GET");
//     res.send("<h1>Hello Line Messaging Developer</h1>");
// })
//
// app.post('/webhook', (req, res) => {
//     console.log("Hi");
//     let reply_token = req.body.events[0].replyToken
//     let userId = req.body.events[0].source.userId;
//
//     console.log(`UserId ${userId}`);
//
//     try {
//
//         let msg = req.body.events[0].message.text
//
//         if (msg.toLowerCase() === "hello".toLowerCase()) {
//             const message = "Hi, I am an innocent robot. Nice to meet you."
//             console.log(message);
//             reply(reply_token, message);
//         } else if ((msg.toLowerCase() === "Good Bye".toLowerCase())) {
//             const message = "Take care of yourself.";
//             reply(reply_token, message);
//         } else {
//             sendError(userId);
//             res.sendStatus(200);
//         }
//     } catch (error) {
//         console.error(`Cannot parse json object: ${error.message}`);
//         sendError(userId);
//         res.sendStatus(200)
//     }
// })
//
// function sendError(userId) {
//     const errorMessage = "It seems our bot cannot answer your question. Could you please try sending Hello or Good bye instead?"
//     setTimeout(() => {
//         if (typeof userId === 'string') {
//             pushMessage(userId, errorMessage)
//         }
//         console.error(errorMessage)
//     }, 10000);
// }
//
// function pushMessage(userId, msg) {
//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${channel_excess_token}`
//     }
//
//     let body = JSON.stringify({
//         to: [userId],
//         messages: [{
//             type: 'text',
//             text: msg
//         }]
//     })
//
//     request.post({
//         url: 'https://api.line.me/v2/bot/message/multicast',
//         headers: headers,
//         body: body
//     }, (err, res, body) => {
//         console.log('status = ' + res.statusCode);
//     });
// }
//
// function reply(reply_token, msg) {
//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${channel_excess_token}`
//     }
//
//     let body = JSON.stringify({
//         replyToken: reply_token,
//         messages: [{
//             type: 'text',
//             text: msg
//         }]
//     })
//
//     request.post({
//         url: 'https://api.line.me/v2/bot/message/reply',
//         headers: headers,
//         body: body
//     }, (err, res, body) => {
//         console.log('status = ' + res.statusCode);
//     });
// }
//
//
//
// app.use((req, res, next) =>{
//    const err = new Error("Not found");
//    next(err);
// });
//
// app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.json({
//         error:{
//             message: err.message
//         }
//     })
// })


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