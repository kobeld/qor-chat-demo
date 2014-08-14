App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	Private.Controller = {
		load: function() {
			var privateChatLayout = new Private.ChatLayout();


			var titleView = new Private.ChatTitleView(),
				rosterView = new Private.ChatRosterView(),
				messagesView = new Private.ChatMessagesView(),
				inputView = new Private.ChatInputView();

			privateChatLayout.on("show", function(){
				privateChatLayout.titleRegion.show(titleView);
				privateChatLayout.rosterRegion.show(rosterView);
				privateChatLayout.messagesRegion.show(messagesView);
				privateChatLayout.inputRegion.show(inputView);

				ReadyChat.init(); // TODO: should change this logic to each view.
			});


			App.mainRegion.show(privateChatLayout);
		}
	};
});