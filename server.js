//allows us to use express throught the npm package
const express = require('express');
//allow us to use the fs(filesave) through the npm package
const fs = require('fs');
const { get } = require('http');
//allows us to set paths by calling it through the npm package
const path = require('path');


//links our animals data through requiring it
const { animals } = require('./data/animals');

//allows for the port needed for heroku or 3002
const PORT = process.env.PORT || 3002;

//calls express now that it has been required
const app = express();

//middleware

//instructs the server to make certain file readily available and not 
//to gate it behind a server endpoint
//makes static resources based off the file path we created
app.use(express.static('public'));

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSO data
app.use(express.json());

//routes
//all routes have a request:req and a response: res, not all will use the request
//the first part of the () is what is getting called i.e. /api/animals
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

//adds user information when adding a new animal
app.post('/api/animals', (req, res) => {
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

//the '/' brings us to the route folder
app.get('/', (req,res) => {
    //job is to respond with an HTML page to display in browser so
    //we use res.sendFile() instead of res.json()
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get('/animals', (req,res) => {
    res.sendFile(path.join(__dirname,'.public/animals.html'));
});

//route that sends the HTML that is created from the zookeepers.html to the directory name given
app.get('/zookeepers',(req,res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

//route for a request that doesn't exist using a '*' 
//should always come last in your routes 
app.get('*',(req,res) => {
    //tells the route to route back to the index.html file 
    res.sendFile(path.join(__dirname, '.public/index.html'));
});


//allows the server to be looking for information and tells it where to find it at.
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});