module.exports = function(app) {
	
	var Mongoose = require('Mongoose');

	var movieSchema = new Mongoose.Schema({
	  title: { type: String },
	  rating: String,
	  releaseYear: Number,
	  hasCreditCookie: Boolean,
	});

	var Movie = Mongoose.model('Movie', movieSchema);
	var getActor = require("../mongo/actorSchema");

	var methods = {
		getList : function(callback) {
	      Movie.find()
	      .exec(function (err, result) {
	        callback(err, result || []);
	      });
	    },
	    get : function(id, callback) {
	      if(!id) return callback(null, {});

	      Movie.findById(id)
	      .exec(function (err, result) {
	        callback(err, result || {});
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
	    },
	    update : function(id, data, callback) {
	      if(!id) return callback({});

	      delete data._id;
	      delete data.created_at;
	      data.modified_at = new Date();

	      Movie.findByIdAndUpdate(id, { $set: data }, function (err, result) {
	        callback(err, result || {});
	      });

	    }
	}

	var Public = {};
	Public.Movie = Movie;
	Public.methods = methods;

	return Public;

}