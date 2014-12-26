var App = new Marionette.Application();

App.addRegions({
	headerRegion: "#header-region",
	mainRegion: {
		regionClass: TabRegion,
		selector: ".main-region"
	},
	rightRegion: ".right-region",
	leftRegion: ".left-region"
	// modalRegion: Marionette.Region.Modal.extend({
	// 	el: "#global-modal"
	// })
});

App.navigate = function (route, options) {
	options || (options = {});
	Backbone.history.navigate(route, options);
};

App.getCurrentRoute = function () {
	return Backbone.history.fragment;
};

App.getBearerHeader = function () {
	return {
		'Authorization': 'Bearer ' + simpleStorage.get("token")
	}
};

App.logout = function () {
	simpleStorage.deleteKey("token");
	window.location.replace("/login");
}

// Command for redirecting to the login page
App.commands.setHandler("cmd:response:handle", function (response) {
	if (response.status === 401) {
		App.logout();
	}
});

App.on("start", function (options) {
	// The options was passed from App.start(options)
	this.options = options;

	var self = this,
		myAccountEntity = App.request("entity:user:myaccount");

	// Get current user account first
	$.when(myAccountEntity).done(function (myAccount) {

		// Set the cached teamId.
		// TODO: Improvet the way of getting the teamId
		App.execute("entity:set:teamid", myAccount.get("teamIds")[0]);

		// Fetch users first to get the online users
		var usersEntity = App.request("entity:users");
		$.when(usersEntity).done(function () {

			// Then start the routers
			if (Backbone.history) {
				Backbone.history.start();

				$("#page-container").show();
				// Show the Header
				App.execute("cmd:header:show");

				// Ensure the websocket be connected
				App.vent.on("vent:websocket:open", function () {
					// Request roster
					App.execute("cmd:websocket:send", {
						topic: "roster",
						dType: "all",
					});

					// Show the Lobby by default
					if (self.getCurrentRoute() === "") {
						App.execute("cmd:menu:list");
					}
				});

				// Execute command to build the websocket connection
				App.execute("cmd:websocket:connect");
			};

		}).fail(function (response) {
			App.execute("cmd:response:handle", response);
		});

	}).fail(function (response) {
		App.execute("cmd:response:handle", response);
	})
});