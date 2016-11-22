MDB.listFilms = (function() {

	function getFilmsList() {

		var url = "/ws/film";
		var http = new XMLHttpRequest();
		http.open("GET", url, true);
		http.setRequestHeader("Content-type", "application/json");
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				var data = JSON.parse(http.responseText);

				var filmList = "";
				for(i=0; i< data.length; i++){
					var item = data[i];
					if(item["title"]) {
						var getFilm = renderFilm(item);
						filmList += "<li data-id='" + item["_id"]+ "'>" + getFilm + "</li>";
					}
				}

				document.getElementById("film-list").innerHTML = filmList;
				deleteFilms();
			}
		}
		http.send();
	}

	function renderFilm(item){
		var output;
		var filmName = item["title"].toLowerCase().replace(/\s[\:\,\'\-]\s/g, " ").split(" ").join("-");
		  output = '<div class="media">';
		  output += '<a class="media-left" href="/film/'+ item["_id"]+'">';
		  output += '<img class="media-object" src="/images/'+ filmName+ '.jpg" alt="'+item["title"]+'">';
		  output += '</a>';
		  output += '<div class="media-body">';
		  output += '<h3 class="media-heading"><a href="/film/' + item["_id"] +'">'+ item["title"] +'</a> <span class="delete-span delete-film">Delete</span></h3>';
		  output += '<span class="small-data">' + item["releaseYear"] + '</span>';
		  output += '<p>' + item["synopsis"] + '</p>';
		  output += '</div>';
		  output += '</div>';
		  return output;
	}

	function deleteThisFilm(el){
		var id = MDB.findClosest(el, "li").getAttribute("data-id");

		var url = "/ws/film/show/" + id;
		var http = new XMLHttpRequest();
		http.open("DELETE", url, true);
		http.setRequestHeader("Content-type", "application/json");
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				alert("Movie successfully deleted");
				MDB.socket.emit('refresh film', 'updated data');
			}
		}
		http.send();
	}

	function deleteFilms(){
		var deleteButtons = document.querySelectorAll(".delete-film");

		for(dM=0; dM< deleteButtons.length; dM++){
			var deleteButton = deleteButtons[dM];

			deleteButton.addEventListener("click", function(){
				var el = this;
				deleteThisFilm(el);
			});
		}
	}

	function bindEvents(){
		MDB.socket.on('refresh film', function(msg){
				getFilmsList();
  		});

  		deleteFilms();
	}

	return {
		init: function(){
			getFilmsList();
			bindEvents();
		},
		deleteFilms: deleteFilms,
		renderFilm: renderFilm
	}
})();

MDB.listFilms.init();