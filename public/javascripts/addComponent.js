MDB.AddComponent = function(type){
	this.dataType = type;
}

MDB.AddComponent.prototype.setData = function(){
	var obj = this;
	var elements = document.querySelectorAll(".form-control");
	var dataObj = {};

	for(el = 0; el < elements.length; el++) {
		var formEl = elements[el];
		var formElId = formEl.getAttribute("id");

		if(formElId == "dateOfBirth") {
			var formattedDate = formEl.value.replace("-", ",");
			dataObj[formElId] = new Date(formattedDate);
		} else { 
			dataObj[formElId] = formEl.value;
		}
	}

	obj.postData(dataObj);

}

MDB.AddComponent.prototype.resetForm = function(){
	var formEls = document.querySelectorAll("form .form-control");
		for(fE=0; fE < formEls.length; fE++){
			formEls[fE].value = "";
	}
}


MDB.AddComponent.prototype.postData = function(dataObj){
	var obj = this;
	var myData = JSON.stringify(dataObj);
	var url = "/ws/" + obj.dataType;
	var socketEvent = 'refresh ' + obj.dataType;
		
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			alert(obj.dataType.capitalize() + " added successfully!");

			MDB.socket.emit(socketEvent, 'updated data');
			obj.resetForm();
		}
	}

	http.send(myData);
}

MDB.AddComponent.prototype.bindEvents = function(){
	var obj = this;
	var socketEvent = 'refresh ' + obj.dataType;

	var formType = '#' + obj.dataType + '-form';

	try {
		document.querySelector(formType).addEventListener("submit", function(e){
			e.preventDefault();
			var form = this;
			obj.setData();
		});

	} catch(err) {
		console.log(err.message);
	}

	MDB.socket.on(socketEvent, function(msg){
		console.log(msg);
  	});
}