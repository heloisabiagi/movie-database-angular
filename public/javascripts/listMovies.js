MDB.listMovies = (function() {

	function getMoviesList() {

		var url = "/ws/film";
		var http = new XMLHttpRequest();
		http.open("GET", url, true);
		http.setRequestHeader("Content-type", "application/json"); //Send the proper header information along with the request
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				var data = JSON.parse(http.responseText);

				var filmList = "";
				for(i=0; i< data.length; i++){
					var item = data[i];
					if(item["title"]) {
						filmList += "<li data-id='" + item["_id"]+ "'><a href='/filme/" + item["_id"] +"'><strong>" + item["title"]+ "</strong></a> - " + item["releaseYear"]+" <span class='delete-span delete-film'>Excluir</span></li>";
					}
				}

				document.getElementById("film-list").innerHTML = filmList;
				deleteMovies();
			}
		}
		http.send();
	}

	function deleteThisMovie(el){
		var id = el.parentNode.getAttribute("data-id");

		var url = "/ws/film/show/" + id;
		var http = new XMLHttpRequest();
		http.open("DELETE", url, true);
		http.setRequestHeader("Content-type", "application/json"); //Send the proper header information along with the request
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				alert("Filme excluído com sucesso");
				MDB.socket.emit('refresh list', 'catálogo atualizado');
			}
		}
		http.send();
	}

	function deleteMovies(){
		var deleteButtons = document.querySelectorAll(".delete-film");

		for(dM=0; dM< deleteButtons.length; dM++){
			var deleteButton = deleteButtons[dM];

			deleteButton.addEventListener("click", function(){
				var el = this;
				deleteThisMovie(el);
			});
		}
	}

	function bindEvents(){
		MDB.socket.on('refresh list', function(msg){
				getMoviesList();
  		});

  		deleteMovies();
	}

	return {
		init: function(){
			getMoviesList();
			bindEvents();
		},
		deleteMovies: deleteMovies
	}
})();

MDB.listMovies.init();