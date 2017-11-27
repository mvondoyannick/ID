var Observable = require('FuseJS/Observable');
var Timer = require('FuseJS/Timer');
var Base64 = require('FuseJS/Base64');
var Share = require("FuseJS/Share")
var Storage = require("FuseJS/Storage");

debug_log("init CoreQuery Interface");

/* les variables utilisées dans le systeme */
var username = Observable();
var pwd = Observable();
var error = Observable();
var visible = Observable("Collapsed"); //pour la zone de reponse
var errorVisible = Observable("Collapsed"); //pour la zone permettant d'afficher les erreurs
var compteur = Observable(); //permet de recuperer les occurences trouvées
var TextContainer = Observable("");
var phoneNumber = Observable();
var moi = Observable("");
var donnee = Observable("salut");
var query = Observable();
var phone = Observable("");
var errorResult = Observable();

/*les informations sur l'application et le versionning*/
var appName = "ID"; //le nom de l'application
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


//la fonction permettant de reinitialiser les parametres
clear = (function(){
	debug_log("Clear ...");
	phoneNumber.value = "";
	phoneNumber.clear();
	query.value = "";
	query.clear();
	TextContainer.value = "";
	TextContainer.clear();
	errorResult.value = "";
	errorResult.clear();
	compteur.value = "";
	compteur.clear();
	visible.value = "Collapsed";

});

//fonction pour capturer le numéro telephone
/*CapturePhone = (function(name, phone, date, init_date){
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
});*/


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
}

function logIn(){
	router.push("LoginView");
}

function SignUp(){
	router.push("SignUpView");
}

//la vue qui est en charge de la response s'une requete
/*function requestResponse() {
	router.goto("ResponseView");
}*/

//redirection vers testView
/*function testView(){
	debug_log('reste de la route');
	router.push("TestView");
}*/

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
/*function recherche(r){
	fetch("http://fe6c4f62.ngrok.io/app/cni/_search?q=recepice:"+r)
	.then(function(response){
		if (response.status !== 200) {
			//retourner un message d'erreur si la connexion internet venait a partir
			errorResult.value = "Ouup's, une erreur est survenue. "+ response.status;
			return;
		}
		response.json().then(function(d){
			debug_log(JSON.stringify(d));
			if (data.hits.total == 1) {
				debug_log("nous avons trouvé "+d.hits.total+" occurence");
			    TextContainer.value = "disponible";
			    debug_log("result : Il ya un résultat : "+compteur.value+" et sa valeur est "+JSON.stringify(d.hits.hits[0]._source.nom));
			    debug_log("tous les resultats :  "+JSON.stringify(d.hits.hits[0]));
			    return;
			}
			if (data.hits.total == 0) {
				debug_log("nous avons trouvé "+d.hits.total+" occurence");
			    TextContainer.value = "disponible";
			    debug_log("result : Il ya un résultat : "+compteur.value+" et sa valeur est "+JSON.stringify(d.hits.hits[0]._source.nom));
			    debug_log("tous les resultats :  "+JSON.stringify(d.hits.hits[0]));
			    return;
			}
		})
	})
}*/

/*function permettant de rendre la zone d'erreur visible ou pas*/
/*function SetErrorVisible(status){
	debug_log("Le status est maintenant : "+status);
	if (status === "Visible") {
		//on cree un timer d'une durée de 4 secondes
		Timer.create(function() {
		  console.log("This will run once, after 4 seconds");
		}, 4000, false);
		status = "Collapsed";
	}
	else {

	}
}*/

//share content
function share(){

}

//login a user tot application backend
function Login(username, pwd, date){
	localStorage.setItem('username', username);
	localStorage.setItem('pwd', pwd);

	debug_log("Les informations stockées sont les suivantes : "+localStorage.getItem("username")+" et son mot de passe est "+Base64.encodeUtf8(localStorage.getItem("pwd")));
}

Login("mvondoyannick", "123456789", "11.11.17");

function searchPassport(r){};

function searchCarteSeajour(r){};

function searchVisas(r){};

function searchAutorisationSejour(r){};

function searchActeNaissance(r){};

function searchPermiConduire(r){};

function SearchRecepisse(r){
	//on vide le TextContainer
	//SetErrorVisible(errorVisible.value);
	clear();
	debug_log("le recepisse : "+r);
		fetch("http://65d6ec6a.ngrok.io/app/cni/_search?q=recepice:"+r).then(function(response){
			if (response.status !== 200) {
				//retourner un message d'erreur si la connexion internet venait a partir
				errorVisible.value = "Visible";
				errorResult.value = "Ouup's, une erreur est survenue. "+ response.status;
				return;
			}
			response.json().then(function(data){
				compteur.value = data.hits.total
				debug_log(JSON.stringify(data));
				if (data.hits.total == 1) {
					visible.value = "Visible";
					debug_log("nous avons trouvé "+data.hits.total+" occurence");
				    TextContainer.value = "Votre piece d'identité \n est disponible";
				    debug_log("result : Il ya un résultat : "+compteur.value+" et sa valeur est "+JSON.stringify(data.hits.hits[0]._source.nom));
				    debug_log("tous les resultats :  "+JSON.stringify(data.hits.hits[0]));
				    return;
				}else {
					visible.value = "Visible";
					debug_log("Bonjour");
					TextContainer.value = "Il n'y a rien pour toi "+r+" \n est indisponible";
				}

			})
		}).catch(function(error){
			debug_log("Une erreur est survenue : "+error);
			errorVisible.value = "Visible";
			errorResult.value = "Une erreur est survenue : "+error;
			return;
		})
};


//appel de la fonction pour la recherche du recepisse
//SearchRecepisse("http://fe6c4f62.ngrok.io/app/cni/_search?q=recepice:"+query.value, query.value); 


//fonction pour acceder aux parametres de l'application
function searchNow(){
	debug_log("Demarrage de la fonction de recherche ..."+query.value);
	if (query.value == "" || typeof (query.value) == "undefined") {
		debug_log("Vide");
		errorVisible.value = "Visible";
		errorResult.value = "Entrez un N° de recepissé s'il vous plait. :-(";
	}
	else {
		SearchRecepisse(query.value); 
	}	
}

//fonction de chargement de la vue de login
function LoginView(){

}

module.exports = {
	goBack: goBack,
	id:id,
	name:name,
	description: description,
	picture:picture,
	route:route,
	panneauLateral:panneauLateral,
	appName: appName,
	gotoHome:gotoHome,
	about:about,
	gotoConfiguration:gotoConfiguration,
	donnee:donnee,
	moi: moi,
	searchNow: searchNow,
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
	TextContainer: TextContainer,
	errorResult: errorResult,
	errorVisible: errorVisible,
	LoginView: LoginView,
	logIn: logIn,
	SignUp: SignUp
};