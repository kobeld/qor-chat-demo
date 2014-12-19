App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	LobbyApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"teams/:teamId/lobby": "show"
		}
	});

	var API = {
		show: function (teamId, byClicked) {

			if (byClicked) {
				// Hide the Chat view
				App.execute("cmd:chats:hide");
				LobbyApp.Controller.showLobby(teamId);
			} else {
				// Show the Left menu first if it is from the router
				App.execute("cmd:menu:list", teamId);
			}
		},

		hide: function () {
			LobbyApp.Controller.hideLobby();
		}
	};

	App.commands.setHandler("cmd:lobby:show", function (teamId) {
		App.navigate("teams/" + teamId + "/lobby");
		API.show(teamId, true);
	});

	App.commands.setHandler("cmd:lobby:hide", function (teamId) {
		API.hide();
	});

	App.addInitializer(function (options) {
		new LobbyApp.Router({
			controller: API
		});
	});
});