MDB.showActor = (function() {

	function getActor(update) {

		var actorId = location.pathname.split("/").pop();

		var url = "/ws/actor/show/" + actorId;
		var http = new XMLHttpRequest();
		http.open("GET", url, true);
		http.setRequestHeader("Content-type", "application/json"); //Send the proper header information along with the request
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				var data = JSON.parse(http.responseText);
				populateActorData(data, update);
			}
		}
		http.send();

	}

	function populateActorData(data, update){
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

		var actorContainer = document.getElementById("show-actor");
		actorContainer.innerHTML = actorInfo;

		if(update) {
			document.querySelector(".edit-actor").style.display = "block";
			document.querySelector(".cancel-edit").remove();
			document.querySelector(".save-edit").remove();
		}

	}

	function editActor(){
		var actorData = document.querySelectorAll("#show-actor .data");

		for(aD=0; aD< actorData.length; aD++){
			el = actorData[aD];
			var editInput;

			switch(true) {

			case el.getAttribute("data-type") == "date":
				editInput = "<input type='date' id='" + el.getAttribute("id") + "' value='"+ el.getAttribute("data-day")+ "' />";
			break;

			default:
				editInput = "<input type='text' id='" + el.getAttribute("id") + "' value='" + el.textContent +"' />";
			}

			el.innerHTML = editInput;
		}

		document.querySelector(".form-buttons").innerHTML = document.querySelector(".form-buttons").innerHTML + '<button class="cancel-edit alert"> Cancelar </button> <button class="save-edit success"> Salvar </button>';
		document.querySelector(".edit-actor").style.display = "none";
		updateEvents();
	}


	function updateActor(){
		var actor = {};
		var list = document.getElementById("show-actor");
		var formattedDate = list.querySelector("input#dateOfBirth").value.replace("-", ",");
		var actorId = location.pathname.split("/").pop();

		actor._id = actorId;
		actor.name = list.querySelector("input#name").value;
		actor.dateOfBirth = new Date(formattedDate);
		actor.placeOfBirth = list.querySelector("input#placeOfBirth").value;

		var myData = JSON.stringify(actor);

		var url = "/ws/actor/show/" + actorId;
		var http = new XMLHttpRequest();
		http.open("PUT", url, true);
		http.setRequestHeader("Content-type", "application/json"); //Send the proper header information along with the request
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				var data = JSON.parse(http.responseText);
				alert("Dados atualizados com sucesso!");
				getActor("update");
				editEvents();
			}
		}
		http.send(myData);

		return false;

	}

	function editEvents(){
		document.querySelector(".edit-actor").addEventListener("click", function(){
			editActor();
		});

	}

	function updateEvents(){
		document.querySelector(".cancel-edit").addEventListener("click", function(){
			getActor("update");
			editEvents();
		});

		document.querySelector(".save-edit").addEventListener("click", function(){
			updateActor();
		});

	}

	return {
		init: function(){
			getActor();
			editEvents();
		}
	}
})();

MDB.showActor.init();