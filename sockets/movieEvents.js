module.exports = function(app) { 

	var http = require('http');
	var server = http.createServer(app);
	var io = require('socket.io').listen(server);

	io.on('connection', function(socket){
	  console.log('a user connected');

	  socket.on('refresh film', function(msg){
	    io.emit('refresh film', msg);
	  });

	  socket.on('refresh actor', function(msg){
	    io.emit('refresh actor', msg);
	  });

	});

	app.start = app.listen = function(){
	  return server.listen.apply(server, arguments)
	}

	app.start(app.get("port"));
}