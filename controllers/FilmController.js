module.exports = function(app) {  
  
  var applicationGet = require("../mongo/filmSchema")(); 
  var application = applicationGet.methods;   

  var routes = {    
  	 get: function(req, res, next) {
      if(req.params.id) {
        return application.get(req.params.id, function(err, result) {
          if(err) return res.json(500, err);
          res.json(result || {});
        });
      }
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

    put: function(req, res, next) {
      application.update(req.params.id, req.body, function(err, result) {

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
  app.route('/ws/film')
  .get(routes.get)
  .post(routes.post);

  app.route('/ws/film/:id')
  .put(routes.put)
  .get(routes.get)
  .delete(routes.delete);

  app.route('/ws/search/film')
  .get(routes.search);

  return routes;

}