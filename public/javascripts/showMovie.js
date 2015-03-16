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
				movieInfo += "<dt>Elenco:</dt>";
				movieInfo += "<dd id='cast'><ul class='cast'>";

					$.each(data.cast, function(index, item) {
						movieInfo += "<li data-type='actor' data-id='" + item["_id"] + "'><span> <a href='/ator/"+item["_id"]+"'> "+ item["name"] +"</a></span></li>";
					});

				movieInfo += "</ul></dd>";	

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

		$("ul.cast").append("<li data-type='actor'><input type='text' class='cast' value='Adicionar Ator'></input></li>")
		$("li[data-type='actor'] span").append(' <span class="delete-span delete-actor">Excluir</span>');
		$(".form-buttons").append('<button class="cancel-edit alert"> Cancelar </button> <button class="save-edit success"> Salvar </button>');
		$(".edit-movie").hide();
		MDB.showMovie.removeActor();
		MDB.showMovie.cancelEdition();
		MDB.showMovie.updateCast();
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
		movie.cast = [];

		$("li[data-type='actor']").each(function(){
			var actor = $(this).attr('data-id');
			if(actor && actor !== "") {
				movie.cast.push(actor);
			}
		});

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

	function removeActor(el) {
		el.closest("li").remove();
	}

	function updateCast(el, actor) {
		el.closest("li").attr("data-id", actor);
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
		updateCast: function() {
			$("input.cast").on("blur", function(){
				var el = $(this);
				var actor = $(this).val();
				updateCast(el, actor);
			});
		},
		removeActor: function() {
			$(".delete-actor").on("click", function(){
				el = $(this);
				removeActor(el);
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