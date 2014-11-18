var App = new Marionette.Application();

App.addRegions({
	headerRegion: "#header-region",
	// leftRegion: ".left-region",
	mainRegion: ".main-region",
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
			myAccountEntity = App.request("Entity:User:MyAccount");

		// Get current user account
		$.when(myAccountEntity).done(function (myAccount) {
			$("#page-container").show();

			// Show the Header
			App.execute("cmd:header:show");

			// Show the Lobby by default
			if (self.getCurrentRoute() === "") {
				// console.log(App.MyAccount)
				App.execute("cmd:lobby:show");
			}

		}).fail(function (response) {
			App.execute("cmd:response:handle", response);
		})
	}
});