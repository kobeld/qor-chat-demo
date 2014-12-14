App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	LobbyApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"teams/:teamId/lobby": "show"
		}
	});

	var API = {
		show: function (teamId, byClicked) {
			if (byClicked) {
				LobbyApp.Controller.showLobby(teamId);
			} else {
				// Show the Left menu first if it is from the router
				App.execute("cmd:menu:list", teamId);
			}
		}
	};

	App.commands.setHandler("cmd:lobby:show", function (teamId) {
		App.navigate("teams/" + teamId + "/lobby");
		API.show(teamId, true);
	});

	App.addInitializer(function (options) {
		new LobbyApp.Router({
			controller: API
		});
	});
});