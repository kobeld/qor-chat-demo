App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	LobbyApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"lobby": "show"
		}
	});

	var API = {
		show: function () {
			LobbyApp.Controller.showLobby();
		}
	};

	App.commands.setHandler("cmd:lobby:show", function () {
		App.navigate("/lobby");
		API.show();
	});

	App.addInitializer(function (options) {
		new LobbyApp.Router({
			controller: API
		});
	});
});