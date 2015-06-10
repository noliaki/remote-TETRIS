var 
  io = require('socket.io').listen(8989),
  fs = require('fs');
  
// io.enable('browser client minification');  // send minified client
// io.enable('browser client etag');          // apply etag caching logic based on version number
// io.enable('browser client gzip');          // gzip the file
// io.set('log level', 1);                    // reduce logging

  
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

io.sockets.on('connection', function(socket){
	
	socket.on('onController', function(acceptData){
		io.sockets.emit('onController', acceptData);
	});
	
	socket.on('onRight', function(acceptData){
		io.sockets.emit('onRight', acceptData);
	});
	
	socket.on('onBottom', function(acceptData){
		io.sockets.emit('onBottom', acceptData);
	});
	
	socket.on('onLeft', function(acceptData){
		io.sockets.emit('onLeft', acceptData);
	});
	
	socket.on('onButton_a', function(acceptData){
		io.sockets.emit('onButton_a', acceptData);
	});
	
	socket.on('onButton_b', function (acceptData){
		io.sockets.emit('onButton_b', acceptData);
	});
});

