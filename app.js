var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('name', previous_messages);
  socket.on('name', function (data) {
    console.log(data.name + " connected");
  });
  socket.on('chat', function (data) {
    var log = data.name + " says " + data.message
    console.log(log);
    io.sockets.emit('chat_log', log);
    previous_messages.push(log)
  });
});

var previous_messages = []
