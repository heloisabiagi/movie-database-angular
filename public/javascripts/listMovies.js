MDB.listMovies = (function() {

	function getMoviesList() {

		$.ajax({
			url: "/ws/film",
			method: "GET",
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				var filmList = "";

				$.each(data, function(index, item) {
					if(item["title"]) {
						filmList += "<li data-id='" + item["_id"]+ "'><strong>" + item["title"]+ "</strong> - " + item["releaseYear"]+" <span class='delete-span delete-film'>Excluir</span></li>";
					}
				});

				$("#film-list").html(filmList);
				MDB.listMovies.deleteMovie();
			}
		});

	}

	function deleteMovie(el){
		var id = el.parent().attr("data-id");

		$.ajax({
			url: "/ws/film/" + id,
			method: "DELETE",
			contentType: "application/json",
			dataType: "json",
			success: function(data) {
				alert("Filme excluído com sucesso");
				MDB.socket.emit('refresh list', 'catálogo atualizado');
			}
		});

	}

	return {
		init: function(){
			getMoviesList();
			this.events();
		},
		events: function() {
			MDB.socket.on('refresh list', function(msg){
				getMoviesList();
  			});

			this.deleteMovie();
		},
		deleteMovie: function() {
			$(".delete-film").on("click", function(){
				var el = $(this);
				deleteMovie(el);
			});
		}
	}
})();

MDB.listMovies.init();