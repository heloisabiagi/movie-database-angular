MDB.addFilm = (function() {

	function postFilm(form) {
		var film = {};

		var form = form;
		film.title = form.querySelector("#title").value;
		film.rating = form.querySelector("#rating").value;
		film.releaseYear = form.querySelector("#releaseYear").value;
		film.synopsis = form.querySelector("#synopsis").value;
		film.hasCreditCookie = false;

		var myData = JSON.stringify(film);

		var url = "/ws/film";
		var http = new XMLHttpRequest();
		http.open("POST", url, true);

		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/json");
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				alert("Movie added successfully!");
				MDB.socket.emit('refresh list', 'catálogo atualizado');
				resetForm();
			}
		}
		http.send(myData);

	}

	function resetForm() {
		var formEls = document.querySelectorAll("#movie-form .form-control");
		for(fE=0; fE < formEls.length; fE++){
			formEls[fE].value = "";
		}

	}

	function bindEvents() {
		document.querySelector("#movie-form").addEventListener("submit", function(e){
			e.preventDefault();

			var form = this;
			postFilm(form);
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

MDB.addFilm.init();