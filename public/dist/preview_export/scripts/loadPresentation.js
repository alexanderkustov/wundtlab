var loadPresentation = function() {
	

	var newURL = document.URL;
	var apresentacao = newURL.split('#');
	console.log(apresentacao[1]);

	var presentation = apresentacao[1]; 
	//need to get content of this file

	$.ajax({
	    url : presentation,
	    success : function(result){
			console.log(result);
	    }
	});

	//var presentation = localStorage.getItem(apresentacao[1]);
	//var presentation = localStorage.getItem('preview-string');
	var config = JSON.parse(localStorage.getItem('preview-config'));
	
	if (presentation) {
		document.body.innerHTML = result;
	//	document.body.className = config.surface + " " + document.body.className;
	}
};
