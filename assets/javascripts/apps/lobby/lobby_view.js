App.module("LobbyApp", function (LobbyApp, App, Backbone, Marionette, $, _) {

	LobbyApp.LobbyFullView = Marionette.ItemView.extend({
		className: "lobby-full-view",
		template: "#lobby-full"
	});

	// The Roster Item in Lobby
	// Extended from App.Common.RosterItemView
	LobbyApp.LobbyRosterItemView = App.Common.RosterItemView.extend({

		events: {
			"click a": "selectToChat"
		},

		selectToChat: function (e) {
			e.preventDefault();

			if (!App.request("entity:check:myaccount", this.model)) {
				this.ui.alink.toggleClass("selected");
				this.model.toggleChoose();
			}
		}
	});

	// The Roster Sidebar View that maintaining the user list
	// Extended from App.Common.RosterSidebarView
	LobbyApp.RosterSideberView = App.Common.RosterSidebarView.extend({
		childView: LobbyApp.LobbyRosterItemView,

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