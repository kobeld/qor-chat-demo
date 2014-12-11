App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	LobbyApp.LobbyFullView = Marionette.ItemView.extend({
		template: "#lobby-full"
	});

	// Define the Roster Layout on the left side
	LobbyApp.RosterLayout = Marionette.LayoutView.extend({
		className: "sidebar-scroll",
		template: "#roster-sidebar-layout",

		regions: {
			onlineUsersRegion: "#online-users-region",
			offlineUsersRegion: "#offline-users-region"
		}
	});

	// The Roster User Item View (Basic element)
	LobbyApp.RosterUserItemView = Marionette.ItemView.extend({
		template: "#roster-user-item",

		events: {
			"dblclick a": "privateChat"
		},

		privateChat: function(e) {
			e.preventDefault();
			this.model.choose();
		}

	});

	// Define the Online Users Composite View
	LobbyApp.OnlineUsersView = Marionette.CompositeView.extend({
		template: "#roster-online-users",
		childView: LobbyApp.RosterUserItemView,
		childViewContainer: ".list-group"
	});

	// Define the Offline Users Composite View
	LobbyApp.OfflineUsersView = Marionette.CompositeView.extend({
		template: "#roster-offline-users",
		childView: LobbyApp.RosterUserItemView,
		childViewContainer: ".list-group"
	});

});