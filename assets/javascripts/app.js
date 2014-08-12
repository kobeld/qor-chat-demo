$(function(){

	if (window["WebSocket"]) {
		conn = new WebSocket("ws://localhost:3000/ws/1234/5678");
	};

});