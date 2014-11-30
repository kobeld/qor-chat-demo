var App = new Marionette.Application();

App.addRegions({
	headerRegion: "#header-region",
	mainRegion: ".main-region",
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

App.on("start", function () {
	var self = this,
		myAccountEntity = App.request("entity:user:myaccount");

	// Get current user account first
	$.when(myAccountEntity).done(function (myAccount) {

		// Ensure the websocket be connected
		App.vent.on("vent:websocket:open", function () {
			// Then start the routers
			if (Backbone.history) {
				Backbone.history.start();

				$("#page-container").show();
				// Show the Header
				App.execute("cmd:header:show");

				// Show the Left menu
				App.execute("cmd:menu:sidebar:list")

				// Show the Lobby by default
				if (self.getCurrentRoute() === "") {
					App.execute("cmd:lobby:show", myAccount.get("teamIds")[0]);
				}
			}
		});

		// Execute command to build the websocket connection
		App.execute("cmd:websocket:connect", myAccount);

	}).fail(function (response) {
		App.execute("cmd:response:handle", response);
	})
});