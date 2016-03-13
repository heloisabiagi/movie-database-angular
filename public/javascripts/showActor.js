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
				var monthPosition = month + 1;

				if(day < 10) {
					day = "0" + day;
				}

				if(monthPosition < 10) {
					monthPosition = "0" + monthPosition;
				}

				var actorInfo = "";
				actorInfo += "<dt>Nome:</dt>";
				actorInfo += "<dd class='data' data-type='text' id='name'>" + data.name + "</dd>";
				actorInfo += "<dt>Data de nascimento:</dt>";
				actorInfo += "<dd class='data' data-type='date' data-day='" + birthDay.getFullYear() + "-" + monthPosition + "-" + day + "' id='dateOfBirth'>" + day + "/" + monthPosition + "/" + birthDay.getFullYear() + "</dd>";
				actorInfo += "<dt>Local de nascimento:</dt>";
				actorInfo += "<dd class='data' data-type='text' id='placeOfBirth'>" + data.placeOfBirth + "</dd>";

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

		$(".form-buttons").append('<button class="cancel-edit alert"> Cancelar </button> <button class="save-edit success"> Salvar </button>');
		$(".edit-actor").hide();
		MDB.showActor.cancelEdition();
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