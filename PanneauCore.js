var Observable = require('FuseJS/Observable');


//permet de retourner les informations (données) sur le panneau lateral
var pan = this.Parameter;

debug_log("reception de : "+JSON.stringify(pan));

var pan_id = pan.map(function(x) {return x.id;});
var pan_name = pan.map(function(x) {return x.name;});
var pan_icon =pan.map(function(x) {return x.icon;});
var pan_route = pan.map(function(x) {return x.route;});

module.exports = {
	pan_name: pan_name
};
