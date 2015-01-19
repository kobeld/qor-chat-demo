App.module("HeaderApp.List", function (List, App, Backbone, Marionette, $, _) {

	// ItemView
	// User account item view
	List.UserAccountView = Marionette.ItemView.extend({
		tagName: "ul",
		className: "nav navbar-nav-custom pull-right",
		template: "#user-account",

		triggers: {
			"click a.js-logout": "user:logout",
			"click a.xmpp-settings": "user:xmpp",
			"click a.teams-settings": "user:teams",
		}
	});

	List.XmppSettingsView = Marionette.ItemView.extend({
		template: "#xmpp-settings"
	});

	List.TeamInfoView = Marionette.ItemView.extend({
		template: "#team-info",

		triggers: {
			"click .js-switch-team": "team:switch"
		}
	});

	List.TeamsSettingsView = Marionette.CompositeView.extend({
		template: "#teams-settings",
		childView: this.TeamInfoView,
		childViewContainer: "#teams-info",
	});
});