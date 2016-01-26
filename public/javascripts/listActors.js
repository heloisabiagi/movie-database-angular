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
						actorsList += "<li data-id='" + item["_id"]+ "'><a href='/ator/" + item["_id"] +"'><strong>" + item["name"]+ "</strong></a> - " + item["placeOfBirth"]+" <span class='delete-span delete-actor'>Excluir</span> </li>";
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
			url: "/ws/actor/show/" + id,
			method: "DELETE",
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				alert("Ator excluído com sucesso");
				MDB.socket.emit('refresh actors', 'catálogo atualizado');
			}
		});

	}

	return {
		init: function(){
			getActorsList();
			this.events();
		},
		events: function() {
			MDB.socket.on('refresh actors', function(msg){
				getActorsList();
  			});

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