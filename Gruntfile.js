/*global module:false*/
module.exports = function(grunt) {

  // Configuração.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
     concat: {
      vendors: {
        src:  [
        "public/javascripts/bootstrap.min.js",
        "public/angular-app/app/angular.min.js", 
        "public/angular-app/app/angular-route.min.js", 
        "public/angular-app/app/angular-resource.min.js"],
        dest: "public/build/js/vendors.js"
      },
      scripts: {
        src:  ["public/angular-app/scripts/generalSettings.js",
        "public/angular-app/scripts/filmSettings.js",
        "public/angular-app/scripts/actorSettings.js",
        "public/angular-app/scripts/searchSettings.js",
        "public/angular-app/scripts/userSettings.js"],
        dest: "public/build/js/angularApp.js"
        }      	
    },
  	 uglify: {
      vendors: {
          src: "<%= concat.vendors.dest %>",
          dest: "public/build/js/vendors.min.js"
        }
      }  
  });

  // Carrega plugins
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");


  // Tarefa default
  grunt.registerTask("default", ["concat", "uglify"]);

};
