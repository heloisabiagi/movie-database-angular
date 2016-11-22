MDB.ListComponent = function(type){
	this.dataType = type;
}

MDB.ListComponent.prototype.getList = function(){
	var obj = this;
	var url = "/ws/" + obj.dataType;
	
	var http = new XMLHttpRequest();
	http.open("GET", url, true);
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var data = JSON.parse(http.responseText);
			var itemList = "";
			for(i=0; i< data.length; i++){
				var item = data[i];

				if(item["title"] || item["name"]) {
					var getItems = obj.renderItems(item);
					itemList += "<li data-id='" + item["_id"]+ "'>" + getItems + "</li>";
				}
			}

			document.getElementById(obj.dataType + "-list").innerHTML = itemList;
			obj.deleteEvent();
		}
	}
	http.send();

}

MDB.ListComponent.prototype.renderItems = function(item){
	var obj = this;
	var shortData = ["releaseYear", "synopsis", "placeOfBirth", "shortBio"];
	var itemTitle = item["title"] ? item["title"]: item["name"];
	var output;

	var itemName = itemTitle.toLowerCase().replace(/\s[\:\,\'\-]\s/g, " ").split(" ").join("-");
	  output = '<div class="media">';
	  output += '<a class="media-left" href="/'+ obj.dataType +'/'+ item["_id"]+'">';
	  output += '<img class="media-object" src="/images/'+ itemName+ '.jpg" alt="'+ itemTitle +'">';
	  output += '</a>';
	  output += '<div class="media-body">';
	  output += '<h3 class="media-heading"><a href="/'+ this.dataType +'/' + item["_id"] +'">'+ itemTitle +'</a> <span class="delete-span delete-' + obj.dataType +'">Delete</span></h3>';
	  
	  for (var prop in item) {
	  	if(shortData.indexOf(prop) > -1) {
	  		output += '<p>' + item[prop] + '</p>';
	  	}
	  }
	  
	  output += '</div>';
	  output += '</div>';
	  return output;	
}

MDB.ListComponent.prototype.deleteEvent = function(){
	var obj = this;
	var deleteButtons = document.querySelectorAll(".delete-" + obj.dataType);

	for(dM=0; dM< deleteButtons.length; dM++){
		var deleteButton = deleteButtons[dM];

		deleteButton.addEventListener("click", function(){
			var el = this;
			obj.deleteThisItem(el);
		});
	}
}

MDB.ListComponent.prototype.deleteThisItem = function(el){
	var obj = this;
	var id = MDB.findClosest(el, "li").getAttribute("data-id");
	var url = "/ws/" + obj.dataType + "/show/" + id;

	var http = new XMLHttpRequest();
	http.open("DELETE", url, true);
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			alert(obj.dataType.capitalize() + " successfully deleted");
			MDB.socket.emit('refresh ' + obj.dataType, 'updated data');
		}
	}
	
	http.send();

}


MDB.ListComponent.prototype.startList = function(){
	var obj = this;
	obj.getList();

	MDB.socket.on('refresh ' + obj.dataType, function(msg){
		obj.getList();
  	});

}