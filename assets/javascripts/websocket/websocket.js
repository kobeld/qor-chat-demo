App.module("Websocket", function (Websocket, App, Backbone, Marionette, $, _) {

	var _wsConn = null;

	var API = {
		connect: function () {
			if (_wsConn != null) {
				return;
			};

			var teamId = App.request("entity:cache:teamid");
			token = simpleStorage.get("token");
			_wsConn = new WebSocket(App.options.WsHost + "/ws/" + teamId + "/" + token);
			_wsConn.onopen = function () {
				App.vent.trigger("vent:websocket:open");
			};

			_wsConn.onmessage = function (msgEvent) {
				var msData = JSON.parse(msgEvent.data);
				App.vent.trigger("vent:websocket:" + msData.topic, msData);
			};

			_wsConn.onclose = function (data) {
				API.reconnect();
			};

			_wsConn.onerror = function (data) {
				console.log(data);
			};
		},

		reconnect: function () {
			var reconnectTime = Math.floor(Math.random() * 5001) + 1000;
			setTimeout(function () {
				_wsConn = null;
				API.connect();
			}, reconnectTime);
		},

		send: function (data) {
			if (_wsConn == null) {
				this.connect();
			};
			_wsConn.send(data);
		}
	};

	App.commands.setHandler("cmd:websocket:connect", function () {
		if (window["WebSocket"]) {
			API.connect();
		} else {
			alert("Sorry, your browser does not support websocket!")
		}
	});

	App.commands.setHandler("cmd:websocket:send", function (data) {
		var jsonStr = JSON.stringify(data);
		API.send(jsonStr);
	});


});