App.module("ChatsApp", function (ChatsApp, App, Backbone, Marionette, $, _) {

	ChatsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"teams/:teamId/chat/:convId": "startChatFromRouter"
		}
	})

	var API = {
		startChatFromRouter: function (teamId, convId) {
			// Show the Left menu first if it is from the router
			App.execute("cmd:menu:list", teamId, convId);
		},

		startChatByClicked: function (conv) {
			if (conv.get("isPrivate")) {
				// Hide the Lobby view
				App.execute("cmd:lobby:hide");
				ChatsApp.Private.Controller.start(conv);
			};
		},

		hideChatView: function () {
			ChatsApp.Private.Controller.hideChatView();
		},

		closeChatView: function (conv) {
			ChatsApp.Private.Controller.closeChatView(conv);
		},

		receiveMessage: function (data) {
			ChatsApp.Private.Controller.receiveMessage(data);
		}
	};

	// Start the conversation with the user passing in
	App.commands.setHandler("cmd:chats:private:user", function (user) {
		// TODO: Should request from the backend
		var conv = new App.Entities.Conversation({
			id: "5469a9c263ed2e0df1000001", // Aaron and Safari
			isPrivate: true,
			teamId: user.get("teamId"),
			withUser: user
		});

		App.execute("cmd:menu:activeOrAdd", conv);
	});

	// Start the conversation with the conv passing in
	App.commands.setHandler("cmd:chats:private:conv", function (conv) {
		App.navigate("teams/" + conv.get("teamId") + "/chat/" + conv.id);
		API.startChatByClicked(conv);
	});

	App.commands.setHandler("cmd:chats:hide", function () {
		API.hideChatView();
	});

	App.commands.setHandler("cmd:chats:close", function (conv) {
		API.closeChatView(conv);
	});

	App.vent.on("vent:websocket:messages", function (data) {

		API.receiveMessage(data);

		// var msg = data.message;

		// if (data.dType === "all") {
		// 	// messages.reset(object);

		// } else if (data.dType === "new") {

		// 	// if (_selectedUser == null) {
		// 	// 	buddies.chooseById(msg.fromUserId);
		// 	// };

		// 	// messages.add(msg);

		// } else if (data.dType === "composing") {
		// 	// TODO:
		// };
	});

	App.addInitializer(function (options) {
		new ChatsApp.Router({
			controller: API
		});
	});
});