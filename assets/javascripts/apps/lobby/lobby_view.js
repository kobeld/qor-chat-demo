App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	LobbyApp.LobbyFullView = Marionette.ItemView.extend({
		template: "#lobby-full"
	});

});