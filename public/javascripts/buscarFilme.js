MV.buscar = (function() {

	function searchFilm(term) {

		var term = term || $("#search-box").val();

		$.ajax({
			url: "/ws/film/search?term=" + term,
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

	function resetForm() {
		var form = $("#search-form");
		form.find("#search-box").val("");
	}

	function bindEvents() {
		$("#search-form").on("submit", function(e){
			e.preventDefault();
			searchFilm();
		});

		$("#search-box").on("keyup", function(){
			var term = $(this).val();
			searchFilm(term);
		});

	}

	return {
		init: function(){
			bindEvents();
		}
	}

})();

MV.buscar.init();