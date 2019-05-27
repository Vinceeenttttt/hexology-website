const express = require('express');
const path = require('path');
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));


// start server on the specified port and binding host
server.listen(process.env.PORT, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + process.env.PORT);
  });

  io.on('connection', function(socket) {
    console.log('a user has connected');
 
    // Handle incomming chat messages
    socket.on('chat message', function(msg) {
  
  
      console.log('message: ' + msg);
      io.emit('chat message', "you: " + msg);
     });
  });
  module.exports = app;