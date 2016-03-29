MDB.searchActors = (function() {
	var form = document.getElementById("search-form");
	var box = document.getElementById("search-box");

	function searchActorService(term) {

		var term = term || box.value;

		var url = "/ws/actor/search?term=" + term;
		var http = new XMLHttpRequest();
		http.open("GET", url, true);
		http.setRequestHeader("Content-type", "application/json"); //Send the proper header information along with the request
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				var data = JSON.parse(http.responseText);
				searchResult(data);
			}
		}
		http.send();

	}

	function searchResult(data){
		var actorsList = "";
		for(aL=0; aL < data.length; aL++){
			var item = data[aL];

			if(item["name"]) {
				var getActor = MDB.listActors.renderActor(item);
				actorsList += "<li data-id='" + item["_id"]+ "'>" + getActor + "</li>";
			}
		}

		document.getElementById("actors-list").innerHTML = actorsList;
		MDB.listActors.deleteActors();

	}

	function resetForm() {
		box.value = "";
	}

	function bindEvents() {
		form.addEventListener("submit", function(e){
			e.preventDefault();
			searchActorService();
		});

		box.addEventListener("keyup", function(){
			var term = this.value;
			searchActorService(term);
		});

	}

	return {
		init: function(){
			bindEvents();
		}
	}

})();

MDB.searchActors.init();