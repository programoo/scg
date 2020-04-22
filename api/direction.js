const https = require('https');
const http = require('http');

// SCG location = 13.8058793, 100.5375317
sourceLat = 13.8058793
sourceLng = 100.5375317
destinationLat = 13.7466304
destinationLng = 100.5393351
// centralWorldLocation = 13.7466304,100.5393351
const sourceText = 'The+Siam+Cement+Public+Company+Limited'
const destinationText = 'centralwOrld'

function getDirection() {
    try {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${sourceLat},${sourceLng}&destination=${destinationLat},${destinationLng}&key=${'AIzaSyCrs4tHo0EfCYFaZ08FHvmNQYVMgF3RqBA'}`
        console.log(`Requesting: ${url}`);

        const request = https.get(url, response => {
            if (response.statusCode === 200) {
                let body = "";
                response.on('data', data => {
                    body += data.toString()
                });
                response.on('end', () => {
                    try {
                        const locations = JSON.parse(body);
                        console.dir(locations.routes[0].legs[0].steps.length);
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