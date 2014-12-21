App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	var API = {
		list: function (teamId, convId) {
			MenuApp.Controller.list(teamId, convId);
		},

		activeOrAdd: function (conv) {
			MenuApp.Controller.activeOrAdd(conv);
		},

		updateUnreadCount: function (data) {
			MenuApp.Controller.updateUnreadCount(data);
		}
	};

	App.commands.setHandler("cmd:menu:list", function (teamId, convId) {
		API.list(teamId, convId);
	});

	App.commands.setHandler("cmd:menu:activeOrAdd", function (conv) {
		API.activeOrAdd(conv);
	});

	App.vent.on("vent:websocket:messages", function (data) {
		if (data.dType === "new") {
			API.updateUnreadCount(data);
		}
	});

});