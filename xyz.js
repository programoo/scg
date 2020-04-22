function isString(characters, target) {
    characters.forEach(character => {
        if (isNaN(character) && typeof (character) !== 'undefined' && character.length == 1) {
            console.log(character);
        }
    })
}

module.exports.isString = isString;