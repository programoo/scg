const express = require('express');

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
        if (isNaN(character) && typeof(character) !== 'undefined' && character.length == 1) {
            console.log(character);
        }
    })
}

isString(['X', 'Y', '5', '9', '23', 'Z', "", null, undefined, 0]);


function findBC(x, y, z){
    const B = y - x;
    const C = z - x;
    const result = {B: B, C: C}

    console.dir(result)

    return result;
}


A = 21
A_B = 23
A_C = -21
findBC(A, A_B, A_C)