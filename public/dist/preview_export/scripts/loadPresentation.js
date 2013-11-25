var loadPresentation = function() {

var newURL = document.URL;
var apresentacao = newURL.split('#');


//caminho da apresentacao
console.log(apresentacao[1]);

var presentation = apresentacao[1];
//need to get content of this file

var paraprocessar;

$.ajax({
url : presentation,
	success : function(result){
	async: false,
	console.log("!!!!RESULTADO!!!!!!!!!");
	console.log(result);
	paraprocessar = result;
	console.log("!!!!FINAL!!!!!!!!!");
}
});


console.log("!!!!AJAX!!!!!!!!!");


var html = paraprocessar;
var init = html.indexOf("<body>");
var end = html.indexOf("</body>");
var body = html.substring(init,end);

console.log("!!!SUBSTRING!!!!!!!!!");

console.log(body);

//var presentation = localStorage.getItem(apresentacao[1]);
//var presentation = localStorage.getItem('preview-string');
var config = JSON.parse(localStorage.getItem('preview-config'));

if (presentation) {
document.body.innerHTML = body;
//	document.body.className = config.surface + " " + document.body.className;
}
};