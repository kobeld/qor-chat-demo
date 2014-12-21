App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	var _chatViews = [];
	var _currentView = "";

	Private.Controller = {

		start: function (conv) {

			// Hide the privious chat view
			this.hideChatView();

			var privateChatLayout = _.find(_chatViews, function (view) {
				return view.id == conv.id;
			});

			if (privateChatLayout) {
				privateChatLayout.$el.show();

			} else {
				privateChatLayout = new Private.ChatLayout({
					id: conv.id
				});

				var self = this,
					messages = App.request("chat:messages"),
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
						convId: conv.id,
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
				})

				App.mainRegion.show(privateChatLayout, {
					preventDestroy: true
				});

				_chatViews.push(privateChatLayout);
			}

			// Set to cache the current view
			_currentView = privateChatLayout;

			userInfoView = new App.ChatsApp.Common.UserInfoView({
				model: conv.get("withUser")
			}),
			App.rightRegion.show(userInfoView);
		},

		hideChatView: function () {
			if (_currentView) {
				_currentView.$el.hide();
				_currentView = "";
			};
		},

		closeChatView: function (conv) {
			_chatViews = _.reject(_chatViews, function (view) {
				return view.id == conv.id;
			});
		},

		receiveMessage: function (data) {
			var msg = data.message;
			var privateChatLayout = _.find(_chatViews, function (view) {
				return view.id == msg.convId;
			});

			// The conversation tab is open, just show the message
			if (privateChatLayout) {
				privateChatLayout.trigger("vent:messages:" + msg.convId, data);

			} else {
				// Should bump out the conversation tab
				var conv = new App.Entities.Conversation({
					id: "5469a9c263ed2e0df1000001", // Aaron and Safari
					isPrivate: true,
					teamId: App.Entities.DemoUser.get("teamId"),
					withUser: App.Entities.DemoUser,
				});

				App.execute("cmd:menu:activeOrAdd", conv);
				this.receiveMessage(data);
			}
		}
	};
});