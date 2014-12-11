App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	MenuApp.ActiveConversationItem = Marionette.ItemView.extend({
		tagName: "li",
		template: "active-conversation-item"
	});

	MenuApp.MenuView = Marionette.CompositeView.extend({
		template: "#menu-sidebar-view",
		childView: MenuApp.ActiveConversationItem,
		childViewContainer: "#active-conversations"
	});

});