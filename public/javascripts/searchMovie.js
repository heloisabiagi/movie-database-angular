MDB.searchMovie = (function() {
	var form = document.getElementById("search-form");
	var box = document.getElementById("search-box");

	function searchMovieService(term) {

		var term = term || box.value;

		var url = "/ws/film/search?term=" + term;
		var http = new XMLHttpRequest();
		http.open("GET", url, true);
		http.setRequestHeader("Content-type", "application/json"); //Send the proper header information along with the request
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				var data = JSON.parse(http.responseText);
				searchResult(data);
			}
		}
		http.send();

	}

	function searchResult(data){
		var filmList = "";
		for(fL =0; fL < data.length; fL++){
			var item = data[fL];
			if(item["title"]) {
				filmList += "<li data-id='" + item["_id"]+ "'><a href='/filme/" + item["_id"] + "'> <strong>" + item["title"]+ "</strong> </a> - " + item["releaseYear"]+" <span class='delete-span delete-film'>Excluir</span></li>";
			}
		}

		document.getElementById("film-list").innerHTML = filmList;
		MDB.listMovies.deleteMovies();

	}

	function resetForm() {
		box.value ="";
	}

	function bindEvents() {
		form.addEventListener("submit", function(e){
			e.preventDefault();
			searchMovieService();
		});

		box.addEventListener("keyup", function(){
			var term = this.value;
			searchMovieService(term);
		});

	}

	return {
		init: function(){
			bindEvents();
		}
	}

})();

MDB.searchMovie.init();