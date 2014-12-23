App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	var API = {
		list: function (convId) {
			MenuApp.Controller.list(convId);
		},

		activeOrAdd: function (conv) {
			MenuApp.Controller.activeOrAdd(conv);
		},

		updateUnreadCount: function (data) {
			MenuApp.Controller.updateUnreadCount(data);
		}
	};

	App.commands.setHandler("cmd:menu:list", function (convId) {
		API.list(convId);
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