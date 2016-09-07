var express = require('express');
var router = express.Router();

// 1. Connect to MongoDB.
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
// console.log(mongoClient);
var mongoUrl = 'mongodb://localhost:27017/electric'
var db; //Global so all of our routes have access to the db connection

mongoClient.connect(mongoUrl, function(error, database){
	if(error){
		console.log(error); //Print out the error because there is one
	}else{
		db = database; //Set the database object that was passed back to our callback, to our global db.
		console.log("Connected to Mongo successfully.");
	}
});

/* GET home page. */

// General Steps for the app
// Get all the pictures into MongoDB
//////////Done via the terminal
// Get all the pictures from the MongoDB
// Get the current user from Mongo
// Find out what pictures the current user has voted on
// Load those pictures into an array
// Pick a random one
// Send the random one to EJS via a res.render('index', {picsArray})

router.get('/', function(req, res, next) {
	console.dir(next);
// 2. Get picts from Mongo and store them in an array to pass to view.
	db.collection('images').find().toArray(function(error, photos){
		// 3. Grab a random image from that array
		var randomNum = Math.floor(Math.random() * photos.length);
		var randomPhoto = photos[randomNum].imgSrc;
		// 4. Send that image to the view
		res.render('index', { imageToRender: randomPhoto });
	});
});

router.get('/electric', function(req, res, next){
	res.json(req.query);
});


module.exports = router;
