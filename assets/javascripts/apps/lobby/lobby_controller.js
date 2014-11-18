App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	LobbyApp.Controller = {

		showLobby: function() {
			var lobbyFullView = new LobbyApp.LobbyFullView();
			App.mainRegion.show(lobbyFullView);
		}

	}
});