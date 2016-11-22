MDB.SearchComponent = function(type){
	this.dataType = type;
	this.searchForm = document.getElementById("search-form");
	this.searchBox = document.getElementById("search-box");
}

MDB.SearchComponent.prototype.searchService = function(term) {
	var obj = this;
	var term = term || obj.searchBox.value;
	var url = "/ws/" + obj.dataType + "/search?term=" + term;

	var http = new XMLHttpRequest();
	http.open("GET", url, true);
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var data = JSON.parse(http.responseText);
			obj.searchResult(data);
		}
	}
	http.send();
}

MDB.SearchComponent.prototype.searchResult = function(data) {
	var obj = this;
	var itemList = "";
		for(iL =0; iL < data.length; iL++){
			var item = data[iL];
			if(item["title"] || item["name"]) {
				var getFilm = MDB[obj.dataType+"sList"].renderItems.call(obj, item);
				itemList += "<li data-id='" + item["_id"]+ "'>" + getFilm + "</li>";
			}
		}

		document.getElementById(obj.dataType + "-list").innerHTML = itemList;
		MDB[obj.dataType+"sList"].deleteEvent();

}

MDB.SearchComponent.prototype.bindEvents = function(){
		var obj = this;

		obj.searchForm.addEventListener("submit", function(e){
			e.preventDefault();
			obj.searchService();
		});

		obj.searchBox.addEventListener("keyup", function(){
			var term = this.value;
			obj.searchService(term);
		});

}