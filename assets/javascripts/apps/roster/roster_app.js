App.module("RosterApp", function (RosterApp, App, Backbone, Marionette, $, _) {

	RosterApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			// "lobby": "show"
		}
	});

	var API = {
		// RosterApp.Sidebar.Controller.
	};

	App.commands.setHandler("cmd:lobby:show", function () {
		// API.show();
	});

	App.addInitializer(function (options) {
		new RosterApp.Router({
			controller: API
		});
	});
});