App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	Private.Controller = {
		start: function (conv) {
			var self = this,
				messages = App.request("chat:messages"),
				privateChatLayout = new Private.ChatLayout(),
				inputView = new Private.ChatInputView(),
				messagesView = new Private.ChatMessagesView({
					collection: messages
				});

			privateChatLayout.on("show", function () {
				this.inputRegion.show(inputView);
				this.messagesRegion.show(messagesView);

				ReadyChat.init(); // TODO: should change this logic to each view.
			});

			inputView.on("form:submit", function (data) {
				if (data.content === "") {
					alert("Content can not be blank!")
					return;
				};

				var msg = {
					content: data.content,
					toUserId: conv.get("withUser").id,
					fromUserId: App.Global.MyAccount.get("id"),
					fromUserAvatar: App.Global.MyAccount.get("avatar")
				}

				messages.add(msg);

				App.execute("cmd:websocket:send", {
					topic: "messages",
					dType: "new",
					message: msg
				});
			});

			messagesView.on("show", function () {
				// Set the handler to deal with the messages
				App.vent.on("vent:websocket:messages", function (data) {
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
			})

			App.mainRegion.show(privateChatLayout);
			// TODO: Show User Detail
			App.rightRegion.empty();
		}
	};
});