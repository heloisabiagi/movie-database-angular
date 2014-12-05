module.exports = function(app) {

	var Mongoose = require('Mongoose');

	var db = Mongoose.connection;

	db.on('error', console.error);
	db.once('open', function() {
	  console.log('Conectado ao MongoDB.')
	  // Vamos adicionar nossos Esquemas, Modelos e consultas aqui
	});

	Mongoose.connect('mongodb://localhost/movie-database');

	var movieSchema = new Mongoose.Schema({
	  title: { type: String },
	  rating: String,
	  releaseYear: Number,
	  hasCreditCookie: Boolean
	});

	var Movie = Mongoose.model('Movie', movieSchema);

	var methods = {
		getList : function(callback) {
	      Movie.find()
	      .exec(function (err, result) {
	        callback(err, result || []);
	      });
	    },
		new : function(data, callback) {
	      var movie = new Movie(data);

	      movie.save(function (err, result) {
	        callback(err, result || {});
	      });
	    },
	    remove : function(id, callback) {
	      if(!id) return callback({});

	      Movie.findByIdAndRemove(id, function (err, result) {
	        callback(err, result || {});
	      });
	    },
	    search : function(term, callback) {
	    	console.log("Term Mongo: " + term);

	      if(!term || term == "") {
	      	Movie.find()
		      .exec(function (err, result) {
		        callback(err, result || []);
		      });

	      } else {
		      	Movie.find({ title: new RegExp(term, "gi") })
		      .exec(function (err, result) {
		        callback(err, result || []);
		      });
	  	  }
	    }
	}

	return methods;

}