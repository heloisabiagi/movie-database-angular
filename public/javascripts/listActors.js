MDB.listActors = (function() {

	function getActorsList() {

		$.ajax({
			url: "/ws/actor",
			method: "GET",
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				var actorsList = "";

				$.each(data, function(index, item) {
					if(item["name"]) {
						actorsList += "<li data-id='" + item["_id"]+ "'><strong>" + item["name"]+ "</strong> - " + item["placeOfBirth"]+" <span class='delete-span delete-actor'>Excluir</span></li>";
					}
				});

				$("#actors-list").html(actorsList);
				MDB.listActors.deleteActor();
			}
		});

	}

	function deleteActor(el){
		var id = el.parent().attr("data-id");

		$.ajax({
			url: "/ws/actor/" + id,
			method: "DELETE",
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				alert("Ator excluído com sucesso");
			}
		});

	}

	return {
		init: function(){
			getActorsList();
			this.events();
		},
		events: function() {

			this.deleteActor();
		},
		deleteActor: function() {
			$(".delete-actor").on("click", function(){
				var el = $(this);
				deleteActor(el);
			});
		}
	}
})();

MDB.listActors.init();