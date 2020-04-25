const https = require('https');
const http = require('http');

const bodyParser = require('body-parser')
const request = require('request')

// SCG location = 13.8058793, 100.5375317
sourceLat = 13.8058793
sourceLng = 100.5375317
destinationLat = 13.7466304
destinationLng = 100.5393351
const sourceText = 'The+Siam+Cement+Public+Company+Limited'
const destinationText = 'centralwOrld'

function getDirection(mode, response, queryString) {
    const url = `https://maps.googleapis.com/maps/api/directions/json?mode=${mode}&origin=${sourceLat},${sourceLng}&destination=${destinationLat},${destinationLng}&key=${'AIzaSyCrs4tHo0EfCYFaZ08FHvmNQYVMgF3RqBA'}`
    console.log(`Request ${url}`)

    request(url, (err, res, body) => {
        if (err) {
            console.log(err);
            res.send("<h1>Hello Javascript Developer</h1>");
        } else {
            const body = JSON.parse(res.body);
            const route = body.routes[0];
            response.render('directions/index', {
                queryString: queryString,
                mode: mode,
                route: route
            });
        }
    });
}

module.exports.getDirection = getDirection;