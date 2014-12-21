App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	MenuApp.MenuItemView = Marionette.ItemView.extend({
		tagName: "li",
		template: "#menu-item-view",

		modelEvents: {
			"change:unreadCount": "render", // TODO: Consider to use the backbone.stickit plugin
			"change:chosen": "changeChosen"
		},

		events: {
			"click a": "choose"
		},

		triggers: {
			"click i.js-close": "close:convMenu"
		},

		ui: {
			menuLink: "a",
			menuIcon: "i.sidebar-nav-icon",
			closeIcon: "i.sidebar-nav-indicator",
			menuTitle: ".title"
		},

		changeChosen: function () {
			this.ui.menuTitle.html(this.model.get("title"));
			this.ui.menuLink.toggleClass("active");
		},

		choose: function (e) {
			e.preventDefault();
			this.model.choose();
		},

		onRender: function () {
			var iconClass = "gi-home",
				conv = this.model.get("conv");

			if (conv) {
				iconClass = conv.get("isPrivate") ? "gi-user" : "gi-group";
			} else {
				this.ui.closeIcon.remove();
			}

			this.ui.menuIcon.addClass(iconClass);
		}

	});

	MenuApp.MenuView = Marionette.CompositeView.extend({
		template: "#menu-sidebar-view",
		childView: MenuApp.MenuItemView,
		childViewContainer: "#sidebar-menu"
	});

});