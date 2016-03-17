MDB.addMovie = (function() {

	function postMovie(form) {
		var movie = {};

		var form = form;
		movie.title = form.querySelector("#title").value;
		movie.rating = form.querySelector("#rating").value;
		movie.releaseYear = form.querySelector("#releaseYear").value;
		movie.hasCreditCookie = false;

		var myData = JSON.stringify(movie);

		var url = "/ws/film";
		var http = new XMLHttpRequest();
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/json");
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				alert("Filme cadastrado com sucesso!");
				MDB.socket.emit('refresh list', 'catálogo atualizado');
				resetForm();
			}
		}
		http.send(myData);

	}

	function resetForm() {
		var form = document.querySelector("#movie-form");
		form.querySelector("#title").value = "";
		form.querySelector("#rating").value = "";
		form.querySelector("#releaseYear").value = "";
	}

	function bindEvents() {
		document.querySelector("#movie-form").addEventListener("submit", function(e){
			e.preventDefault();

			var form = this;
			postMovie(form);
		});

		MDB.socket.on('refresh list', function(msg){
			console.log(msg);
  		});

	}

	return {
		init: function(){
			bindEvents();
		}
	}
})();

MDB.addMovie.init();