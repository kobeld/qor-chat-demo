App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	MenuApp.MenuItemView = Marionette.ItemView.extend({
		tagName: "li",
		template: "#menu-item-view",

		modelEvents: {
			"change:chosen": "changeChosen",
			"request": "render" // TODO: Don't know why need this.
		},

		events: {
			"click a": "choose"
		},

		ui: {
			menuLink: "a"
		},

		changeChosen: function () {
			this.ui.menuLink.toggleClass("active");
		},

		choose: function (e) {
			e.preventDefault();
			this.model.choose();
		}

	});

	MenuApp.MenuView = Marionette.CompositeView.extend({
		template: "#menu-sidebar-view",
		childView: MenuApp.MenuItemView,
		childViewContainer: "#sidebar-menu"
	});

});