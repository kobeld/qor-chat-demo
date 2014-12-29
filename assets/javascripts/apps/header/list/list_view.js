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
		}
	});

	List.XmppSettingsView = Marionette.ItemView.extend({
		template: "#xmpp-settings"
	})

});