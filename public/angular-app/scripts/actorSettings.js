/* Resources */
app.factory('Actor', function($resource) {
  return $resource('/ws/actor/:id', {}, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });

});

/* Controllers */

app.controller('mainListActors', function($scope, $http, $routeParams) {
    $scope.broadCaster = function(evt, msg){
        $scope.$broadcast(evt, msg);
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






