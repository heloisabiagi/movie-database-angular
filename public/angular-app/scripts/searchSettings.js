/* Resources */

app.factory('Search', function($resource) {
  return $resource('/ws/search/:item', {term: '@term'});
});

/* Controllers */
app.controller('searchController', function($scope, $http, $routeParams, Search) {

  // Search function
  $scope.doSearch = function(){
      $scope.$parent.broadCaster("search", $scope.searchField);
  }

});






