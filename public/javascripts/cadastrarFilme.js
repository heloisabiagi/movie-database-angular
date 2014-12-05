MV.cadastrar = (function() {

	function postFilm(form) {
		var movie = {};

		var form = form;
		movie.title = form.find("#title").val();
		movie.rating = form.find("#rating").val();
		movie.releaseYear = form.find("#releaseYear").val();
		movie.hasCreditCookie = false;

		var myData = JSON.stringify(movie);

		$.ajax({
			url: "/ws/film",
			method: "POST",
			contentType: "application/json",
			dataType: "json",
			data: myData,
			success: function(xhr) {
				alert("Filme cadastrado com sucesso!");
				resetForm();
			}
		}).done(function(){
			MV.socket.emit('refresh list', 'catálogo atualizado');
		});

	}

	function resetForm() {
		var form = $("#movie-form");
		form.find("#title").val("");
		form.find("#rating").val("free");
		form.find("#releaseYear").val("");
	}

	function bindEvents() {
		$("#movie-form").on("submit", function(e){
			e.preventDefault();

			var form = $(this);
			postFilm(form);
		});

		MV.socket.on('refresh list', function(msg){
			console.log(msg);
  		});

	}

	return {
		init: function(){
			bindEvents();
		}
	}
})();

MV.cadastrar.init();