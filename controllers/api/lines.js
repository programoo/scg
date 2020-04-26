const express = require('express');
const router = express.Router();

const request = require('request');
const GOOGLE_API_KEY = 'AIzaSyCrs4tHo0EfCYFaZ08FHvmNQYVMgF3RqBA';

function getDirection(mode, response, queryString) {
    sourceLat = 13.8058793
    sourceLng = 100.5375317
    destinationLat = 13.7466304
    destinationLng = 100.5393351
    //const sourceText = 'The+Siam+Cement+Public+Company+Limited'
    //const destinationText = 'centralwOrld'

    const url = `https://maps.googleapis.com/maps/api/directions/json?mode=${mode}&origin=${sourceLat},${sourceLng}&destination=${destinationLat},${destinationLng}&key=${GOOGLE_API_KEY}`
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

router.get('/', (req, res) => {
    console.log(req.query);
    const modes = ['driving'];// Change and compare mode, driving, walking and transit
    getDirection('driving', res, req.query) // null;
})

module.exports = router;