App.module("MenuApp.Sidebar", function (Sidebar, App, Backbone, Marionette, $, _) {

	Sidebar.ActiveConversationItem = Marionette.ItemView.extend({
		tagName: "li",
		template: "active-conversation-item"
	});

	Sidebar.MenuView = Marionette.CompositeView.extend({
		template: "#menu-sidebar-view",
		childView: Sidebar.ActiveConversationItem,
		childViewContainer: "#active-conversations"
	});

});