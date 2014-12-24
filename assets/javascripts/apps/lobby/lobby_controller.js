App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	var _lobbyView = "";

	LobbyApp.Controller = {

		showLobby: function () {

			if (_lobbyView) {
				_lobbyView.$el.show();
			} else {
				_lobbyView = new LobbyApp.LobbyFullView();
				App.mainRegion.show(_lobbyView, {
					preventDestroy: true
				});
			}

			this.showRoster();
		},

		hideLobby: function () {
			if (_lobbyView) {
				_lobbyView.$el.hide();
			};
		},

		showRoster: function () {

			var rosterView = new LobbyApp.RosterSideberView({
				collection:  App.request("entity:cache:users")
			});

			// Select users to chat
			rosterView.on("start:chat", function (args) {

				var choseUsers = args.collection.getChosen();
				if (choseUsers.length > 0) {
					App.execute("cmd:chats:users", choseUsers);
				};
			});

			App.rightRegion.show(rosterView);
		}

	}
});