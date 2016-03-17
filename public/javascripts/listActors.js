MDB.listActors = (function() {

	function getActorsList() {

		var url = "/ws/actor";
		var http = new XMLHttpRequest();
		http.open("GET", url, true);
		http.setRequestHeader("Content-type", "application/json"); //Send the proper header information along with the request
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				var data = JSON.parse(http.responseText);

				var actorsList = "";
				for(i=0; i< data.length; i++){
					var item = data[i];
					if(item["name"]) {
						actorsList += "<li data-id='" + item["_id"]+ "'><a href='/ator/" + item["_id"] +"'><strong>" + item["name"]+ "</strong></a> - " + item["placeOfBirth"]+" <span class='delete-span delete-actor'>Excluir</span> </li>";
					}
				}

				document.getElementById("actors-list").innerHTML = actorsList;
				deleteActors();
			}
		}
		http.send();

	}

	function deleteThisActor(el){
		var id = el.parentElement.getAttribute("data-id");

		var url = "/ws/actor/show/" + id;
		var http = new XMLHttpRequest();
		http.open("DELETE", url, true);
		http.setRequestHeader("Content-type", "application/json"); //Send the proper header information along with the request
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				alert("Ator excluído com sucesso");
				MDB.socket.emit('refresh actors', 'catálogo atualizado');
			}
		}
		http.send();

	}

	function deleteActors(){
		var deleteButtons = document.querySelectorAll(".delete-actor");
		for(dB=0; dB< deleteButtons.length; dB++){
			var deleteButton = deleteButtons[dB];

			deleteButton.addEventListener("click", function(){
				var el = this;
				console.log(el);
				deleteThisActor(el);
			});
		}
	}

	function bindEvents(){
		MDB.socket.on('refresh actors', function(msg){
				getActorsList();
  		});

		deleteActors();

	}

	return {
		init: function(){
			getActorsList();
			bindEvents();
		},
		deleteActors: deleteActors
	}
})();

MDB.listActors.init();