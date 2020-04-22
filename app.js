const express = require('express');
const https = require('https');
const API_KEY = 'AIzaSyCrs4tHo0EfCYFaZ08FHvmNQYVMgF3RqBA';

const app = express();
app.listen(3000);

console.log("Hello Node This Is my First Branch");
console.error("Ooops someting went wrong");
console.dir({name: "Andrew", age: 33});

function printMessage(username, badgeCount, point) {
    const message = `${username} has ${badgeCount} total badges(s)`
    console.log(message);
}

printMessage("chalkers", 100, 20000000);


function isString(characters, target) {
    characters.forEach(character => {
        if (isNaN(character) && typeof (character) !== 'undefined' && character.length == 1) {
            console.log(character);
        }
    })
}

function findBC(x, y, z) {
    const B = y - x;
    const C = z - x;
    const result = {B: B, C: C}

    console.dir(result)

    return result;
}


isString(['X', 'Y', '5', '9', '23', 'Z', "", null, undefined, 0]);

A = 21
A_B = 23
A_C = -21
findBC(A, A_B, A_C)

// Call API

// centralWorldLocation = 13.7466304,100.5393351
url = `https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyCrs4tHo0EfCYFaZ08FHvmNQYVMgF3RqBA`
const request = https.get(url, response => {
    let body = "";
    // console.log(response.statusCode);
    // console.dir(response);
    response.on('data', data => {
        body += data.toString()
        //console.log(data.toString());
    });
    response.on('end', () => {
        //console.log(body);
        //console.log(typeof body);
        const locations = JSON.parse(body);
        console.dir(locations.routes.legs);
    });
});

request.on('error', error => console.error(`Problem with request: ${error.message}`))