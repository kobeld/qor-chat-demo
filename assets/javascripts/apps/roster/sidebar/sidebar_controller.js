App.module("RosterApp.Sidebar", function (Sidebar, App, Backbone, Marionette, $, _) {

	Sidebar.Controller = {
		showRoster: function (teamId) {
			var self = this,
				userEntities = App.request("entities:user", teamId);

			$.when(userEntities).done(function (users) {
				console.log(users);

				var onlineUsers = new App.Entities.UserCollection(),
					offlineUsers = new App.Entities.UserCollection();

				var rosterLayout = new Sidebar.RosterLayout(),
					onlineUsersView = new Sidebar.OnlineUsersView({
						collection: onlineUsers
					}),
					offlineUsersView = new Sidebar.OfflineUsersView({
						collection: offlineUsers
					});

				App.vent.on("vent:websocket:roster", function (data) {
					var object = data.object;
					if (data.dType === "all") {
						onlineUsers.reset(object);

					} else if (data.dType === "online") {
						onlineUsers.add(object);
						offlineUsers.remove(object);

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