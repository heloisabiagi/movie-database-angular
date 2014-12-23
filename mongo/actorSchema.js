module.exports = function(app) {

	var Mongoose = require('Mongoose');

	var actorSchema = new Mongoose.Schema({
	  name: { type: String },
	  dateOfBirth: { type: Date },
	  placeOfBirth: { type: String },
	  filmography: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
	});

	var Actor = Mongoose.model('Actor', actorSchema);

	var methods = {
		getList : function(callback) {
	      Actor.find()
	      .exec(function (err, result) {
	        callback(err, result || []);
	      });
	    },
	    get : function(id, callback) {
	      if(!id) return callback(null, {});

	      Actor.findById(id)
	      .populate('filmography', 'title releaseYear')
	      .exec(function (err, result) {
	        callback(err, result || {});
	      });
	    },
		new : function(data, callback) {
		  var newFilmography = [];

		  for(i=0; i < data.filmography.length; i++) {
		  	var objId = data.filmography[i];
		  	var item = Mongoose.Types.ObjectId(objId);

		  	newFilmography.push(item);
		  }

		  data.filmography = newFilmography;

	      var actor = new Actor(data);

	      actor.save(function (err, result) {
	        callback(err, result || {});
	      });
	    },
	    remove : function(id, callback) {
	      if(!id) return callback({});

	      Actor.findByIdAndRemove(id, function (err, result) {
	        callback(err, result || {});
	      });
	    },
	    search : function(term, callback) {

	      if(!term || term == "") {
	      	Actor.find()
		      .exec(function (err, result) {
		        callback(err, result || []);
		      });

	      } else {
		      	Actor.find({ name: new RegExp(term, "gi") })
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

	      Actor.findByIdAndUpdate(id, { $set: data }, function (err, result) {
	        callback(err, result || {});
	      });
	    }
	}

	return methods;

}