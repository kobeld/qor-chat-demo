App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	Private.ChatLayout = Marionette.LayoutView.extend({
		className: "block",
		template: "#private-chat-layout",

		regions: {
			messagesRegion: "#messages-region",
			inputRegion: "#input-region"
		}
	});

	Private.ChatMessageView = Marionette.ItemView.extend({
		tagName: "li",
		className: "chatui-talk-msg",
		template: "#private-chat-message",

		onBeforeRender: function () {
			if (this.model.get("fromUserId") === App.MyAccount.get("id")) {
				this.$el.addClass("chatui-talk-msg-highlight themed-border");
			};
		}
	});

	Private.ChatMessagesView = Marionette.CollectionView.extend({
		tagName: "ul",
		template: "#private-chat-messages",
		childView: Private.ChatMessageView
	});

	Private.ChatInputView = Marionette.ItemView.extend({
		template: "#private-chat-input",

		events: {
			"submit": "submit"
		},

		ui: {
			messageInput: "input[name=content]"
		},

		submit: function (e) {
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("form:submit", data);
			this.cleanup();
		},

		cleanup: function () {
			this.ui.messageInput.val("");
		}
	})

});