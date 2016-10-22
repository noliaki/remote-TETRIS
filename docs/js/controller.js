(function($){

//url解析
var ID = location.hash;

//websocket
// var domain = "remote.renoat.net";
// var port = 8989;
// var webSocket = io.connect('http://' + domain + ':' + port);

var milkcocoa = new MilkCocoa('iceiul7ul3d.mlkcca.com');
var ds = milkcocoa.dataStore('messages');


$(function(){
	$("#top").click(function(){
		ds.send('onTop', {ID: ID});
		return false;
	});

	$("#right").click(function(){
		ds.send('onRight', {ID: ID});
		return false;
	});

	$("#bottom").click(function(){
		ds.send('onBottom', {ID: ID});
		return false;
	});

	$("#left").click(function(){
		ds.send('onLeft', {ID: ID});
		return false;
	});

	$("#A").click(function(){
		ds.send('onButton_a', {ID: ID});
		return false;
	});

	$("#B").click(function(){
		ds.send('onButton_b', {ID: ID});
		return false;
	});

	ds.send('onController', {ID: ID});

});


})(jQuery);
