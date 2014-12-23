App.module("ChatsApp.Common", function (Common, App, Backbone, Marionette, $, _) {

	Common.Views = {

		ChatLayout: Marionette.LayoutView.extend({
			className: "block",
			template: "#chat-layout",

			regions: {
				messagesRegion: "#messages-region",
				inputRegion: "#input-region"
			}
		}),

		ChatMessageView: Marionette.ItemView.extend({
			tagName: "li",
			className: "chatui-talk-msg",
			template: "#chat-message",

			onBeforeRender: function () {
				if (this.model.get("fromUserId") === App.Global.MyAccount.get("id")) {
					this.$el.addClass("chatui-talk-msg-highlight themed-border");
				};
			}
		}),

		ChatMessagesView: Marionette.CollectionView.extend({
			tagName: "ul",
			childView: this.ChatMessageView
		}),

		ChatInputView: Marionette.ItemView.extend({
			template: "#chat-input",

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
	};

})