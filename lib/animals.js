//creating a file to pull information away from the server.js file 
//add dependencies 
const fs = require("fs");
const path = require("path");



//filter function that filters through our animalsArray 
function filterByQuery(query, animalsArray) {
    //starts with an empty array
    let personalityTraitsArray = [];

    //Not that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        //Save personailtyTraits as a dedicated array.
        // If personailtyTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personailtyTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    //add out result of diet
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    //add out result of species
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    //add out result of name
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
};

//function that searches the array though the ids
function findById(id, animalArray) {
    const result = animalArray.filter(animal => animal.id === id)[0];
    return result;
};


//function that allows us to create a new animal and pushes the animal to our animalsArray
function createNewAnimal(body, animalsArray) {
    //our function's main code will go here!
    const animal = body;
    animalsArray.push(animal);

    //Add the information from the createNewAnimal function to the directory chosen 
    //and stringifies(makes it readable in our JSON file) it
    fs.writeFileSync(
        path.join(__dirname,'../data/animals.json'),
        JSON.stringify({animals: animalsArray},null,2)
    );

    //return finished code to post route for response
    return animal;
};

//validating the animal that we are adding to the json
function validateAnimal(animal) {
    //validating the animal name
    if(!animal.name || typeof animal.name !== 'string'){
        return false;
    }
    //validating the animal species
    if (!animal.species || typeof animal.species !== 'string'){
        return false;
    }
    //validating the animal diet
    if (!animal.diet || typeof animal.diet !== 'string'){
        return false;
    }
     //validating the animal personal traits array 
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
};


module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};