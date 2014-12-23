App.module("ChatsApp.Group", function (Group, App, Backbone, Marionette, $, _) {

	Group.Controller = {

		start: function (conv) {

			var groupChatLayout = App.ChatsApp.Common.Controller.findChatView(conv);

			if (groupChatLayout) {
				groupChatLayout.$el.show();

			} else {
				groupChatLayout = new App.ChatsApp.Common.Views.ChatLayout({
					id: conv.id
				});

				var self = this,
					messages = App.request("chat:messages"),
					inputView = new App.ChatsApp.Common.Views.ChatInputView(),
					messagesView = new App.ChatsApp.Common.Views.ChatMessagesView({
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

					// TODO: Send Message
				});

				messagesView.on("show", function () {
					// Set the handler to deal with the messages
					groupChatLayout.on("vent:messages:" + conv.id, function (data) {
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

				App.mainRegion.show(groupChatLayout, {
					preventDestroy: true
				});

				App.ChatsApp.Common.Controller.pushChatView(groupChatLayout);
			}

			// Set to cache the current view
			App.ChatsApp.Common.Controller.setCurrentChatView(groupChatLayout);

			console.log(conv);

			var sidebarUsersView = new App.Common.RosterSidebarView({
				collection: new App.Entities.UserCollection(conv.get("withUsers"))
			});

			App.rightRegion.show(sidebarUsersView);
		}
	};

});