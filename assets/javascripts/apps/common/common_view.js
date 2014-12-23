App.module("Common", function (Common, App, Backbone, Marionette, $, _) {

	// The Roster User Item View (Basic element)
	Common.RosterItemView = Marionette.ItemView.extend({
		template: "#roster-item",

		modelEvents: {
			"change:isOnline": "updateOnlineIndicator"
		},

		ui: {
			alink: ".list-group-item",
			onlineIndicator: ".online-indicator"
		},

		onRender: function () {
			if (App.request("entity:check:myaccount", this.model)) {
				this.ui.alink.addClass("current-user");
			};
		},

		updateOnlineIndicator: function () {
			if (this.model.get("isOnline")) {
				this.ui.onlineIndicator.removeClass("text-muted").addClass("text-success");
			} else {
				this.ui.onlineIndicator.removeClass("text-success").addClass("text-muted");
			};
		}
	});

	Common.RosterSidebarView = Marionette.CompositeView.extend({
		template: "#roster-sidebar-view",
		className: "sidebar-scroll",
		childView: this.RosterItemView,
		childViewContainer: "#user-list"
	});

});