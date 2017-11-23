var Observable = require('FuseJS/Observable');

//on recupere toutes les informations provenant de la recherche
var response = this.Parameter;

debug_log("reception de : "+JSON.stringify(response));

var name = response.map(function(x) {return x.name;});
var prenom = response.map(function(x) {return x.prenom;});
var recepice =response.map(function(x) {return x.recepice;});
var statut = response.map(function(x) {return x.statut;});
var lieu = response.map(function(x) {return x.lieu;});
var localisation = response.map(function(x) {return x.localisation;});
var date = response.map(function(x) {return x.date;});

module.exports = {
	name: name
};
