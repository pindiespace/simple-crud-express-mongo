/** 
 * Simple CRUD server
 * Written using ES6 syntax
 * Adapted from: https://github.com/zellwk/crud-express-mongo/blob/master/server.js#L31
 * Uses: http://mlabs.com MongoDB free sandbox service.
 */


/** 
 * Specify the port our app will run at. This needs to be the 
 * same as that specified in package.json in the "npm start" script.
 *
 * Load libraries required for the server to work.
 * - 'express'       : NodeJS based web server
 * - 'path'          : simple join of file paths (so we don't have to include  the 
 *                     filesystem path of our local computer)
 * - 'serve-favicon' : find the favicon and use it
 * - 'body-parser'   : adds the ability to process form (POST) requests to the server.
 * - 'mongodb'       : a MongoDB client. This just accesses an existing MongoDB database, 
 *                     and it is still necessary to create or link to a MongoDB database. 
 *                     This demo uses a "sandbox" (free) database account at http://mlabs.com
 */
const port = 9000;
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser= require('body-parser');

// Express 4.x server.
const express = require('express');
const app = express();
// favicon /public.
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Make /public directory accessible by default.
/** 
 * NOTE: if you make this static, you can't use files in dynamic 
 * app.get and app.post routes - they won't work properly. In other 
 * words, if you put index.html into /public and use the express.static(...) 
 * below, the home page may work, but redirects will NOT work!
 */
app.use(express.static(path.join(__dirname, 'public')));

// Tell Express to use body-parser grab form data and add to the 'req' object.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Set the view engine
app.set('view engine', 'ejs');

// MongoDB database server.
const MongoClient = require('mongodb').MongoClient;

// Declare MongoDB database reference.
var db;

// MongoDB cloud service (http://mlabs.com)

MongoClient.connect('mongodb://thudley:slapswell@ds029595.mlab.com:29595/lame-quotes', (err, database) => {
	console.log('MongoClient.connect');

	if(err) {
		return console.log(err);
	}
	
	db = database;
	app.listen(process.env.PORT || port, () => {
		console.log('Express listening activated in MongoClient,connect listening on:' + port);
	});

});


// Set up Routes.

// Default GET routes.

// Get index.html from /public folder.
app.get('/', (req, res) => {

	//res.send('hello, world');
	console.log('rendering index.html');
	/** 
	 * Grab the quotes database collection from the MongoDB server. It is an object 
	 * with the data, plus methods for reading and writing to the remote database.
	 * 
	 * NOTE: variable 'db' has to be initialized above by MongoClient.connect for this to work.
	 */
	var cursor = db.collection('quotes').find().toArray(function(err, result) {
		//console.log('results:' + results)
		// send HTML file populated with quotes here
		res.render('index.ejs', {quotes: result})
	});

	//var cursor = db.collection('quotes');
	//console.log(cursor);
	//NOTE: you can't use express.static() on /public AND use it here!
	//res.sendFile(__dirname + '/public/index.html'); //NOT ./index.html!!!!!
});

// POST routes (path is form action="path")

// Post from form action="/quotes"
// CREATE
app.post('/quotes', (req, res, next) => {
	/* 
	 * req.post has all the fields in an object. In this example...
	 * req.post = {name: "user's input", quote: "user's quote"};
	 * test with: console.log(req.body)
	 */
	// These lines use the MongoClient to post user input to the MongoDB database.
	db.collection('quotes').save(req.body, (err, result) => {
		if(err) {
			return console.log(err);
		}
		console.log('Saved post to MongoDB database');
			// Send user to index.html after processing.
		console.log('Redirecting to index.html');
		res.redirect('/'); // redirect DOES NOT work
		//res.redirect('/other'); //this will send you to another page
		//res.send("HI THERE") //this is a good initial debug
	});

});


app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('A darth vadar quote got deleted')
  })
})


// NOTE: We don't listen here, we already did it in the MongoDB connect callback.
// Start the server.
//app.listen(port, function() {
//  console.log('Express listening on port')
//});
