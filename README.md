## Simple CRUD server

Adapted from: http://zellwk.com/blog/crud-express-mongodb/

Uses ES6 syntax.

Uses EJS (Embedded JavaScript) for rendering.
http://www.embeddedjs.com 

Also has a good description of connecting to a MongoDB cloud service
http://mlabs.com

## Installation

npm install 
npm start

## About nodemon

Using the nodemon watcher speeds up working the the server. Each time you change server.js, 
nodemon will restart the server. 

1. npm install -g nodemon
2. Add to "scripts" in package.json 
    "start": "nodemon server.js localhost 3000"
3. npm start


Note: you need to install nodemon in Terminal with -g option for the "npm start" command to work.
Note: if you change the port in server.js, change "npm start" in package.json.

## Using a cloud MongoDB server

The base tutorial uses MongoLab for its database server.
https://mongolab.com 
