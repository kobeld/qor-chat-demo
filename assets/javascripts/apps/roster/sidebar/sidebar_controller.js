App.module("RosterApp.Sidebar", function (Sidebar, App, Backbone, Marionette, $, _) {

	Sidebar.Controller = {
		showRoster: function (teamId) {
			var self = this,
				userEntities = App.request("entities:user", teamId);

			$.when(userEntities).done(function (users) {

				var onlineUsers = new App.Entities.UserCollection(),
					offlineUsers = users;

				var rosterLayout = new Sidebar.RosterLayout(),
					onlineUsersView = new Sidebar.OnlineUsersView({
						collection: onlineUsers
					}),
					offlineUsersView = new Sidebar.OfflineUsersView({
						collection: offlineUsers
					});

				// Listening to start the 1-on-1 chat
				Sidebar.listenTo(onlineUsers, "collection:chose:one", function (chosen) {
					console.log(chosen.get("email"));
					App.execute("cmd:chats:private:show");
				});

				Sidebar.listenTo(offlineUsers, "collection:chose:one", function (chosen) {
					console.log(chosen.get("email"));
					App.execute("cmd:chats:private:show");
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
	};

});