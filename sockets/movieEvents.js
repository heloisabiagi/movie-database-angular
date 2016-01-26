module.exports = function(app) { 

	var http = require('http');
	var server = http.createServer(app);
	var io = require('socket.io').listen(server);

	io.on('connection', function(socket){
	  console.log('a user connected');

	  socket.on('refresh list', function(msg){
	    io.emit('refresh list', msg);
	  });

	  socket.on('refresh actors', function(msg){
	    io.emit('refresh actors', msg);
	  });

	});

	app.start = app.listen = function(){
	  return server.listen.apply(server, arguments)
	}

	app.start(app.get("port"));
}