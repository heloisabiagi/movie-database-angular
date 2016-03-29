MDB.addActor = (function() {

	function postActor(form) {
		var actor = {};

		var formattedDate = form.querySelector("#dateOfBirth").value.replace("-", ",");


		actor.name = form.querySelector("#name").value;
		actor.dateOfBirth = new Date(formattedDate);
		actor.placeOfBirth = form.querySelector("#placeOfBirth").value;
		actor.shortBio = form.querySelector("#shortBio").value;

		var myData = JSON.stringify(actor);

		var url = "/ws/actor";
		
		var http = new XMLHttpRequest();
		http.open("POST", url, true);
		http.setRequestHeader("Content-type", "application/json"); //Send the proper header information along with the request
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				alert("Actor added successfully!");
				MDB.socket.emit('refresh actors', 'catálogo atualizado');
				resetForm();
			}
		}
		http.send(myData);

	}

	function resetForm() {
		var formEls = document.querySelectorAll("#actor-form .form-control");
		for(fE=0; fE < formEls.length; fE++){
			formEls[fE].value = "";
		}
	}

	function bindEvents() {

		document.querySelector("#actor-form").addEventListener("submit", function(e){
			e.preventDefault();
			var form = this;
			postActor(form);
		});


		MDB.socket.on('refresh actors', function(msg){
			console.log(msg);
  		});

	}

	return {
		init: function(){
			bindEvents();
		}
	}
})();

MDB.addActor.init();