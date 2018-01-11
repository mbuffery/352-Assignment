var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//Server listens to port 80
server.listen(80);

console.log("server on port 80");

//using express to read and sends the Chess.html to the server
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/Public/Chesshtml.html');
});

//Reads all static files in the __dirname which is called public
app.use(express.static(__dirname + '/Public'));

//Array for amount of players connected
var users = [];

//All the variables that will need to be constantly checked and updates for the players/clients
var WHITE_TEAM = [],
BLACK_TEAM = [],
currTurn = 1,
white = "White's Turn",
black = "Black's Turn";


//upon client connecting
io.on('connection', function (socket) {
  //Each user id is different by generating them a random id
  socket.id = Math.random();
  //Each user that connects to the server will be added into Array
  users[socket.id] = socket;

  //User will be deleted if they disconnect from server
  socket.on('disconnect', function()
  {
    delete users[socket.id];
  });

  console.log('client connected ' + socket.id);

  //Turn system relates back from client
  socket.on('updateCurrTurn', function(data)
  {
    currTurn = data;
  });

  //socket.on('updateBlackPieces', function(data)
 //{
//    BLACK_TEAM = data;
//  });
  socket.on('updateWhitePieces', function(data)
  {
    WHITE_TEAM = data;
 });

});


//All data created will be sent to every client that connects to the Server
setInterval(function()
{
  for(var i in users)
{
  var socket = users[i];
  socket.emit('updateCurrTurn', currTurn);
  //socket.emit('updateBlackPieces', BLACK_TEAM);
  socket.emit('updateWhitePieces', WHITE_TEAM);
}
},1000/10); //Server will be updated 10 times a second for fluid interactions and movement
