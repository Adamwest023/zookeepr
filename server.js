//allows us to use express throught the npm package
const express = require('express');
//allow us to use the fs(filesave) through the npm package
const fs = require('fs');
const { get } = require('http');
//allows us to set paths by calling it through the npm package
const path = require('path');

//calls the new routes 
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


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
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//allows the server to be looking for information and tells it where to find it at.
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});