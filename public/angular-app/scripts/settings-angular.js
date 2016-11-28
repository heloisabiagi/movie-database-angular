var app = angular.module('mdbAng', ['ngRoute', 'ngResource']);

/* Filters */
app.filter('machineName', function () {
    return function (input) {
        var machineName = input.toLowerCase().replace(/\s[\:\,\'\-]\s/g, " ").split(" ").join("-"); 
        return machineName;
    }
});

app.filter('displayDate', function () {
    return function (input) {
        var birthDay = new Date(input); 
        var day = birthDay.getDate();
        var month = birthDay.getMonth();
        var monthPosition = month + 1;

        if(day < 10) {
          day = "0" + day;
        }

        if(monthPosition < 10) {
          monthPosition = "0" + monthPosition;
        }

        var displayDate = birthDay.getFullYear() + "-" + monthPosition + "-" + day;
        return displayDate;
    }
});

app.filter('objectDate', function () {
    return function (input) {
        var birthDay = new Date(input); 
        return birthDay;
    }
});

/* Factory + Resource: creates CRUD */
app.factory('Film', function($resource) {
  return $resource('/ws/film/:id', {}, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});

app.factory('Actor', function($resource) {
  return $resource('/ws/actor/:id', {}, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });

});

app.factory('Search', function($resource) {
  return $resource('/ws/search/:item', {term: '@term'});
});

/* Routes */ 
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl:'/angular-app/views-angular/list-films.html',
        controller: 'mainListFilms'
      }).
      when('/list/film', {
        templateUrl:'/angular-app/views-angular/list-films.html',
        controller: 'mainListFilms'
      }).
      when('/list/actor', {
        templateUrl:'/angular-app/views-angular/list-actors.html',
        controller: 'mainListActors'
      }).
      when('/add/film', {
        templateUrl:'/angular-app/views-angular/add-film.html'
      }).
      when('/add/actor', {
        templateUrl:'/angular-app/views-angular/add-actor.html'
      }).
      when('/actor/:id', {
        templateUrl:'/angular-app/views-angular/show-actor.html'
      }).
      when('/film/:id', {
        templateUrl:'/angular-app/views-angular/show-film.html'
      });

      // Beautiful URLs (no hash)
      $locationProvider.html5Mode(true);  

}]);

/* Controllers */
app.controller('mainListFilms', function($scope, $http, $routeParams) {
    $scope.broadCaster = function(evt, msg){
        $scope.$broadcast(evt, msg);
    }
});

app.controller('mainListActors', function($scope, $http, $routeParams) {
    $scope.broadCaster = function(evt, msg){
        $scope.$broadcast(evt, msg);
    }
});

app.controller('searchController', function($scope, $http, $routeParams, Search) {

  // Search function
  $scope.doSearch = function(){
      $scope.$parent.broadCaster("search", $scope.searchField);
  }

});

app.controller('listFilms', function($scope, $http, $routeParams, Film, Search) {

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

});

app.controller('addFilm', function($scope, $http, $routeParams, Film) {
  $scope.ratingOptions = ["free", "PG-13", "PG-17"];

  $scope.addFilm = function(){
    formData = $scope.formData;
    formData.hasCreditCookie = false;

    Film.save(formData, function() {
      alert("New film added successfully");
    });
  } 

});

app.controller('listActors', function($scope, $http, $routeParams, Actor, Search) {

   // Get entries
   var actors = Actor.query(function(){
      $scope.items = actors;
   });

   // Delete an entry
   $scope.deleteItem = function(id){
      Actor.delete({ id: id });

      alert("Actor/actress deleted successfully");
      $scope.items = Actor.query();
   }

   // Search service
   function searchService(searchTerm){
      var result = Search.query({item: "actor"}, {term: searchTerm}, function(){
          $scope.items = result;
      });
   }

   // Search broadcast receiver
   $scope.$on("search", function(event, data) {
        searchService(data);
    });

});

app.controller('addActor', function($scope, $http, $routeParams, Actor) {

  $scope.addActor = function(){
    formData = $scope.formData;

    Actor.save(formData);
    alert("New actor added successfully");
  } 

});

app.controller('showFilm', function($scope, $filter, $http, $routeParams, Film) {
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


});

app.controller('showActor', function($scope, $filter, $http, $routeParams, Actor) {
  var actor = Actor.get({id: $routeParams['id'] }, function(){
      $scope.item = actor;
      $scope.item.objectDateOfBirth = new Date(actor.dateOfBirth);
      $scope.item.imageUrl = '/images/' + $filter("machineName")(actor.name) + '.jpg';

  });

  $scope.editActor = function(){
      $scope.editItem = true;
  }

  $scope.cancelEdit = function(){
      $scope.editItem = false;
  }

  $scope.updateActor = function(){
      var actor = $scope.item;
      Actor.update({ id: $routeParams['id'] }, { "name": actor.name, "dateOfBirth": actor.objectDateOfBirth, "placeOfBirth": actor.placeOfBirth, "shortBio": actor.shortBio }, function(){
        alert("Actor updated successfully!");
        $scope.editItem = false;
        $scope.item = Actor.get({id: $routeParams['id'] });
      });
  }

});






