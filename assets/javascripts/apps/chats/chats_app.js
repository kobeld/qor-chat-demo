App.module("ChatsApp", function (ChatsApp, App, Backbone, Marionette, $, _) {

	ChatsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"teams/:teamId/chat/:convId": "startChatFromRouter"
		}
	})

	var API = {
		startChatFromRouter: function (teamId, convId) {

			App.execute("entity:set:teamid", teamId);
			// Show the Left menu first if it is from the router
			App.execute("cmd:menu:list", convId);
		},

		startChatByClicked: function (conv) {
			// Hide the Lobby view
			App.execute("cmd:lobby:hide");
			// Hide the privious chat view
			App.ChatsApp.Common.Controller.hideCurrentChatView();

			if (conv.isGroupChat()) {
				ChatsApp.Group.Controller.start(conv);
			} else {
				ChatsApp.Private.Controller.start(conv);
			}
		},

		hideChatView: function () {
			ChatsApp.Common.Controller.hideCurrentChatView();
		},

		closeChatView: function (conv) {
			ChatsApp.Common.Controller.popChatView(conv);
		},

		receiveMessage: function (data) {
			ChatsApp.Private.Controller.receiveMessage(data);
		}
	};

	// Start the conversation with the user passing in
	App.commands.setHandler("cmd:chats:users", function (withUsers) {

		var withUserIds = _.map(withUsers, function (user) {
			return user.id;
		})

		var newConv = new App.Entities.Conversation({
			"teamId": App.request("entity:cache:teamid"),
		});

		var savedConv = newConv.save({
			"withUserIds": withUserIds
		}, {
			headers: App.getBearerHeader(),
			success: function () {

				// TEMP: The backend should also return the teamId
				if (!newConv.get("teamId")) {
					newConv.set("teamId", App.request("entity:cache:teamid"))
				};

				newConv.set("withUsers", withUsers);
				App.execute("cmd:menu:activeOrAdd", newConv);
			}
		});
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
	});

	App.addInitializer(function (options) {
		new ChatsApp.Router({
			controller: API
		});
	});
});