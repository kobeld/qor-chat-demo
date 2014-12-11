App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	MenuApp.Controller = {
		list: function () {

			// TODO: Should open conversation later

			var conversations = App.request("entity:conversations");

			var sidebarView = new MenuApp.MenuView({
				collection: conversations
			});
			App.leftRegion.show(sidebarView);
		}
	};

});