App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	Private.Controller = {

		start: function (conv) {

			var toUser = conv.get("withUsers")[0],
				privateChatLayout = App.ChatsApp.Common.Controller.findChatView(conv.id);

			// Found the view from the cache
			if (privateChatLayout) {
				privateChatLayout.$el.show();
				// Set to cache the current view
				App.ChatsApp.Common.Controller.setCurrentChatView(privateChatLayout);

			} else {
				// Not found, initialize a new one and put it into the cache later
				privateChatLayout = new App.ChatsApp.Common.ChatLayout({
					id: conv.id
				});

				// Fetch Chat Transcripts
				// TODO: Consider to use localstorage to store some messages
				var msgsEntity = App.request("entity:messages", conv.id);
				$.when(msgsEntity).done(function (messages) {
					// Initialize the Message Input box at the bottom
					var inputView = new App.ChatsApp.Common.ChatInputView();
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
								fromUserAvatar: myAccount.get("avatar"),
								fromUserName: myAccount.get("name"),
								fromUserEmail: myAccount.get("email")
							};

						messages.push(msg);
						privateChatLayout.scrollChatTalk();

						App.execute("cmd:websocket:send", {
							topic: "messages",
							dType: "private",
							message: msg
						});
					});

					// Initialize the Messages Area
					var messagesView = new App.ChatsApp.Common.ChatMessagesView({
						collection: messages
					});

					messagesView.on("show", function () {
						// Set the handler to deal with the messages
						privateChatLayout.on("vent:messages:" + conv.id, function (data) {
							var msg = data.message;

							if (data.dType === "all") {
								// messages.reset(object);

							} else if (data.dType === "private" || data.dType == "sync") {

								messages.push(msg);
								privateChatLayout.scrollChatTalk();

							} else if (data.dType === "composing") {
								// TODO:
							};
						});
					});

					// Setup the Show event.
					privateChatLayout.on("show", function () {
						this.inputRegion.show(inputView);
						this.messagesRegion.show(messagesView);
						this.readyChat();
					});

					// Finally show the layout
					App.mainRegion.show(privateChatLayout, {
						preventDestroy: true
					});

					App.ChatsApp.Common.Controller.pushChatView(privateChatLayout);
					// Set to cache the current view
					App.ChatsApp.Common.Controller.setCurrentChatView(privateChatLayout);

				}).fail(function (response) {
					App.execute("cmd:response:handle", response);
				});
			};

			var userInfoView = new Private.UserInfoView({
				model: toUser
			});
			App.rightRegion.show(userInfoView);
		}
	};
});