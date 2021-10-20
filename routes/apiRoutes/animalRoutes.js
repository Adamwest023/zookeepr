//we have to import files that we were using in the previous location
//Router allows you to declare routes in any file as long as you use the proper middleware
const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal} = require('../../lib/animals');
const { animals } = require('../../data/animals'); 


//routes are moved to their own .js file to clean up the server.js file
//all routes have a request:req and a response: res, not all will use the request
//the first part of the () is what is getting called i.e. /api/animals
//change app to router
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

//adds user information when adding a new animal
router.post('/animals', (req, res) => {
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

  //if any data in req.body is incorrect, send 400 error back
  if(!validateAnimal(req.body)){
      res.status(400).send('The animal is not properly formatted');
  } else {
      const animal = createNewAnimal(req.body, animals);
      res.json(animal);
  }
});

module.exports = router;