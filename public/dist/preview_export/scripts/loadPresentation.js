var loadPresentation = function() {
	

	var newURL = document.URL;
	var apresentacao = newURL.split('#');
	console.log(apresentacao[1]);

	var presentation = apresentacao[1]; 
	//need to get content of this file

	// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList && window.Blob) {
		  // Great success! All the File APIs are supported.
		} else {
		  alert('The File APIs are not fully supported in this browser.');
		}



	//var presentation = localStorage.getItem(apresentacao[1]);
	//var presentation = localStorage.getItem('preview-string');
	var config = JSON.parse(localStorage.getItem('preview-config'));
	
	if (presentation) {
		document.body.innerHTML = presentation;
	//	document.body.className = config.surface + " " + document.body.className;
	}
};
