const express = require('express');

const bodyParser = require('body-parser')
const request = require('request')

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





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

const channel_excess_token = 'gKhGxHBRkyngeOe337T2dGxAeTpzAdF1N0xyHxRnJB6RIm9ZcTbsOiweAnzQQWiNeikIToTnasPc60IQu5tpxPNvnIweF5wMCYjCoEoWyWwrXowmVOAYx/l5BN4/NaEO0u43MMQw29F9lpkSG0NljgdB04t89/1O/w1cDnyilFU='


app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
    res.sendStatus(200)
})

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${channel_excess_token}`
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

app.post('/line_messages', (req, res) => {
    const xLineSignature = req.rawHeaders[1]
    //console.dir(req.rawHeaders[1])
    //console.dir(req)
    console.log(req.body)
    //console.dir(req.body)

    const crypto = require('crypto');
    const channelSecret = 'gKhGxHBRkyngeOe337T2dGxAeTpzAdF1N0xyHxRnJB6RIm9ZcTbsOiweAnzQQWiNeikIToTnasPc60IQu5tpxPNvnIweF5wMCYjCoEoWyWwrXowmVOAYx/l5BN4/NaEO0u43MMQw29F9lpkSG0NljgdB04t89/1O/w1cDnyilFU='; // Channel secret string
    const body = '...'; // Request body string
    const signature = crypto
        .createHmac('SHA256', channelSecret)
        .update(body).digest('base64');

    const https = require('https');
    const http = require('http');

    let postBody = "";
    req.on('data', data => {
        postBody += data.toString()
    });
    req.on('end', () => {
        try {
            console.dir(postBody)
            const messageBody = JSON.parse(postBody);
            const textMessage = messageBody.events[0].message.text;
            const replyToken = messageBody.events[0].replyToken;
            console.log(`ReplyToken: ${replyToken}`);

            if (textMessage.toLowerCase() === "hello".toLowerCase()) {
                console.log("Hi, I am an innocent robot. Nice to meet you.");
            } else if ((textMessage.toLowerCase() === "Good Bye".toLowerCase())) {
                console.log("Why you are so hurry? Anyway, take care of yourself.");
            } else {
                const errorMessage = "It seems our bot cannot answer your question. Could you please try sending Hello or Good bye instead?"

                setTimeout(() => console.error( errorMessage ), 5000);
                console.log()
            }

            console.log(`${messageBody.events[0].message.text}`)
        } catch (error) {
            console.error(`Cannot parse json object: ${error.message}`);
        }
    });

    console.log("I saw line message here on POST");
    res.send("<h1>Hello Line Messaging Developer</h1>");
})

app.get('/line_messages', (req, res) => {
    console.log("I saw line message here on GET");

    res.send("<h1>Hello Line Messaging Developer</h1>");
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
