module.exports = function(app) {
	
	var Mongoose = require('Mongoose');

	var movieSchema = new Mongoose.Schema({
	  title: { type: String },
	  rating: String,
	  releaseYear: Number,
	  hasCreditCookie: Boolean,
	  cast: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Actor'}]
	});

	var Movie = Mongoose.model('Movie', movieSchema);

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
	      .populate('cast', 'name')
	      .exec(function (err, result) {
	        callback(err, result || {});
	      });
	    },
		new : function(data, callback) {
		  var newCast = [];

		  for(i=0; i < data.cast.length; i++) {
		  	var objId = data.cast[i];
		  	var item = Mongoose.Types.ObjectId(objId);

		  	newCast.push(item);
		  }

		  data.cast = newCast;
		  	
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