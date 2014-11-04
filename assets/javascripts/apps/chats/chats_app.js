App.module("ChatsApp", function (ChatsApp, App, Backbone, Marionette, $, _) {

	var API = {
		loadPrivateChat: function() {
			ChatsApp.Private.Controller.load();
		}
	};

	App.vent.on("vent:websocket:open", function () {
		API.loadPrivateChat();
	});

});
