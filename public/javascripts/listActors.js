MDB.listActors = (function() {

	function getActorsList() {

		var url = "/ws/actor";
		var http = new XMLHttpRequest();
		http.open("GET", url, true);
		http.setRequestHeader("Content-type", "application/json"); 
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				var data = JSON.parse(http.responseText);

				var actorsList = "";
				for(i=0; i< data.length; i++){
					var item = data[i];
					if(item["name"]) {
						var getActor = renderActor(item);
						actorsList += "<li data-id='" + item["_id"]+ "'>" + getActor + "</li>";					}
				}

				document.getElementById("actors-list").innerHTML = actorsList;
				deleteActors();
			}
		}
		http.send();

	}

	function renderActor(item){
		var output;
		var actorName = item["name"].toLowerCase().replace(/\s/g, "-");
		  output = '<div class="media">';
		  output += '<a class="media-left" href="/actor/'+ item["_id"]+'">';
		  output += '<img class="media-object" src="/images/'+ actorName+ '.jpg" alt="'+ item["name"]+'">';
		  output += '</a>';
		  output += '<div class="media-body">';
		  output += '<h3 class="media-heading"><a href="/actor/' + item["_id"] +'">'+ item["name"] +'</a> <span class="delete-span delete-actor">Delete</span></h3>';
		  output += '<span class="small-data">' + item["placeOfBirth"] + '</span>';
		  output += '<p>' + item["shortBio"] +'</p>';
		  output += '</div>';
		  output += '</div>';
		  return output;
	}

	function deleteThisActor(el){
		var id = MDB.findClosest(el, "li").getAttribute("data-id");

		var url = "/ws/actor/show/" + id;
		var http = new XMLHttpRequest();
		http.open("DELETE", url, true);
		http.setRequestHeader("Content-type", "application/json");
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				alert("Actor successfully deleted");
				MDB.socket.emit('refresh actor', 'catálogo atualizado');
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
				deleteThisActor(el);
			});
		}
	}

	function bindEvents(){
		MDB.socket.on('refresh actor', function(msg){
				getActorsList();
  		});

		deleteActors();

	}

	return {
		init: function(){
			getActorsList();
			bindEvents();
		},
		deleteActors: deleteActors,
		renderActor: renderActor
	}
})();

MDB.listActors.init();