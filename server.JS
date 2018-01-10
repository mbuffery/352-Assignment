var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
console.log("Server on port 80");
//using express to read and sends the Chess.html to the server
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/Public/Chesshtml.html');
});

//Reads all static files in the __dirname which is called public
app.use(express.static(__dirname + '/Public'));


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
