App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	Private.Controller = {

		start: function (conv) {

			var toUser = conv.get("withUsers")[0],
				privateChatLayout = App.ChatsApp.Common.Controller.findChatView(conv);

			if (privateChatLayout) {
				privateChatLayout.$el.show();

			} else {
				privateChatLayout = new App.ChatsApp.Common.Views.ChatLayout({
					id: conv.id
				});

				var self = this,
					messages = App.request("chat:messages"),
					inputView = new App.ChatsApp.Common.Views.ChatInputView(),
					messagesView = new App.ChatsApp.Common.Views.ChatMessagesView({
						collection: messages
					});

				privateChatLayout.on("show", function () {
					this.inputRegion.show(inputView);
					this.messagesRegion.show(messagesView);

					ReadyChat.init();
				});

				inputView.on("form:submit", function (data) {
					if (data.content === "") {
						alert("Content can not be blank!")
						return;
					};

					var myAccount = App.request("entity:cache:myaccount"),
						msg = {
							convId: conv.id,
							content: data.content,
							toUserId: toUser.id,
							fromUserId: myAccount.get("id"),
							fromUserAvatar: myAccount.get("avatar")
						};

					messages.add(msg);

					App.execute("cmd:websocket:send", {
						topic: "messages",
						dType: "new",
						message: msg
					});
				});

				messagesView.on("show", function () {
					// Set the handler to deal with the messages
					privateChatLayout.on("vent:messages:" + conv.id, function (data) {
						var msg = data.message;

						if (data.dType === "all") {
							// messages.reset(object);

						} else if (data.dType === "new") {

							// if (_selectedUser == null) {
							// 	buddies.chooseById(msg.fromUserId);
							// };

							messages.add(msg);

						} else if (data.dType === "composing") {
							// TODO:
						};
					});
				});

				App.mainRegion.show(privateChatLayout, {
					preventDestroy: true
				});

				App.ChatsApp.Common.Controller.pushChatView(privateChatLayout);
			}

			// Set to cache the current view
			App.ChatsApp.Common.Controller.setCurrentChatView(privateChatLayout);

			var userInfoView = new Private.UserInfoView({
				model: toUser
			});
			App.rightRegion.show(userInfoView);
		},

		receiveMessage: function (data) {
			var msg = data.message,
				privateChatLayout = App.ChatsApp.Common.Controller.findChatView(conv);

			// The conversation tab is open, just show the message
			if (privateChatLayout) {
				privateChatLayout.trigger("vent:messages:" + msg.convId, data);

			} else {
				// Should bump out the conversation tab
				var conv = new App.Entities.Conversation({
					id: "5469a9c263ed2e0df1000001", // Aaron and Safari
					teamId: App.Entities.DemoUser.get("teamId"),
					withUsers: [App.Entities.DemoUser],
				});

				App.execute("cmd:menu:activeOrAdd", conv);
				this.receiveMessage(data);
			}
		}
	};
});