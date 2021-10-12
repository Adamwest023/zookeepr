const express = require('express')
const path = require('path')

//setup server
//initialize our application
const app = express();
const PORT = process.env.PORT || 3002;

//middleware or server settings
app.use(express.urlencoded({extended: true}));
app.use(express.json())
//app.use(express.static('public'))  only when you have your html in a public folder in your project or hw

//routes which we have none of right now
app.get('/example', (req, res) => {
    res.sendFile(path.join(__dirname, "./example.html"))
})


//running of the server
app.listen(PORT, () => {
    console.log('running')
})