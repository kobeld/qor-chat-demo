App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	Private.Controller = {
		load: function () {
			var self = this,
				buddies = App.request("chat:buddies"),
				privateChatLayout = new Private.ChatLayout(),
				titleView = new Private.ChatTitleView(),
				rosterView = new Private.ChatRosterView({
					collection: buddies
				}),
				messagesView = new Private.ChatMessagesView(),
				inputView = new Private.ChatInputView();

			Private.listenTo(buddies, "collection:chose:one", function(chosen){
				titleView.reRender(chosen);
			});


			privateChatLayout.on("show", function () {
				this.titleRegion.show(titleView);
				this.rosterRegion.show(rosterView);
				this.messagesRegion.show(messagesView);
				this.inputRegion.show(inputView);

				ReadyChat.init(); // TODO: should change this logic to each view.
			});

			rosterView.on("show", function() {

				// Set the handler to deal with the roster once received
				App.vent.on("vent:websocket:roster", function (data) {
					var object = data.object;
					if (data.dType === "all") {
						buddies.reset(object);

					} else if (data.dType === "online") {
						buddies.add(object);

					} else if (data.dType === "offline") {
						buddies.remove(object)

					};
				});

				// Request rost via websocket
				App.execute("cmd:websocket:send", {
					topic: "roster",
					dType: "all",
				});
			});

			App.mainRegion.show(privateChatLayout);
		}
	};
});