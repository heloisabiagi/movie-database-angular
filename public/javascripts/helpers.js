MDB.hasClass = function(el, exp){
    return el.className.indexOf(exp) > -1 ? true: false;
}

MDB.addClass = function(el, exp){
    el.className = el.className + " " + exp;
}

MDB.findSiblings = function(el){
	var children = el.parentNode.children;
	  var siblings = [];
	  for(i=0; i< children.length; i++){
	  	if(children[i] !== el) {
	    	siblings.push(children[i]);
	    }
	  }
	  return siblings;
}

MDB.findClosest = function(el, exp){
	if(el.parentNode.tagName == exp.toUpperCase() || el.parentNode.id == exp || el.parentNode.className.indexOf(exp) > -1) {
		return el.parentNode;
	} else {
		return MDB.findClosest(el.parentNode, exp);
	}
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}