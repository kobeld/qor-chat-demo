App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	Private.Controller = {

		start: function (conv) {

			var toUser = conv.get("withUsers")[0],
				privateChatLayout = App.ChatsApp.Common.Controller.findChatView(conv.id);

			// Found the view from the cache
			if (privateChatLayout) {
				privateChatLayout.$el.show();

			} else {
				// Not found, initialize a new one and put it into the cache later
				privateChatLayout = new App.ChatsApp.Common.ChatLayout({
					id: conv.id
				});

				var self = this,
					messages = App.request("chat:messages"),
					inputView = new App.ChatsApp.Common.ChatInputView(),
					messagesView = new App.ChatsApp.Common.ChatMessagesView({
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
							receiverId: toUser.id,
							fromUserId: myAccount.get("id"),
							fromUserAvatar: myAccount.get("avatar")
						};

					messages.add(msg);

					App.execute("cmd:websocket:send", {
						topic: "messages",
						dType: "private",
						message: msg
					});
				});

				messagesView.on("show", function () {
					// Set the handler to deal with the messages
					privateChatLayout.on("vent:messages:" + conv.id, function (data) {
						var msg = data.message;

						if (data.dType === "all") {
							// messages.reset(object);
						} else if (data.dType === "sync") {

							messages.push(msg);

						} else if (data.dType === "private") {

							messages.push(msg);

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
		}
	};
});
