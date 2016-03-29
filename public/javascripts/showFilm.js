MDB.showFilm = (function() {

	function getFilm(update) {

		var filmId = location.pathname.split("/").pop();

		var url = "/ws/film/show/" + filmId;
		var http = new XMLHttpRequest();
		http.open("GET", url, true);
		http.setRequestHeader("Content-type", "application/json");
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				var data = JSON.parse(http.responseText);
				populateFilmData(data, update);
			}
		}
		http.send();

	}

	function populateFilmData(data, update){
		var filmInfo = "";
		filmInfo += "<dt class='hidden'>Title:</dt>";
		filmInfo += "<dd class='data' data-type='text' id='title'>" + data.title + "</dd>";
		filmInfo += "<dt>Parental Guide:</dt>";
		filmInfo += "<dd class='data' data-type='select' id='rating'>" + data.rating + "</dd>";
		filmInfo += "<dt>Release Year:</dt>";
		filmInfo += "<dd class='data' data-type='number' id='releaseYear'>" + data.releaseYear + "</dd>";
		filmInfo += "<dt>Synopsis</dt>";
		filmInfo += "<dd class='data' data-type='textarea' id='synopsis'>" + data.synopsis + "</dd>";

		var filmContainer = document.getElementById("show-movie");
		filmContainer.innerHTML = filmInfo;

		var filmName = data["title"].toLowerCase().replace(/\s[\:\,\'\-]\s/g, " ").split(" ").join("-");
		var posterContainer = document.querySelector(".movie-poster");
		posterContainer.innerHTML = '<img src="/images/'+ filmName+ '.jpg" alt="'+ data["title"] +'">';

		if(update) {
			document.querySelector(".edit-movie").style.display = "block";
			document.querySelector(".cancel-edit").remove();
			document.querySelector(".save-edit").remove();
		}

	}

	function editFilm(){
		var filmData = document.querySelectorAll("#show-movie .data");

		for(mD=0; mD < filmData.length; mD++) {
			el = filmData[mD];
			var editInput;

			switch(true) {
			case el.getAttribute("data-type") == "number":
				editInput = "<input class='form-control' type='number' id='edit-" + el.getAttribute("id") + "' value='"+el.textContent +"' />";
			break;
			case el.getAttribute("data-type") == "textarea":
				editInput = "<textarea class='form-control' id='edit-" + el.getAttribute("id") + "'>" +el.textContent +"</textarea>";
			break;
			case el.getAttribute("data-type") == "select":
				if(el.getAttribute("id") == "rating"){
					editInput = '<select name="rating" id="edit-rating" class="form-control">'
					editInput += '<option value="free">Free</option>';
					editInput += '<option value="PG-13">PG-13</option>';
					editInput += '<option value="PG-17">PG-17</option>';
					editInput += '</select>';
				}
			break;
			default:
				editInput = "<input class='form-control' type='text' id='edit-" + el.getAttribute("id") + "' value='" + el.textContent +"' />";
			}

			el.innerHTML = editInput;
		}

		document.querySelector(".form-buttons").innerHTML = document.querySelector(".form-buttons").innerHTML + '<button class="cancel-edit btn btn-default"> Cancel </button> <button class="save-edit btn btn-primary"> Save </button>';
		document.querySelector(".edit-movie").style.display = "none";
		updateEvents();
	}


	function updateFilm(){
		var film = {};
		var list = document.getElementById("show-movie");
		var filmId = location.pathname.split("/").pop();

		film._id = filmId;
		film.title = list.querySelector("#edit-title").value;
		film.rating = list.querySelector("#edit-rating").value;
		film.releaseYear = parseInt(list.querySelector("#edit-releaseYear").value);
		film.synopsis = list.querySelector("#edit-synopsis").value;
		film.hasCreditCookie = false;

		var myData = JSON.stringify(film);

		var url = "/ws/film/show/" + filmId;
		var http = new XMLHttpRequest();
		http.open("PUT", url, true);
		http.setRequestHeader("Content-type", "application/json");
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				var data = JSON.parse(http.responseText);
				alert("Data uploaded successfully!");
				getFilm("update");
				editEvents();
			}
		}
		http.send(myData);

		return false;

	}

	function editEvents(){
		document.querySelector(".edit-movie").addEventListener("click", function(){
			editFilm();
		});
	}

	function updateEvents(){
		document.querySelector(".cancel-edit").addEventListener("click", function(){
			getFilm("update");
			editEvents();
		});

		document.querySelector(".save-edit").addEventListener("click", function(){
			updateFilm();
		});

	}

	return {
		init: function(){
			getFilm();
			editEvents();
		}
	}
})();

MDB.showFilm.init();