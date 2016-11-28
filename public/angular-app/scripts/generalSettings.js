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





