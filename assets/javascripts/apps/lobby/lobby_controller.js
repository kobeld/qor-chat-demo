App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	var _lobbyView = "";
	var selectedUsers = [];

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
			var self = this,
				userEntities = App.request("entities:user");

			$.when(userEntities).done(function (users) {

				var rosterView = new LobbyApp.RosterSideberView({
					collection: users
				});

				rosterView.on("start:chat", function (args) {
					var choseUsers = args.collection.getChosen();
					if (choseUsers.length > 0) {
						App.execute("cmd:chats:users", choseUsers);
					};
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