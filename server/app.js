var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var urlEncodedParser = bodyParser.urlencoded( { extended: false } );
var port = process.env.PORT || 3003;
var connectionString = 'postgres://localhost:5432/inventory';
var pg = require('pg');

// spin up server
app.listen( port, function(){
  console.log( 'server up on:', port );
}); // end spin up server

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end home base

// add new objects to the inventory
app.post( '/addItem', urlEncodedParser, function( req, res ){
  console.log( 'addItem route hit:', req.body );
  pg.connect(connectionString, function(err, client, done) {
        if (err) {
          console.log("something borked in the post");
        } else {
          console.log("posting");
          client.query('INSERT INTO items (item, size, color) values ( $1, $2, $3 )', [req.body.name, req.body.size, req.body.color]);
            res.send("Done!");
        }
  // add the item from req.body to the table
}); 
}); // end addItem route

// get all objects in the inventory
app.get( '/getInventory', function( req, res ){
  console.log( 'getInventory route hit' );
  var x = 'Hello!';
  pg.connect(connectionString, function(err, client, done) {
          if (err) {
              console.log("Broked");
          } else {
            console.log("Success!");
              var query = client.query("SELECT * FROM items");
              var array = [];
              query.on('row', function(row) {
                  array.push(row);
              });//end on row
              query.on('end', function() {
                  done();
                  console.log(array);
                  res.send(array);
              });//end on end
          }
        });
  // get all items in the table and return them to client
}); // end get Inventory

// static folder
app.use( express.static( 'public' ) );
