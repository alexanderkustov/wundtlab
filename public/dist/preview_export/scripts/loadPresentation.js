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


	var xmlhttp;
	
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		    xmlhttp = new XMLHttpRequest();
		}
		else { // code for IE6, IE5
		    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		        document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
		    }
		}
		xmlhttp.open("GET", "ajax_info.txt", true);
		xmlhttp.send();


	//var presentation = localStorage.getItem(apresentacao[1]);
	//var presentation = localStorage.getItem('preview-string');
	var config = JSON.parse(localStorage.getItem('preview-config'));
	
	if (presentation) {
		document.body.innerHTML = presentation;
	//	document.body.className = config.surface + " " + document.body.className;
	}
};
