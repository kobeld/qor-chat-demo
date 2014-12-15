App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	LobbyApp.Controller = {

		showLobby: function (teamId) {
			var lobbyFullView = new LobbyApp.LobbyFullView();
			App.mainRegion.show(lobbyFullView);

			this.showRoster(teamId);
		},

		showRoster: function (teamId) {
			var self = this,
				userEntities = App.request("entities:user", teamId);

			$.when(userEntities).done(function (users) {

				var onlineUsers = new App.Entities.UserCollection(),
					offlineUsers = users;

				var rosterLayout = new LobbyApp.RosterLayout(),
					onlineUsersView = new LobbyApp.OnlineUsersView({
						collection: onlineUsers
					}),
					offlineUsersView = new LobbyApp.OfflineUsersView({
						collection: offlineUsers
					});

				// Listening to start the 1-on-1 chat
				LobbyApp.listenTo(onlineUsers, "collection:chose:one", function (user) {
					App.execute("cmd:chats:private:start", user);
				});

				LobbyApp.listenTo(offlineUsers, "collection:chose:one", function (user) {
					App.execute("cmd:chats:private:start", user);
				});

				// Subscripe to the roster events of websocket
				App.vent.on("vent:websocket:roster", function (data) {
					var object = data.object;

					if (data.dType === "all") {
						onlineUsers.reset(object);
						offlineUsers.remove(object);

					} else if (data.dType === "online") {
						offlineUsers.remove(object);
						onlineUsers.add(object);

					} else if (data.dType === "offline") {
						onlineUsers.remove(object);
						offlineUsers.add(object);
					};
				});

				// Request roster via websocket
				App.execute("cmd:websocket:send", {
					topic: "roster",
					dType: "all",
				});

				rosterLayout.on("show", function () {
					this.onlineUsersRegion.show(onlineUsersView);
					this.offlineUsersRegion.show(offlineUsersView);
				})

				App.rightRegion.show(rosterLayout);

			}).fail(function (response) {
				App.execute("cmd:response:handle", response);
			});
		}

	}
});