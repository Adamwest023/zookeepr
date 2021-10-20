//call required npm dependencies
const path = require('path');
const router = require('express').Router();

//moves all remaining routes from the server.js file to an independent file 
//all routes have a request:req and a response: res, not all will use the request
//the first part of the () is what is getting called i.e. /api/animals
//the '/' brings us to the route folder
router.get('/', (req,res) => {
    //job is to respond with an HTML page to display in browser so
    //we use res.sendFile() instead of res.json()
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

router.get('/animals', (req,res) => {
    res.sendFile(path.join(__dirname,'.public/animals.html'));
});

//route that sends the HTML that is created from the zookeepers.html to the directory name given
router.get('/zookeepers',(req,res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

//route for a request that doesn't exist using a '*' 
//should always come last in your routes 
router.get('*',(req,res) => {
    //tells the route to route back to the index.html file 
    res.sendFile(path.join(__dirname, '.public/index.html'));
});


module.exports = router; 