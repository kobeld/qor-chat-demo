App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	LobbyApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"teams/:teamId/lobby": "show"
		}
	});

	var API = {
		show: function (teamId) {
			LobbyApp.Controller.showLobby(teamId);
		}
	};

	App.commands.setHandler("cmd:lobby:show", function (teamId) {
		App.navigate("teams/" + teamId + "/lobby");
		API.show(teamId);
	});

	App.addInitializer(function (options) {
		new LobbyApp.Router({
			controller: API
		});
	});
});