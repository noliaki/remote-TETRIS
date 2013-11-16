(function($){

//url解析
var ID = location.hash;

//websocket
var domain = "weblabox.com";
var port = 8989;
var webSocket = io.connect('http://' + domain + ':' + port);



$(function(){
	$("#top").click(function(){
		webSocket.emit('onTop', ID);
		return false;
	});
	
	$("#right").click(function(){
		webSocket.emit('onRight', ID);
		return false;
	});
	
	$("#bottom").click(function(){
		webSocket.emit('onBottom', ID);
		return false;
	});
	
	$("#left").click(function(){
		webSocket.emit('onLeft', ID);
		return false;
	});
	
	$("#A").click(function(){
		webSocket.emit('onButton_a', ID);
		return false;
	});
	
	$("#B").click(function(){
		webSocket.emit('onButton_b', ID);
		return false;
	});
	
	webSocket.emit('onController', ID);
	
});


})(jQuery);