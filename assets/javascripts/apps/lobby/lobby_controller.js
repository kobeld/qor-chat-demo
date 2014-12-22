App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	var _lobbyView = "";
	var selectedUsers = [];

	LobbyApp.Controller = {

		showLobby: function (teamId) {

			if (_lobbyView) {
				_lobbyView.$el.show();
			} else {
				_lobbyView = new LobbyApp.LobbyFullView();
				App.mainRegion.show(_lobbyView, {
					preventDestroy: true
				});
			}

			this.showRoster(teamId);
		},

		hideLobby: function () {
			if (_lobbyView) {
				_lobbyView.$el.hide();
			};
		},

		showRoster: function (teamId) {
			var self = this,
				userEntities = App.request("entities:user", teamId);

			$.when(userEntities).done(function (users) {

				var rosterView = new LobbyApp.RosterSideberView({
					collection: users
				});

				rosterView.on("start:chat", function (args) {
					var choseUsers = args.collection.getChosen();
					switch (choseUsers.length) {
					case 1:
						App.execute("cmd:chats:private:user", choseUsers[0]);
						break;
					case 2:
						// TODO
						break;
					default:
					}
				});

				// Subscripe to the roster events of websocket
				App.vent.on("vent:websocket:roster", function (data) {
					var object = data.object;

					if (data.dType === "all") {
						_.each(data.object, function (onlineUser) {
							users.setOnlineStatus(onlineUser.id, true);
						});
					} else {
						users.setOnlineStatus(object.id, (data.dType === "online"));
					}
				});

				// Request roster via websocket
				App.execute("cmd:websocket:send", {
					topic: "roster",
					dType: "all",
				});

				App.rightRegion.show(rosterView);

			}).fail(function (response) {
				App.execute("cmd:response:handle", response);
			});
		}

	}
});