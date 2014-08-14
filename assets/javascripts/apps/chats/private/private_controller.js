App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	var _selectedUser = null;

	Private.Controller = {
		load: function () {
			var self = this,
				buddies = App.request("chat:buddies"),
				messages = App.request("chat:messages"),
				privateChatLayout = new Private.ChatLayout(),
				titleView = new Private.ChatTitleView(),
				inputView = new Private.ChatInputView(),
				rosterView = new Private.ChatRosterView({
					collection: buddies
				}),
				messagesView = new Private.ChatMessagesView({
					collection: messages
				})

				Private.listenTo(buddies, "collection:chose:one", function (chosen) {
					titleView.reRender(chosen);

					_selectedUser = chosen;

					var userId = chosen.get("id");
					// Request recent conversation via websocket
					App.execute("cmd:websocket:send", {
						topic: "messages",
						dType: "conversation",
						message: {
							fromUserId: App.MyAccount.get("id"),
							toUserId: userId
						}
					});
				});

			privateChatLayout.on("show", function () {
				this.titleRegion.show(titleView);
				this.rosterRegion.show(rosterView);
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

			rosterView.on("show", function () {

				// Set the handler to deal with the roster once received
				App.vent.on("vent:websocket:roster", function (data) {
					var object = data.object;
					if (data.dType === "all") {
						buddies.reset(object);
						buddies.chooseFirst();

					} else if (data.dType === "online") {
						buddies.add(object);

					} else if (data.dType === "offline") {
						buddies.remove(object)

					};
				});

				// Request roster via websocket
				App.execute("cmd:websocket:send", {
					topic: "roster",
					dType: "all",
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