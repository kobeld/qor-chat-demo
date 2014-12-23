App.module("ChatsApp.Group", function (Group, App, Backbone, Marionette, $, _) {

	Group.SidebarUsersView = Marionette.CompositeView.extend({
		template: "#roster-sidebar-view",
		className: "sidebar-scroll",
		childView: LobbyApp.LobbyRosterItemView,
		childViewContainer: "#user-list",

	});

});