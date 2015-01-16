App.module("ChatsApp.Common", function (Common, App, Backbone, Marionette, $, _) {

	Common.ChatLayout = Marionette.LayoutView.extend({
		className: "block",
		template: "#chat-layout",

		regions: {
			messagesRegion: "#messages-region",
			inputRegion: "#input-region"
		},

		ui: {
			chatCon: ".chatui-container",
			chatTalk: ".chatui-talk",
			chatTalkScroll: ".chatui-talk-scroll",
			chatInput: ".chatui-input"
		},

		// Call this to initialize the chat area
		readyChat: function () {
			var self = this;
			// Initialize default chat height
			this.updateChatHeight();

			// Update chat UI components height on window resize
			$(window).resize(function () {
				self.updateChatHeight();
			});

			// Initialize scrolling on chat talk + people
			this.ui.chatTalkScroll
				.slimScroll({
					height: this.ui.chatTalk.outerHeight(),
					color: '#000',
					size: '3px',
					position: 'right',
					touchScrollStep: 100,
					start: 'bottom'
				});
		},

		scrollChatTalk: function () {
			var value = this.ui.chatTalkScroll.prop('scrollHeight') + 'px';
			this.ui.chatTalkScroll.slimScroll({scrollTo: value});
		},

		updateChatHeight: function () {

			var chatHeight = 500; // Default chat container height in large screens
			var chatHeightSmall = 300; // Default chat components (talk & people) height in small screens

			var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if (windowW < 768) { // On small screens
				this.ui.chatCon
					.css('height', (chatHeightSmall * 2) + this.ui.chatInput.outerHeight());

				this.ui.chatTalk
					.add(this.ui.chatTalkScroll)
					.add(this.ui.chatTalkScroll.parent())
					.css('height', chatHeightSmall);
			} else if (windowW > 767) { // On large screens
				this.ui.chatCon
					.css('height', chatHeight);

				this.ui.chatTalk
					.add(this.ui.chatTalkScroll)
					.add(this.ui.chatTalkScroll.parent())
					.css('height', chatHeight - this.ui.chatInput.outerHeight());
			}
		}

	});

	Common.ChatMessageView = Marionette.ItemView.extend({
		tagName: "li",
		className: "chatui-talk-msg",
		template: "#chat-message",

		onBeforeRender: function () {
			var fromUserId = this.model.get("fromUserId"),
				user = App.request("entity:cache:user", fromUserId);
			if (user) {
				this.model.set("fromUserAvatar", user.get("avatar"));
			};

			if (fromUserId === App.request("entity:cache:myaccount").get("id")) {
				this.$el.addClass("chatui-talk-msg-highlight themed-border");
			};
		}
	});

	Common.ChatMessagesView = Marionette.CollectionView.extend({
		tagName: "ul",
		childView: Common.ChatMessageView
	});

	Common.ChatInputView = Marionette.ItemView.extend({
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
	});

})
