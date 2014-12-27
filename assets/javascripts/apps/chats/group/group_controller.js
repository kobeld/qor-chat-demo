App.module("ChatsApp.Group", function (Group, App, Backbone, Marionette, $, _) {

	Group.Controller = {

		start: function (conv) {

			var groupChatLayout = App.ChatsApp.Common.Controller.findChatView(conv.id);

			// Found the view from the cache
			if (groupChatLayout) {
				groupChatLayout.$el.show();
				// Set to cache the current view
				App.ChatsApp.Common.Controller.setCurrentChatView(groupChatLayout);

			} else {
				// Not found, initialize a new one and put it into the cache later
				groupChatLayout = new App.ChatsApp.Common.ChatLayout({
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

					// Initialize the Messages Area
					var messagesView = new App.ChatsApp.Common.ChatMessagesView({
						collection: messages
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

					// Setup the Show event.
					groupChatLayout.on("show", function () {
						this.inputRegion.show(inputView);
						this.messagesRegion.show(messagesView);

						ReadyChat.init();
					});

					// Finally show the layout
					App.mainRegion.show(groupChatLayout, {
						preventDestroy: true
					});

					App.ChatsApp.Common.Controller.pushChatView(groupChatLayout);
					// Set to cache the current view
					App.ChatsApp.Common.Controller.setCurrentChatView(groupChatLayout);

				}).fail(function (response) {
					App.execute("cmd:response:handle", response);
				});
			};

			var participants = App.request("entity:cache:users", conv.get("participantIds")),
				sidebarUsersView = new App.Common.RosterSidebarView({
					collection: participants
				});

			App.rightRegion.show(sidebarUsersView);
		}
	};

});