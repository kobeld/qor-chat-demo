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
			App.execute("cmd:menu:activeOrAdd", conv);
			if (conv.get("isPrivate")) {
				ChatsApp.Private.Controller.start(conv.get("teamId"), conv.get("userId"));
			};
		}
	};

	App.commands.setHandler("cmd:chats:private:start", function (user) {

		// TODO: Should request from the backend
		var conv = new App.Entities.Conversation({
			id: user.id,
			isPrivate: true,
			teamId: user.get("teamId"),
			withUser: user
		});

		App.navigate("teams/" + conv.get("teamId") + "/chat/" + conv.id);
		API.startChatByClicked(conv);
	});

	App.addInitializer(function (options) {
		new ChatsApp.Router({
			controller: API
		});
	});
});