var loadPresentation = function() {
//sacar o caminho do ficheiro nos uploads
var newURL = document.URL;
var apresentacao = newURL.split('#');
var presentation = apresentacao[1];
//se no caminho tiver a pasta uploads, faz load normal, else faz load de local storage
if(presentation.indexOf("uploads") !== -1)
{

//pedir o conteudo
var resultado = $.ajax({
	url : presentation,
	success : function(result){
		async: false,
		paraprocessar = result;
	}
});

//por o conteudo no innerHTML
$.when( resultado ).done(function(){

//substrining
var html = paraprocessar;
var init = html.indexOf("<body>");
var end = html.indexOf("</body>");
var conteudo = html.substring(init,end);
console.log(conteudo);

document.body.innerHTML = conteudo;
});

} else {
	//Funcao original do strut para load de localstorage
	var presentation = localStorage.getItem('preview-string');
	var config = JSON.parse(localStorage.getItem('preview-config'));
	if (presentation) {
		document.body.innerHTML = presentation;
//        document.body.className = config.surface + " " + document.body.className;
}
}

};