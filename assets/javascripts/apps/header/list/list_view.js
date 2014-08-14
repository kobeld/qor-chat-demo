App.module("HeaderApp.List", function (List, App, Backbone, Marionette, $, _) {

	// ItemView
	// User account item view
	List.UserAccountView = Marionette.ItemView.extend({
		tagName: "ul",
		className: "nav navbar-nav-custom pull-right",
		template: "#user-account",

		triggers: {
			"click a.js-logout": "user:logout"
		},

		events: {
			"click .dropdown-toggle": "testing"
		},

		testing: function () {

			var data = {
				"dType": "ping",
				"content": "I am Aaron",
			};

			App.execute("cmd:websocket:send", data)
		}

	});

});