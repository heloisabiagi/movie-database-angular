/*global module:false*/
module.exports = function(grunt) {

  // Configuração.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
     concat: {
      scripts: {
        src:  ["public/javascripts/*.js"],
        dest: "public/build/js/assets.js"
        }      	
    },
  	 uglify: {
      scripts: {
        src: "<%= concat.scripts.dest %>",
        dest: "public/build/js/assets.min.js"
        }
      }
  });

  // Carrega plugins
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");


  // Tarefa default
  grunt.registerTask("default", ["concat", "uglify"]);

};
