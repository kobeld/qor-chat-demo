App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	// TODO:
	// Think about how to abstract the OnlineIndicator from UserInfoView and RosterItemView
	Private.UserInfoView = Marionette.ItemView.extend({
		className: "sidebar-scroll",
		template: "#user-info-sidebar-view",

		ui: {
			onlineIndicator: ".online-indicator"
		},

		templateHelpers: function () {
			return {
				onlineIcon: this.model.get("isOnline") ? "text-success" : "text-muted",
			};
		},

		modelEvents: {
			"change:isOnline": "updateOnlineIndicator"
		},

		updateOnlineIndicator: function () {
			if (this.model.get("isOnline")) {
				this.ui.onlineIndicator.removeClass("text-muted").addClass("text-success");
			} else {
				this.ui.onlineIndicator.removeClass("text-success").addClass("text-muted");
			};
		}

	});

});