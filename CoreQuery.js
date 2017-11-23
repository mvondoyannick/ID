var Observable = require('FuseJS/Observable');
var Timer = require('FuseJS/Timer');
var Base64 = require('FuseJS/Base64');
//var Share = require("FuseJS/Share")

debug_log("init CoreQuery Interface");

/* les indentifications */
var username = "elastic";
var password = "3XgF54XGezib9lACZ3ZGGUtD";
var error = Observable();
var visible = Observable("Visible");
var compteur = Observable(); //permet de recuperer les occurences trouvées
var TextContainer = Observable();
var phoneNumber = Observable();

/*les informations sur l'application et le versionning*/
var appName = "Plum"; //le nom de l'application
var appVersion = "0.0.1alfa";
var appDescription = "ID est une application permettant d'identifier la disponbilité de vos piece personnelles";
var developer = [
	{
		"team": "MVONDO Yannick",
		"twitter": "@mvondoyannick",
		"facebook": "fyloyannick",
		"phone": "",
		"email": "",
		"location": ""
	},
	{
		"team": "BELINGA Wazaf",
		"twitter": "",
		"facebook": "",
		"phone": "",
		"email": "",
		"location": ""
	}
]

/*les informations contenues dans le panneau lateral*/
var panneauLateral = [
	{
		"id": 01,
		"name": "Configuration",
		"icon": "Google",
		"route": "aucune"
	},
	{
		"id": 02,
		"name": "Notification",
		"icon": "NotificationClearAll",
		"route": "aucune"
	},
	{
		"id": 03,
		"name": "Mon compte",
		"icon": "Account",
		"route": "aucune"
	},
	{
		"id": 04,
		"name": "Recherche vocale",
		"icon": "Microphone",
		"route": "aucune"
	},
	/*{
		"id": 05,
		"name": "A propos",
		"icon": "Help",
		"route": "About"
	},*/
	{
		"id": 06,
		"name": "Mise a jour",
		"icon": "Update",
		"route": "aucune"
	},
	{
		"id": 07,
		"name": "Personnaliser",
		"icon": "Usb",
		"route": "aucune"
	},
	{
		"id": 08,
		"name": "Plus ...",
		"icon": "FolderPlus",
		"route": "aucune"
	},
	{
		"id": 09,
		"name": "Historique",
		"icon": "History",
		"route": "aucune"
	},
];


var moi = Observable("");
var donnee = Observable("salut");
var query = Observable("");
var phone = Observable("");


var ROOT_URL = "https://jsonplaceholder.typicode.com/";

function apiFetch(path, options) {
	var url = encodeURI(ROOT_URL + path);
	if(options === undefined) {
		options = {};
	}
	
	// If a body is provided, serialize it as JSON and set the Content-Type header
	if(options.body !== undefined) {
		options = Object.assign({}, options, {
			body: JSON.stringify(options.body),
			headers: Object.assign({}, options.headers, {
				"Content-Type": "application/json"
			})
		});
	}
	
	// Fetch the resource and parse the response as JSON
	return fetch(url, options)
		.then(function(response) { return response.json(); });
}

//on recupere les informations
function getArticle(id) {
	debug_log(" go");
	return apiFetch("users/" + id);
}

debug_log("Voici les resultats : "+JSON.stringify(getArticle(1)));



//la fonction permettant de reinitialiser les parametres
clear = (function(){
	debug_log("Clear ...");
	phoneNumber.value = "";
	query.value = "";
});

//fonction pour capturer le numéro telephone
CapturePhone = (function(name, phone, date, init_date){
	debug_log("Capture du numéro de télephone ...");
	this.name = name;
	this.numero = phone;
	this.date = new Date();
	this.init_date = new Date();
	debug_log(name+"--"+phone+"--"+date+"--"+init_date)
});

//CapturePhone("mvondo", 691451189, "11/11/17", "11/11/17");

SendSms = (function(recepisse, phone, date, frequency) {
	debug_log("Envoi du SMS ...");
	date = new Date();
	this.recepisse = recepisse,
	this.phone = phone,
	this.date = date,
	this.frequency = frequency
});


//la route pour charger about
function about(){
	//debug_log("cliked on about route");
	router.push("AboutView");
}

//la route pour aller a la carte
function gotoMap(){
	router.push("MapView");
}

/*recuperation de toutes les informations de la vue precedente*/
var hikr = this.Parameter;

var id = hikr.map(function(x) {return x.id; });
var name = hikr.map(function(x) {return x.name; });
var description = hikr.map(function(x) {return x.description; });
var picture = hikr.map(function(x) {return x.picture; });
var route = hikr.map(function(x) {return x.route; });
var service = hikr.map(function(x) {return x.service; });


/*fin de recuperation*/
/*==============================================================*/

//=============================================================================================
//=============================================================================================
//======================= INFORMATIONS SUR LE PANNEAU LATERAL =================================
//=============================================================================================
//=============================================================================================
/*acces a la page de configuration generale*/
function gotoConfiguration(arg){

	debug_log(JSON.stringify(arg.data));

	//ouvrir la route correspondate
	//router.push(JSON.stringify(arg.data.route).replace('"', ' '));
	router.push("ConfigurationView", arg.data);
}

//
function shareText(){
	debug_log("partage de fichiers");
  	//Share.shareText("https://www.fusetools.com/", "The link to Fuse website");
}

//=============================================================================================
//=============================================================================================
//======================= FERMETURE INFORMATIONS SUR LE PANNEAU LATERAL =======================
//=============================================================================================
//=============================================================================================

/*fonction pour le retour à la page d'accueil*/
function gotoHome(){
	router.goto("home");
	//router.goto("home");
}

/*gestion des routes et des redirections*/
function gotoCni(arg) {
	var data = arg.data;
	console.log("Les données recues : "+arg.data);
	//router.push("Fuse_MaterialDesign.SearchQuery");
}

//la vue qui est en charge de la response s'une requete
function requestResponse() {
	router.goto("ResponseView");
}

//redirection vers testView
function testView(){
	debug_log('reste de la route');
	router.push("TestView");
}

//fonction de retour
function goBack(){
	router.goBack();
}

//fonction permettant de faire le cri
function crier(){
	debug_log("ceci est un cri");
}

//autres option de recherche
function autreOption(){
	router.push("AutreOptionView");
}

/*nouvelle fonction de recherche de recepisse*/
SearchRecepisse = (function(BASE_URL, recepisse){
	//on vide le TextContainer
	TextContainer.value = "";
	this.recepisse = recepisse.trim();
	this.base_url = BASE_URL;
	debug_log("le recepisse : "+this.recepisse);
	debug_log("BASE_URL : "+this.base_url+this.recepisse.toUpperCase());
	fetch(this.base_url+this.recepisse.toUpperCase()).then(function(response){
		response.json().then(function(data){
			compteur.value = data.hits.total
			switch (data.hits.total)
			{
			   case "1": 
			    debug_log("nous avons trouvé "+data.hits.total+" occurence");
			    TextContainer.value = "La pièce d'identité correspondante au recepisse N°  "+JSON.stringify(data.hits.hits[0]._source.recepice)+"  est disponible.";
			   break;

			   case "0":
			   	debug_log("Aucune aucurrences trouvées ");
			   	TextContainer.value = "La pièce d'identité correspondante au recepisse N°  "+JSON.stringify(data.hits.hits[0]._source.recepice)+"  n'est pas encore disponible à cet instant précis.";
			   break;

			   case "2" || "3" || "4" || "5":
			   	debug_log("nous avons trouvé plusieurs occurences "+data.hits.total+" votre recherche semble rencontrer un probleme");
			   	TextContainer.value = "Cette piece d'identité contient plusieurs proprietaires. Contacter votre commissariate pour plus d'informations.";
			   break;
			  /*default: 
			       alert('also cool');
			  break;
*/			}
			/*if (data.hits.total === 0) {
				visible.value = "Visible";
				TextContainer.value = "La pièce d'identité correspondante au recepisse N°  "+JSON.stringify(data.hits.hits[0]._source.recepice)+"  n'est pas encore disponible à cet instant précis.";
			}
			if (data.hits.total === 1 ) {
				for (var i = 0; i < data.hits.hits.length; i++) {
					donnee.add(data.hits.hits[i]._source);
				}
				visible.value = "Visible";
				TextContainer.value = "La pièce d'identité correspondante au recepisse N° "+JSON.stringify(data.hits.hits[0]._source.recepice)+", est actuellement disponible. Vous pouvez la recuperer à cet emplacement : ICI";
			}
			if (data.hits.hits !== 1 || data.hits.hits !== 0) {
				TextContainer.value = "HUM, c'est embarassant. \n Plusieurs resulats ont été trouvés pour le recepisse "+this.recepisse+" .";
			}
			else {
				donnee.value = "Il n'y rien pour toi";
				visible.value = "Visible";
				debug_log("la valeur de compteur est : "+compteur.value);
				debug_log("Fylo yannick : "+JSON.stringify(data.hits.hits[0]._source));
				TextContainer.value = "Plusieurs resulats ont été trouvés concernant le recepisse N°  "+JSON.stringify(data.hits.hits[0]._source.recepice)+". Impossible de vous donner un résultat précis.";
			}*/
		})
	}).catch(function(error){
		debug_log("Une erreur est survenue : "+error);
	})
});


//appel de la fonction pour la recherche du recepisse
//SearchRecepisse("http://d699fa1f.ngrok.io/app/cni/_search?q=recepice:"+query.value.toUpperCase(), '123456789'); 


//fonction pour acceder aux parametres de l'application
function searchNow(arg){

	debug_log("Debut de la recherche sur le terme "+query.value);
	var ma_root = "http://192.168.0.149:9200/app/cni/_search?q=nom:"+query.value.toUpperCase();
	//var root_nom = "http://192.168.0.149:9200/app/cni/_search?q=nom:"+query.value.toUpperCase();
	//var ma_root= "https://c10a4983c855434d8da6712dea5ae26f.us-central1.gcp.cloud.es.io:9243/app/cni/_search?q=recepice:"+query.value.toUpperCase();
/*	var root_secours = "http://9bcd79a9.ngrok.io/app/cni/_search?q=recepice:"+query.value.toUpperCase(); */
fetch(ma_root).then(function(response) {
			response.json().then(function(data){
			debug_log("Data send : "+JSON.stringify(data.hits.total));
			//donnee = JSON.stringify(data.hits.hits[0]._source.nom);
			//on transmet les informations du serveur a l'application
			compteur.value = data.hits.total
			debug_log(compteur.lenght);
			if (data.hits.total === 0) {
				donnee.value = "Il n'y rien pour toi";
				visible.value = "Visible";
				debug_log("la valeur de compteur est : "+compteur.value);
			}
			else{
				for (var i = 0; i < data.hits.hits.length; i++) {
					donnee.add(data.hits.hits[i]._source);
					visible.value = "Visible";
					debug_log("La valeur de compteur dans le cadre positif est : "+compteur.value);
				}
			}

		})
	}).catch(function(err) {
		debug_log("Des erreurs : "+err);
		error.value = "Une erreur est survenue, l'erreur est : "+err;
	});

}

module.exports = {
	gotoCni:gotoCni,
	goBack: goBack,
	id:id,
	name:name,
	description: description,
	picture:picture,
	route:route,
	panneauLateral:panneauLateral,
	appName: appName,
	testView:testView,
	gotoHome:gotoHome,
	about:about,
	gotoConfiguration:gotoConfiguration,
	donnee:donnee,
	moi: moi,
	searchNow: searchNow,
	requestResponse: requestResponse,
	gotoMap: gotoMap,
	crier: crier,
	query: query,
	autreOption:autreOption,
	about:about,
	shareText:shareText,
	visible:visible,
	compteur:compteur,
	phoneNumber: phoneNumber,
	clear: clear,
	TextContainer: TextContainer
};
