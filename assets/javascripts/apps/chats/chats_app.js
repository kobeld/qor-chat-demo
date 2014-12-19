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
		}
	};

	// Start the conversation with the user passing in
	App.commands.setHandler("cmd:chats:private:user", function (user) {
		// TODO: Should request from the backend
		var conv = new App.Entities.Conversation({
			id: user.id,
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

	App.addInitializer(function (options) {
		new ChatsApp.Router({
			controller: API
		});
	});
});