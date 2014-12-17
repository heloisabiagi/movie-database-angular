module.exports = function(app) {  
  
  var application = require("../mongo/actorSchema")();   

  var routes = {    
  	 get: function(req, res, next) {
      return application.getList(function(err, result) {
        if(err) return res.json(500, err);
        res.send(result);
      });
    },

    post: function(req, res, next) {
       application.new(req.body, function(err, result) {

        if(err) return res.json(500, err);
        res.json(result || {});
      });
    },

    delete: function(req, res, next) {
     application.remove(req.params.id, function(err, result) {
        if(err) return res.json(500, err);
        res.json(result || {});
      });
    },

    search: function(req, res, next) {
      var term = req.query.term;

      application.search(term, function(err, result) {
        if(err) return res.json(500, err);
        res.json(result || {});
      });
    }
    
  }

  //Run routes
  app.route('/ws/actor')
  .get(routes.get)
  .post(routes.post);

  app.route('/ws/actor/:id')
  .delete(routes.delete);

  app.route('/ws/actor/search')
  .get(routes.search);

  return routes;

}