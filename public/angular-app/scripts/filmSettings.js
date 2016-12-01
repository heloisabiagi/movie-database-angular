/* Resources */
app.factory('Film', function($resource) {
  return $resource('/ws/film/:id', {}, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});


/* Controllers */
app.controller('mainListFilms', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.broadCaster = function(evt, msg){
        $scope.$broadcast(evt, msg);
    }
}]);

app.controller('listFilms', ['$scope', '$routeParams', 'Film', 'Search' ,function($scope, $routeParams, Film, Search) {

  // Get entries
   var films = Film.query(function(){
      $scope.items = films;
   });

   // Delete entry
   $scope.deleteItem = function(id){
      Film.delete({ id: id });
      alert("Film deleted successfully");

      $scope.items = Film.query();
   }

   // Search service
   function searchService(searchTerm){
      var result = Search.query({item: "film"}, {term: searchTerm}, function(){
          $scope.items = result;
      });
   }

   // Search broadcast receiver
   $scope.$on("search", function(event, data) {
        searchService(data);
    });

}]);

app.controller('addFilm', ['$scope', '$routeParams', 'Film' ,function($scope, $routeParams, Film) {
  $scope.ratingOptions = ["free", "PG-13", "PG-17"];

  $scope.addFilm = function(){
    formData = $scope.formData;
    formData.hasCreditCookie = false;

    Film.save(formData, function() {
      alert("New film added successfully");
    });
  } 

}]);

app.controller('showFilm', ['$scope', '$filter', '$routeParams', 'Film', function($scope, $filter, $routeParams, Film) {
  var film = Film.get({id: $routeParams['id'] }, function(){
      $scope.item = film;
      $scope.item.imageUrl = '/images/' + $filter("machineName")(film.title) + '.jpg';
      $scope.ratingOptions = ["free", "PG-13", "PG-17"];

  });

  
  $scope.editFilm = function(){
      $scope.editItem = true;
  }

  $scope.cancelEdit = function(){
      $scope.editItem = false;
  }

  
  $scope.updateFilm = function(){
    
      var film = $scope.item;
      var releaseYearValue = parseInt(film.releaseYear);
      console.log(film.rating);


      Film.update({ id: $routeParams['id'] }, { "title": film.title, "rating": film.rating , "releaseYear": releaseYearValue, "synopsis": film.synopsis, "hasCreditCookie": false }, function(){
        alert("Film updated successfully!");
        $scope.editItem = false;
        $scope.item = Film.get({id: $routeParams['id'] });
      });
    
  } 

}]);







