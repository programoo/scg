const express = require('express');
const router = express.Router();

const request = require('request');
const axios = require('axios').default;

const GOOGLE_API_KEY = 'AIzaSyCrs4tHo0EfCYFaZ08FHvmNQYVMgF3RqBA';

/* Handler function to wrap each route. */
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

async function getData() {
    sourceLat = 13.8058793
    sourceLng = 100.5375317
    destinationLat = 13.7466304
    destinationLng = 100.5393351
    mode = 'driving'

    const url = `https://maps.googleapis.com/maps/api/directions/json?mode=${mode}&origin=${sourceLat},${sourceLng}&destination=${destinationLat},${destinationLng}&key=${GOOGLE_API_KEY}`
    const response = await axios.get(url);
    return response
}

router.get('/test_async', asyncHandler(async (req, res) => {
    console.log("36");
    const myRoutes = await getData();
    console.log(myRoutes.data.routes[0]);
    console.log("40");
    //console.log(myRoutes);
    const route = myRoutes.data.routes[0];

    res.render('directions/index', {
        queryString: req.query,
        mode: 'driving',
        route: route
    });

    //res.send("<h1>Server is running.</h1>");
}))

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

router.get('/', asyncHandler(async (req, res) => {
    console.log("36");
    const myRoutes = await getData();
    console.log(myRoutes.data.routes[0]);
    console.log("40");
    //console.log(myRoutes);
    const route = myRoutes.data.routes[0];

    res.render('directions/index', {
        queryString: req.query,
        mode: 'driving',
        route: route
    });
}))

module.exports = router;