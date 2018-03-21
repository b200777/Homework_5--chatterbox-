var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic;
console.log('Websocket server started');
ws.on('connection', function(socket) {
  console.log('client connection established');
  messages.forEach(function(msg) {
    if (msg.startsWith("/topic") == true) {
      topic = "*** topic is'" + msg.slice(7) + "'";
      socket.send(topic);
    }
  });
  socket.on('message', function(data) {
    console.log('message received: ' + data);
    messages.push(data);
    console.log(data.startsWith("/topic"));
    if (data.startsWith("/topic") == true) {
      topic = "*** topic has changed to '" + data.slice(7) + "'";

      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(topic);
      });
    } else {
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data)
      });
    }
  });
});
