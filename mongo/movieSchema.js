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
	      	if(data.cast) {
	      	for(i=0; i< data.cast.length; i++) {
	      		var actorId = i;

				/*	      		
	      		Actor.findById(actorId)		
			      .exec(function (err, result) {
			      	console.log(result);
			        callback(err, result || {});
			      });
			    */  
				

	      	}
	      }
	        callback(err, result || {});
	      });

	    }
	}

	var Public = {};
	Public.Movie = Movie;
	Public.methods = methods;

	return Public;

}