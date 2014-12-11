App.module("MenuApp.Sidebar", function (Sidebar, App, Backbone, Marionette, $, _) {

	Sidebar.Controller = {
		list: function () {

			// TODO: Should open conversation later

			var conversations = App.request("entity:conversations");

			var sidebarView = new Sidebar.MenuView({
				collection: conversations
			});
			App.leftRegion.show(sidebarView);
		}
	};

});