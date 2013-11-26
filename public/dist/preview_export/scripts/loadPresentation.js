//ORIGNAL

/*
var loadPresentation = function() {
        var presentation = localStorage.getItem('preview-string');
        var config = JSON.parse(localStorage.getItem('preview-config'));

        if (presentation) {
                document.body.innerHTML = presentation;
        //        document.body.className = config.surface + " " + document.body.className;
        }
};
*/

var loadPresentation = function() {

	var newURL = document.URL;
	var apresentacao = newURL.split('#');

	//caminho da apresentacao
	//console.log(apresentacao[1]);

	var presentation = apresentacao[1];
	//need to get content of this file

	var resultado = $.ajax({
	url : presentation,
		success : function(result){
			async: false,
			paraprocessar = result;

		}
	});


	$.when( resultado ).done(function(){

	var html = paraprocessar;
	var init = html.indexOf("<body>");
	var end = html.indexOf("</body>");
	var conteudo = html.substring(init,end);

	console.log("!!!SUBSTRING!!!!!!!!!");
	console.log(conteudo);
	console.log("!!!FINAL!!!!!!!!!");
		document.body.innerHTML = conteudo;
	});

	//var presentation = localStorage.getItem(apresentacao[1]);
	//var presentation = localStorage.getItem('preview-string');
	//var config = JSON.parse(localStorage.getItem('preview-config'));
 

	//	document.body.className = config.surface + " " + document.body.className;

};