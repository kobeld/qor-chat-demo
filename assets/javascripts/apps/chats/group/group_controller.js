App.module("ChatsApp.Group", function (Group, App, Backbone, Marionette, $, _) {

	Group.Controller = {

		start: function (conv) {

			var groupChatLayout = App.ChatsApp.Common.Controller.findChatView(conv.id);

			if (groupChatLayout) {
				groupChatLayout.$el.show();

			} else {
				groupChatLayout = new App.ChatsApp.Common.ChatLayout({
					id: conv.id
				});

				var self = this,
					messages = App.request("chat:messages"),
					inputView = new App.ChatsApp.Common.ChatInputView(),
					messagesView = new App.ChatsApp.Common.ChatMessagesView({
						collection: messages
					});

				groupChatLayout.on("show", function () {
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
							fromUserId: myAccount.get("id"),
							fromUserAvatar: myAccount.get("avatar")
						};

					messages.add(msg);

					App.execute("cmd:websocket:send", {
						topic: "messages",
						dType: "group",
						message: msg
					});

				});

				messagesView.on("show", function () {
					// Set the handler to deal with the messages
					groupChatLayout.on("vent:messages:" + conv.id, function (data) {
						var msg = data.message;

						if (data.dType === "all") {
							// messages.reset(object);

						} else if (data.dType === "group") {

							messages.add(msg);

						} else if (data.dType === "composing") {
							// TODO:
						};
					});
				});

				App.mainRegion.show(groupChatLayout, {
					preventDestroy: true
				});

				App.ChatsApp.Common.Controller.pushChatView(groupChatLayout);
			}

			// Set to cache the current view
			App.ChatsApp.Common.Controller.setCurrentChatView(groupChatLayout);

			var participants = App.request("entity:cache:users", conv.get("userIds"));
			var sidebarUsersView = new App.Common.RosterSidebarView({
				collection: participants
			});

			App.rightRegion.show(sidebarUsersView);
		}
	};

});