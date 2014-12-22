App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	LobbyApp.LobbyFullView = Marionette.ItemView.extend({
		className: "lobby-full-view",
		template: "#lobby-full"
	});

	// The Roster User Item View (Basic element)
	LobbyApp.RosterUserItemView = Marionette.ItemView.extend({
		template: "#roster-user-item",

		events: {
			"click a": "selectToChat"
		},

		modelEvents: {
			"change:isOnline": "updateOnlineIndicator"
		},

		ui: {
			alink: ".list-group-item",
			onlineIndicator: ".online-indicator"
		},

		selectToChat: function (e) {
			e.preventDefault();

			if (!App.Global.IsCurrentUser(this.model)) {
				this.ui.alink.toggleClass("selected");
				this.model.toggleChoose();
			}
		},

		onRender: function () {
			if (App.Global.IsCurrentUser(this.model)) {
				this.ui.alink.addClass("current-user");
			};
		},

		updateOnlineIndicator: function () {
			if (this.model.get("isOnline")) {
				this.ui.onlineIndicator.removeClass("text-muted").addClass("text-success");
			} else {
				this.ui.onlineIndicator.removeClass("text-success").addClass("text-muted");
			}
		}
	});

	// The Roster Sidebar View that maintaining the user list
	LobbyApp.RosterSideberView = Marionette.CompositeView.extend({
		template: "#roster-sidebar-view",
		className: "sidebar-scroll",
		childView: LobbyApp.RosterUserItemView,
		childViewContainer: "#user-list",

		ui: {
			startChatBtn: ".js-start-chat"
		},

		collectionEvents: {
			"collection:chose:some collection:chose:none collection:chose:all": "updateStartChatBtn",
		},

		triggers: {
			"click .js-start-chat": "start:chat"
		},

		updateStartChatBtn: function (models) {
			var number = models.length;
			if (number == 0) {
				this.ui.startChatBtn.addClass("hide");
			} else if (number == 1) {
				this.ui.startChatBtn.removeClass("hide").html("Start Chat");
			} else {
				this.ui.startChatBtn.removeClass("hide").html("Start Meeting");
			}
		}
	});

});