const express = require('express');
const router = express.Router();

const axios = require('axios').default;
const GOOGLE_API_KEY = 'AIzaSyCrs4tHo0EfCYFaZ08FHvmNQYVMgF3RqBA';

const db = require('../db');
const { Direction } = db.models;

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

async function getData(direction) {
    mode = 'driving'
    const url = `https://maps.googleapis.com/maps/api/directions/json?mode=${mode}&origin=${direction.sourceLat},${direction.sourceLng}&destination=${direction.destinationLat},${direction.destinationLng}&key=${GOOGLE_API_KEY}`
    const response = await axios.get(url);
    return response
}

router.get('/', asyncHandler(async (req, res) => {
    const direction = await Direction.findOne();
    const myRoutes = await getData(direction);
    const route = myRoutes.data.routes[0];

    res.render('directions/index', {
        queryString: req.query,
        mode: 'driving',
        direction: direction,
        route: route
    });
}))

module.exports = router;