// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express

var port = process.env.PORT || 3300;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/mockdata', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    var mockData=[
        [12,50,32,42, 32, 15, 23, 15],
        [50,12,1,22, 12, 55, 12, 25],
        [1, 2, 4, 6, 10, 15, 22],
        [30, 32, 20, 15, 12, 10, 2],
        [70, 42, 24, 20, 32, 5, 2],
            [11, 12, 14, 50, 30, 11, 11]
    ];
    var index = Math.floor(Math.random() * mockData.length);
    res.json({ message: mockData[index]});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
