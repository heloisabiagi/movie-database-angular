MDB.showMovie = (function() {

	function getMovie(update) {

		var movieId = location.pathname.split("/").pop();

		var url = "/ws/film/show/" + movieId;
		var http = new XMLHttpRequest();
		http.open("GET", url, true);
		http.setRequestHeader("Content-type", "application/json"); //Send the proper header information along with the request
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				var data = JSON.parse(http.responseText);
				populateMovieData(data, update);
			}
		}
		http.send();

	}

	function populateMovieData(data, update){
		var movieInfo = "";
		movieInfo += "<dt>Título:</dt>";
		movieInfo += "<dd class='data' data-type='text' id='title'>" + data.title + "</dd>";
		movieInfo += "<dt>Classificação:</dt>";
		movieInfo += "<dd id='rating'>" + data.rating + "</dd>";
		movieInfo += "<dt>Ano de lançamento:</dt>";
		movieInfo += "<dd class='data' data-type='number' id='releaseYear'>" + data.releaseYear + "</dd>";

		var movieContainer = document.getElementById("show-movie");
		movieContainer.innerHTML = movieInfo;

		if(update) {
			document.querySelector(".edit-movie").style.display = "block";
			document.querySelector(".cancel-edit").remove();
			document.querySelector(".save-edit").remove();
		}

	}

	function editMovie(){
		var movieData = document.querySelectorAll("#show-movie .data");

		for(mD=0; mD < movieData.length; mD++) {
			el = movieData[mD];
			var editInput;

			switch(true) {
			case el.getAttribute("data-type") == "number":
				editInput = "<input type='number' id='" + el.getAttribute("id") + "' value='"+el.textContent +"' />";
			break;

			default:
				editInput = "<input type='text' id='" + el.getAttribute("id") + "' value='" + el.textContent +"' />";
			}

			el.innerHTML = editInput;
		}

		document.querySelector(".form-buttons").innerHTML = document.querySelector(".form-buttons").innerHTML + '<button class="cancel-edit alert"> Cancelar </button> <button class="save-edit success"> Salvar </button>';
		document.querySelector(".edit-movie").style.display = "none";
		updateEvents();
	}


	function updateMovie(){
		var movie = {};
		var list = document.getElementById("show-movie");
		var movieId = location.pathname.split("/").pop();

		movie._id = movieId;
		movie.title = list.querySelector("input#title").value;
		movie.rating = list.querySelector("#rating").textContent;
		movie.releaseYear = parseInt(list.querySelector("input#releaseYear").value);
		movie.hasCreditCookie = false;

		var myData = JSON.stringify(movie);

		var url = "/ws/film/show/" + movieId;
		var http = new XMLHttpRequest();
		http.open("PUT", url, true);
		http.setRequestHeader("Content-type", "application/json"); //Send the proper header information along with the request
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				var data = JSON.parse(http.responseText);
				alert("Dados atualizados com sucesso!");
				getMovie("update");
				editEvents();
			}
		}
		http.send(myData);

		return false;

	}

	function editEvents(){
		document.querySelector(".edit-movie").addEventListener("click", function(){
			editMovie();
		});
	}

	function updateEvents(){
		document.querySelector(".cancel-edit").addEventListener("click", function(){
			getMovie("update");
			editEvents();
		});

		document.querySelector(".save-edit").addEventListener("click", function(){
			updateMovie();
		});

	}

	return {
		init: function(){
			getMovie();
			editEvents();
		}
	}
})();

MDB.showMovie.init();