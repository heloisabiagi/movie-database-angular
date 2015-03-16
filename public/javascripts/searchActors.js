MDB.searchActors = (function() {

	function searchActorService(term) {

		var term = term || $("#search-box").val();

		$.ajax({
			url: "/ws/actor/search?term=" + term,
			method: "GET",
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				var actorsList = "";

				$.each(data, function(index, item) {
					if(item["name"]) {
						actorsList += "<li data-id='" + item["_id"]+ "'><a href='/ator/" + item["_id"] + "'> <strong>" + item["name"]+ "</strong></a> - " + item["placeOfBirth"]+" <span class='delete-span delete-film'>Excluir</span></li>";
					}
				});

				$("#actors-list").html(actorsList);
				MDB.listActors.deleteActor();
			}
		});

	}

	function resetForm() {
		var form = $("#search-form");
		form.find("#search-box").val("");
	}

	function bindEvents() {
		$("#search-form").on("submit", function(e){
			e.preventDefault();
			searchActorService();
		});

		$("#search-box").on("keyup", function(){
			var term = $(this).val();
			searchActorService(term);
		});

	}

	return {
		init: function(){
			bindEvents();
		}
	}

})();

MDB.searchActors.init();