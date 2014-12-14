App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	var API = {
		list: function (teamId, convId) {
			MenuApp.Controller.list(teamId, convId);
		}
	};

	App.commands.setHandler("cmd:menu:list", function (teamId, convId) {
		API.list(teamId, convId);
	})
});