/** 
 * index.js - client-side JS for a basic CRUD 
 * application written in NodeJS, ExpressJS, and 
 * MongoDB.
 * 
 * Uses ES5 (browser-compatible in 2016)
 * 
 * Based off:
 * https://github.com/zellwk/crud-express-mongo/blob/master/public/main.js
 */

console.log('client-side loading...');

var update = document.getElementById('update')
var del = document.getElementById('delete')

// Get the quote text for searching the DB
var quotes = document.getElementById('quotes-list');
var parent = document.quotes.parentNode;
var text = document.getElementsByClassName('div')[1].innerText;

quotes.addEventListener('click', function(e) {
	var target = e.target;
	switch(target.className) {
		case 'button-update':
			break;
		case 'button-delete':
			break;
		default:
			break;
	}
});

/** 
 * This example uses the Fetch API in modern web browsers 
 * to request data, setting to either 'get', 'post', 'update',
 * or 'delete'
 */
 update.addEventListener('click', function() {

 });

 del.addEventListener('click', function() {

 });