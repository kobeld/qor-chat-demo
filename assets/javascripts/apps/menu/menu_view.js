App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	MenuApp.MenuItemView = Marionette.ItemView.extend({
		tagName: "li",
		template: "#menu-item-view"
	});

	MenuApp.MenuView = Marionette.CompositeView.extend({
		template: "#menu-sidebar-view",
		childView: MenuApp.MenuItemView,
		childViewContainer: "#sidebar-menu"
	});

});