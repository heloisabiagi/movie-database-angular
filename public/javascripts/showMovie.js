MDB.showMovie = (function() {

	function getMovie(update) {

		var movieId = location.pathname.split("/").pop();
		$.ajax({
			url: "/ws/film/show/" + movieId,
			method: "GET",
			contentType: "application/json",
			dataType: "json",
			success: function(data) {

				var movieInfo = "";
				movieInfo += "<dt>Título:</dt>";
				movieInfo += "<dd class='data' data-type='text' id='title'>" + data.title + "</dd>";
				movieInfo += "<dt>Classificação:</dt>";
				movieInfo += "<dd id='rating'>" + data.rating + "</dd>";
				movieInfo += "<dt>Ano de lançamento:</dt>";
				movieInfo += "<dd class='data' data-type='number' id='releaseYear'>" + data.releaseYear + "</dd>";

				$("#show-movie").html(movieInfo);
				if(update) {
					$(".edit-movie").show();
					$(".cancel-edit").remove();
					$(".save-edit").remove();
				}
			}
		});

	}

	function editMovie(){

		$("#show-movie .data").each(function(){
			el = $(this);
			var editInput;

			switch(true) {

			case el.attr("data-type") == "number":
				editInput = "<input type='number' id='" + el.attr("id") + "' value='"+el.text()+"' />";
			break;

			default:
				editInput = "<input type='text' id='" + el.attr("id") + "' value='" + el.text() +"' />";
			}

			el.html(editInput);
		});

		$(".form-buttons").append('<button class="cancel-edit alert"> Cancelar </button> <button class="save-edit success"> Salvar </button>');
		$(".edit-movie").hide();
		MDB.showMovie.cancelEdition();
		MDB.showMovie.saveEdition();
	}


	function updateMovie(){
		var movie = {};
		var list = $("#show-movie");
		var movieId = location.pathname.split("/").pop();

		movie._id = movieId;
		movie.title = list.find("input#title").val();
		movie.rating = list.find("#rating").text();
		movie.releaseYear = parseInt(list.find("input#releaseYear").val());
		movie.hasCreditCookie = false;

		var myData = JSON.stringify(movie);

		$.ajax({
			url: "/ws/film/show/" + movieId,
			method: "PUT",
			contentType: "application/json",
			dataType: "json",
			data: myData,
			success: function(xhr) {
				alert("Dados atualizados com sucesso!");
				getMovie("update");
			}
		});

		return false;

	}

	return {
		init: function(){
			getMovie();
			this.events();
		},
		events: function() {
			$(".edit-movie").on("click", function(){
				editMovie();
			});
		},
		cancelEdition: function() {
			$(".cancel-edit").on("click", function(){
				getMovie("update");
			});
		},
		saveEdition: function() {
			$(".save-edit").on("click", function(){
				updateMovie();
			});
		}
	}
})();

MDB.showMovie.init();