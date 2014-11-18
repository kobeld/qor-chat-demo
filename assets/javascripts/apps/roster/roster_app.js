App.module("RosterApp", function (RosterApp, App, Backbone, Marionette, $, _) {

	var API = {
		showSidebarRoster: function(teamId) {
			RosterApp.Sidebar.Controller.showRoster(teamId);
		}
	};

	App.commands.setHandler("cmd:roster:sidebar", function (teamId) {
		API.showSidebarRoster(teamId);
	});

});