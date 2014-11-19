var App = new Marionette.Application();

App.addRegions({
	headerRegion: "#header-region",
	mainRegion: ".main-region",
	rightRegion: ".right-region",
	// leftRegion: ".left-region",
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
	if (Backbone.history) {
		Backbone.history.start();

		var self = this,
			myAccountEntity = App.request("entity:user:myaccount");

		// Get current user account
		$.when(myAccountEntity).done(function (myAccount) {
			$("#page-container").show();

			// Show the Header
			App.execute("cmd:header:show");

			// Show the Lobby by default
			if (self.getCurrentRoute() === "") {
				App.execute("cmd:lobby:show", myAccount.get("teamIds")[0]);
			}

		}).fail(function (response) {
			App.execute("cmd:response:handle", response);
		})
	}
});