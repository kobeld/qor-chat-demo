App.module("Websocket", function (Websocket, App, Backbone, Marionette, $, _) {

	var _wsConn = null;

	var API = {
		connect: function () {
			if (_wsConn != null) {
				return;
			};

			// TODO: This will cause bug, should improve it later.
			var teamId = App.request("entities:cache:teamid");
				token = simpleStorage.get("token");

			_wsConn = new WebSocket("ws://localhost:3000/ws/" + teamId + "/" + token);
			_wsConn.onopen = function () {
				App.vent.trigger("vent:websocket:open");
			};

			_wsConn.onmessage = function (msgEvent) {
				var msData = JSON.parse(msgEvent.data)
				App.vent.trigger("vent:websocket:" + msData.topic, msData);
			};

			_wsConn.onclose = function (data) {
				// TODO: Reconnect
				_wsConn = null;
			};

			_wsConn.onerror = function (data) {
				cosole.log(data);
				// TODO: Reconnect
				_wsConn = null;
			};
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