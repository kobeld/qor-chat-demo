App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	LobbyApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"teams/:teamId/lobby": "showFromRouter"
		}
	});

	var API = {
		showFromRouter: function (teamId) {
			App.execute("entity:set:teamid", teamId);
			// Show the Left menu first if it is from the router
			App.execute("cmd:menu:list");
		},

		showByClicked: function () {
			// Hide the Chat view
			App.execute("cmd:chats:hide");
			LobbyApp.Controller.showLobby();
		},

		hide: function () {
			LobbyApp.Controller.hideLobby();
		}
	};

	App.commands.setHandler("cmd:lobby:show", function () {
		var teamId = App.request("entity:cache:teamid");
		App.navigate("teams/" + teamId + "/lobby");
		API.showByClicked();
	});

	App.commands.setHandler("cmd:lobby:hide", function () {
		API.hide();
	});

	App.addInitializer(function (options) {
		new LobbyApp.Router({
			controller: API
		});
	});
});