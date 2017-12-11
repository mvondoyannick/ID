var Observable = require('FuseJS/Observable');
var Timer = require('FuseJS/Timer');
var Base64 = require('FuseJS/Base64');
var Share = require("FuseJS/Share")
var Storage = require("FuseJS/Storage");
var Device = require('Device');
var cameraRoll = require("FuseJS/CameraRoll");
var camera = require("FuseJS/Camera");
var Vibration = require("FuseJS/Vibration");

debug_log("Current unix date : "+Date.now());
//console.log('Current device language: ' + Device.locale);

/* les variables utilisées dans le systeme */
checked = Observable('\uf05d');
failed = Observable('\uf06a');
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
var imgPath = Observable();

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

//gestion de la capture du code barre
function ScanRecepisse(){
	console.log("Picture starded");
	camera.takePicture(640, 480)
		.then(function(image) {
			return cameraRoll.publishImage(image);
			console.log(JSON.stringify(image));
		})
		.then(function() {
			// Will be called if the image was successfully added to the camera roll.
			console.log(JSON.stringify(image));
			imgPath.value = image.path;
			status.value = "Visible";
		}, function(error) {
			console.log("Une erreur est survenue durant la capture : "+error);
	});
}


//fonction user data
var userData = {
	name : "0",
	secondName : "",
	phone : "",
	email : "",
	phoneBrand : "",
	image : "",

	describeUser : function() {
		var description = {
			"name" : this.name,
			"prenom" : this.prenom,
			"phone" : this.phone,
			"email" : this.email,
			"phoneBrand" : this.phoneBrand,
			"image" : this.image
		}

		return description;
	}
}


//creation d'un nouvel objet user
var user = Object.create(userData);
user.name = "MVONDO";
user.prenom = "Yannick";
user.phone = "691451189";
user.email = "m@m.com";
user.phoneBrand = Device.system;
user.image = "";

//fonction pour capturer le numéro telephone
var phoneData = {

}
function ScanCode(){

}
CapturePhone = (function(name, phone, date, init_date){
	debug_log("Capture du numéro de télephone ...");
	this.name = name;
	this.numero = phone;
	this.date = new Date();
	this.init_date = new Date();
	debug_log(name+"--"+phone+"--"+date+"--"+init_date)
});

/*CapturePhone("mvondo", 691451189, "11/11/17", "11/11/17"); */


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


//share content
function share(){

}

//redirection vers la notification
function MeNotifierView(){
	router.push('MeNotifierView');
}

//renvoyer vers la vue permettant de scanner un recepisse
function ScanRecepisseView(){
	router.push('ScanRecepisseView');
}
//obtenir toutes les informations sur le terminal
function getDeviceInformation(){
	if (Device.UUID == '') {
      Device.getUUID().then(function(uuid) {
          console.log('UUID: ' + uuid);
          // output example:
          // UUID: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
      }).catch(function(error) {
          console.log('UUID error: ' + error);
          // output example:
          // UUID error: Permissions could not be requested or granted.
      });
  }
  else {
  	console.log('Current device language: ' + Device.locale); // format in BCP-47 for all mobile platforms
    // output example: en-US

    console.log('UUID:'                + Device.UUID);
    // output example:
    // UUID: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

    /*console.log('Vendor name: '        + Device.vendor);
    console.log('Model name: '         + Device.model);
    console.log('System: '             + Device.system);
    console.log('System version: '     + Device.systemVersion);
    console.log('System SDK ver: '     + Device.SDKVersion);
    console.log('Logical processors: ' + Device.cores);
    console.log('is retina?: '         + Device.isRetina);*/
  }
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
		fetch("http://10b588f6.ngrok.io/app/cni/_search?q=recepice:"+r).then(function(response){
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
					Vibration.vibrate(0.8);
					/*debug_log("nous avons trouvé "+data.hits.total+" occurence");*/
				    TextContainer.value = "Votre piece d'identité \n est disponible";
				    /*debug_log("result : Il ya un résultat : "+compteur.value+" et sa valeur est "+JSON.stringify(data.hits.hits[0]._source.nom));
				    debug_log("tous les resultats :  "+JSON.stringify(data.hits.hits[0]));*/
				    return;
				}else {
					visible.value = "Visible";
					Vibration.vibrate(0.8);
					/*debug_log("Bonjour");*/
					TextContainer.value = "Aucune information ne correspond à votre recherche \n"+r;
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

getDeviceInformation();

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
	SignUp: SignUp,
	checked: checked,
	failed: failed,
	ScanRecepisse:ScanRecepisse,
	MeNotifierView:MeNotifierView,
	ScanRecepisseView:ScanRecepisseView
};