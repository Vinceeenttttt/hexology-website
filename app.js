const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config({silent: true});
const socket = require('socket.io');

var port = process.env.PORT || 5000;

var server = app.listen(port, function(){
  console.log('listening for requests on port 4000,');
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
  });
  
  module.exports = app;