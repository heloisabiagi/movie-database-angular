MDB.showActor = (function() {

	function getActor(update) {

		var actorId = location.pathname.split("/").pop();
		$.ajax({
			url: "/ws/actor/show/" + actorId,
			method: "GET",
			contentType: "application/json",
			dataType: "json",
			success: function(data) {

				var birthDay = new Date(data.dateOfBirth);
				var day = birthDay.getDate();
				var month = birthDay.getMonth();

				if(day < 10) {
					day = "0" + day;
				}

				if(month < 10) {
					month = "0" + month;
				}

				var actorInfo = "";
				actorInfo += "<dt>Nome:</dt>";
				actorInfo += "<dd class='data' data-type='text' id='name'>" + data.name + "</dd>";
				actorInfo += "<dt>Data de nascimento:</dt>";
				actorInfo += "<dd class='data' data-type='date' data-day='" + birthDay.getFullYear() + "-" + month + "-" + day + "' id='dateOfBirth'>" + birthDay.getDate() + "/" + birthDay.getMonth() + "/" + birthDay.getFullYear() + "</dd>";
				actorInfo += "<dt>Local de nascimento:</dt>";
				actorInfo += "<dd class='data' data-type='text' id='placeOfBirth'>" + data.placeOfBirth + "</dd>";
				actorInfo += "<dt>Filmes:</dt>";
				actorInfo += "<dd id='filmography'><ul class='filmography'>";

					$.each(data.filmography, function(index, item) {
						actorInfo += "<li data-type='film' data-id='" + item["_id"] + "'><span> <a href='/filme/"+item["_id"]+"'> "+ item["title"] + "</a> - " + item["releaseYear"] +"</span></li>";
					});

				actorInfo += "</ul></dd>";	

				$("#show-actor").html(actorInfo);
				if(update) {
					$(".edit-actor").show();
					$(".cancel-edit").remove();
					$(".save-edit").remove();
				}
			}
		});

	}

	function editActor(){
		$("#show-actor .data").each(function(){
			el = $(this);
			var editInput;

			switch(true) {

			case el.attr("data-type") == "date":
				editInput = "<input type='date' id='" + el.attr("id") + "' value='"+el.attr("data-day")+"' />";
			break;

			default:
				editInput = "<input type='text' id='" + el.attr("id") + "' value='" + el.text() +"' />";
			}

			el.html(editInput);
		});

		$("ul.filmography").append("<li data-type='film'><input type='text' class='filmography' value='Adicionar Filme'></input></li>")
		$("li[data-type='film'] span").append(' <span class="delete-span delete-film">Excluir</span>');
		$(".form-buttons").append('<button class="cancel-edit alert"> Cancelar </button> <button class="save-edit success"> Salvar </button>');
		$(".edit-actor").hide();
		MDB.showActor.removeMovie();
		MDB.showActor.cancelEdition();
		MDB.showActor.updateFilmography();
		MDB.showActor.saveEdition();
	}


	function updateActor(){
		var actor = {};
		var list = $("#show-actor");
		var formattedDate = list.find("input#dateOfBirth").val().replace("-", ",");
		var actorId = location.pathname.split("/").pop();

		actor._id = actorId;
		actor.name = list.find("input#name").val();
		actor.dateOfBirth = new Date(formattedDate);
		actor.placeOfBirth = list.find("input#placeOfBirth").val();
		actor.filmography = [];

		$("li[data-type='film']").each(function(){
			var movie = $(this).attr('data-id');
			if(movie && movie !== "") {
				actor.filmography.push(movie);
			}
		});

		var myData = JSON.stringify(actor);

		$.ajax({
			url: "/ws/actor/show/" + actorId,
			method: "PUT",
			contentType: "application/json",
			dataType: "json",
			data: myData,
			success: function(xhr) {
				alert("Dados atualizados com sucesso!");
				getActor("update");
			}
		});

		return false;

	}

	function removeMovie(el) {
		el.closest("li").remove();
	}

	function updateFilm(el, film) {
		el.closest("li").attr("data-id", film);
	}

	return {
		init: function(){
			getActor();
			this.events();
		},
		events: function() {
			$(".edit-actor").on("click", function(){
				editActor();
			});
		},
		updateFilmography: function() {
			$("input.filmography").on("blur", function(){
				var el = $(this);
				var film = $(this).val();
				updateFilm(el, film);
			});
		},
		removeMovie: function() {
			$(".delete-film").on("click", function(){
				el = $(this);
				removeMovie(el);
			});
		},
		cancelEdition: function() {
			$(".cancel-edit").on("click", function(){
				getActor("update");
			});
		},
		saveEdition: function() {
			$(".save-edit").on("click", function(){
				updateActor();
			});
		}
	}
})();

MDB.showActor.init();