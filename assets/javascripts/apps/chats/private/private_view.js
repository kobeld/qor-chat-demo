App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	Private.ChatLayout = Marionette.LayoutView.extend({
		className: "block",
		template: "#private-chat-layout",

		regions: {
			titleRegion: "#title-region",
			rosterRegion: "#roster-region",
			messagesRegion: "#messages-region",
			inputRegion: "#input-region"
		}
	});

	Private.ChatTitleView = Marionette.ItemView.extend({
		template: "#private-chat-title"
	});

	Private.ChatBuddyView = Marionette.ItemView.extend({
		template: "#private-chat-buddy"
	});

	Private.ChatRosterView = Marionette.CompositeView.extend({
		template: "#private-chat-roster",
		childView: Private.ChatBuddyView,
		childViewContainer: ".list-group"
	});

	Private.ChatMessagesView = Marionette.ItemView.extend({
		template: "#private-chat-messages"
	});

	Private.ChatInputView = Marionette.ItemView.extend({
		template: "#private-chat-input"
	})

});