App.module("RosterApp.Sidebar", function (Sidebar, App, Backbone, Marionette, $, _) {

	// Define the Layout
	Sidebar.RosterLayout = Marionette.LayoutView.extend({
		className: "sidebar-scroll",
		template: "#roster-sidebar-layout",

		regions: {
			onlineUsersRegion: "#online-users-region",
			offlineUsersRegion: "#offline-users-region"
		}
	});

	// The Roster User Item View (Basic element)
	Sidebar.RosterUserItemView = Marionette.ItemView.extend({
		template: "#roster-user-item"
	});

	// Define the Online Users Composite View
	Sidebar.OnlineUsersView = Marionette.CompositeView.extend({
		template: "#roster-online-users",
		childView: Sidebar.RosterUserItemView,
		childViewContainer: ".list-group"
	});

	// Define the Offline Users Composite View
	Sidebar.OfflineUsersView = Marionette.CompositeView.extend({
		template: "#roster-offline-users",
		childView: Sidebar.RosterUserItemView,
		childViewContainer: ".list-group"
	});

})