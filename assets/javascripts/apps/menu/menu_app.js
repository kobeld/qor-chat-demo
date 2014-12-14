App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	var API = {
		list: function (teamId, convId) {
			MenuApp.Controller.list(teamId, convId);
		},

		activeOrAdd: function (conv) {
			MenuApp.Controller.activeOrAdd(conv);
		}
	};

	App.commands.setHandler("cmd:menu:list", function (teamId, convId) {
		API.list(teamId, convId);
	});

	App.commands.setHandler("cmd:menu:activeOrAdd", function (conv) {
		API.activeOrAdd(conv);
	})
});