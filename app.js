const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config({silent: true});
const socket = require('socket.io');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');

// Create a database
const uri = "mongodb+srv://vincent:vincent@hexology-nkjiq.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

function insertdoc(CollectionName, Obj){
  client.connect(err => {
      if (err) throw err;
      var dbo = client.db("hexology");
      dbo.collection(CollectionName).insertOne(Obj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        client.close();
      });
  });
}

var CollectionName = "profiles";
var myobj = {
  name: "Robert",
  level: "Beginner",
  Interests: "EEE",
  time: moment().format()
};

// Build a server
var port = process.env.PORT || 5000;

var server = app.listen(port, function(){
  console.log(`Server running on port: ${port}`);
});


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const io = socket(server);
  io.on('connection', function(socket) {
    console.log('a user has connected');
 
    // Handle incomming chat messages
    socket.on('chat message', function(msg) {
  
  
      console.log('message: ' + msg);
      io.emit('chat message', "you: " + msg);
     
    });

    socket.on('timer', function(msg) {
  
      console.log('message: ' + msg);
      var start = Date.now();
      setInterval(function() {
        insertdoc(CollectionName, myobj)
      }, 30000);
     
    });
  });
  
  module.exports = app;
