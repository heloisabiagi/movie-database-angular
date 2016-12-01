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

/* Routes */ 
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl:'/angular-app/views-angular/list-films.html',
        controller: 'listFilms'
      }).
      when('/list-films', {
        templateUrl:'/angular-app/views-angular/list-films.html',
        controller: 'listFilms'
      }).
      when('/list-actors', {
        templateUrl:'/angular-app/views-angular/list-actors.html',
        controller: 'listActors'
      }).
      when('/add-film', {
        templateUrl:'/angular-app/views-angular/add-film.html',
        controller: 'addFilm'
      }).
      when('/add-actor', {
        templateUrl:'/angular-app/views-angular/add-actor.html',
        controller: 'addActor'
      }).
      when('/actor/:id', {
        templateUrl:'/angular-app/views-angular/show-actor.html',
        controller: 'showActor'
      })

      // Beautiful URLs (no hash)
      $locationProvider.html5Mode(true);  

}]);

/* Controllers */
app.controller('listFilms', function($scope, $http, $routeParams, Film) {

  //query() returns all the entries
   var films = Film.query();
   $scope.items = films;

   $scope.deleteItem = function(id){
      Film.delete({ id: id });
      alert("Film deleted successfully");

      $scope.items = Film.query();
   }

});

app.controller('addFilm', function($scope, $http, $routeParams, Film) {

  $scope.addFilm = function(){
    formData = $scope.formData;
    formData.hasCreditCookie = false;

    Film.save(formData);
    alert("New film added successfully");
  } 

});

app.controller('listActors', function($scope, $http, $routeParams, Actor) {

   var actors = Actor.query();
   $scope.items = actors;

   $scope.deleteItem = function(id){
      Actor.delete({ id: id });
      alert("Actor/actress deleted successfully");

      $scope.items = Actor.query();
   }

});

app.controller('addActor', function($scope, $http, $routeParams, Actor) {

  $scope.addActor = function(){
    formData = $scope.formData;

    Actor.save(formData);
    alert("New actor added successfully");
  } 

});

app.controller('showActor', function($scope, $filter, $http, $routeParams, Actor) {
  var actor = Actor.get({id: $routeParams['id'] }, function(){
      $scope.item = actor;
      $scope.item.objectDateOfBirth = new Date(actor.dateOfBirth);
      $scope.item.imageUrl = '/images/' + actor.name.toLowerCase().replace(/\s[\:\,\'\-]\s/g, " ").split(" ").join("-") + '.jpg';

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






