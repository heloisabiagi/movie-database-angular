MV.listar = (function() {

	function getFilmsList() {

		$.ajax({
			url: "/ws/film",
			method: "GET",
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				var filmList = "";

				$.each(data, function(index, item) {
					if(item["title"]) {
						filmList += "<li data-id='" + item["_id"]+ "'><strong>" + item["title"]+ "</strong> - " + item["releaseYear"]+" <span class='delete-film'>Excluir</span></li>";
					}
				});

				$("#film-list").html(filmList);
				MV.listar.deleteFilm();
			}
		});

	}

	function deleteFilm(el){
		var id = el.parent().attr("data-id");

		$.ajax({
			url: "/ws/film/" + id,
			method: "DELETE",
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				alert("Filme excluído com sucesso");
				MV.socket.emit('refresh list', 'catálogo atualizado');
			}
		});

	}

	return {
		init: function(){
			getFilmsList();
			this.events();
		},
		events: function() {
			MV.socket.on('refresh list', function(msg){
				getFilmsList();
  			});

			this.deleteFilm();
		},
		deleteFilm: function() {
			$(".delete-film").on("click", function(){
				var el = $(this);
				deleteFilm(el);
			});
		}
	}
})();

MV.listar.init();