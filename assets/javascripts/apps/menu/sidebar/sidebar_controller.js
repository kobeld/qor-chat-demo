App.module("MenuApp.Sidebar", function (Sidebar, App, Backbone, Marionette, $, _) {

	Sidebar.Controller = {
		list: function () {
			// TODO: Should open conversation later
			var sidebarView = new Sidebar.MenuView();
			App.leftRegion.show(sidebarView);
		}
	};

});