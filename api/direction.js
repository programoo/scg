// centralWorldLocation = 13.7466304,100.5393351
const https = require('https');
const http = require('http');
const API_KEY = 'AIzaSyCrs4tHo0EfCYFaZ08FHvmNQYVMgF3RqBA';

function getDirection() {
    console.log("Sending request to direction");
    try {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyCrs4tHo0EfCYFaZ08FHvmNQYVMgF3RqBA`
        const request = https.get(url, response => {
            if (response.statusCode === 200) {
                let body = "";
                response.on('data', data => {
                    body += data.toString()
                });
                response.on('end', () => {
                    try {
                        const locations = JSON.parse(body);
                        console.dir(locations.routes[0].legs[0]);
                        return locations;
                    } catch (error) {
                        console.error(`Cannot parse json object: ${error.message}`);
                    }
                });
            } else {
                const message = `There was an error getting the profile`
                const statusCodeError = new Error(message);
                console.error(`${statusCodeError.message} ${response.statusCode}: ${http.STATUS_CODES[response.statusCode]}`);
            }
        });

        request.on('error', error => console.error(`Problem with request: ${error.message}`))
    } catch (error) {
        console.error(`Exception Error: ${error.message}`);
    }
}

module.exports.getDirection = getDirection;