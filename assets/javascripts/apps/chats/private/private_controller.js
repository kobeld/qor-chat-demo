App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	var _selectedUser = null;

	Private.Controller = {
		show: function () {
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
				if (data.content === "" || _selectedUser === null) {
					alert("Please select a buddy on the right side to chat.")
					return;
				};

				var msg = {
					content: data.content,
					toUserId: _selectedUser.get("id"),
					fromUserId: App.MyAccount.get("id"),
					fromUserAvatar: App.MyAccount.get("avatar")
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

						if (_selectedUser == null) {
							buddies.chooseById(msg.fromUserId);
						};

						messages.add(msg);

					} else if (data.dType === "composing") {
						// TODO:
					};
				});
			})

			App.mainRegion.show(privateChatLayout);
		}
	};
});