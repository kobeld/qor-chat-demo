App.module("ChatsApp.Common", function (Common, App, Backbone, Marionette, $, _) {

	var _chatViews = [];
	var _currentChatView = "";

	Common.Controller = {

		findChatView: function (convId) {
			var chatView = _.find(_chatViews, function (view) {
				return view.id == convId;
			});

			return chatView;
		},

		pushChatView: function (chatView) {
			_chatViews.push(chatView);
		},

		popChatView: function (conv) {
			_chatViews = _.reject(_chatViews, function (view) {
				return view.id == conv.id;
			});
		},

		setCurrentChatView: function (chatView) {
			_currentChatView = chatView;
		},

		getCurrentChatView: function () {
			return _currentChatView;
		},

		hideCurrentChatView: function () {
			if (_currentChatView) {
				_currentChatView.$el.hide();
				_currentChatView = "";
			};
		},

		receiveMessage: function (data) {
			var self = this,
				msg = data.message,
				chatLayout = App.ChatsApp.Common.Controller.findChatView(msg.convId);

			// The conversation tab is open, just show the message
			if (chatLayout) {
				chatLayout.trigger("vent:messages:" + msg.convId, data);

			} else {
				// Should fetch the conversation first
				var convEntity = App.request("entity:conversation", msg.convId);
				$.when(convEntity).done(function (conv) {

					App.execute("cmd:menu:activeOrAdd", conv);

					// Don't have to because it will fetch the history which includes that message
					// self.receiveMessage(data);

				}).fail(function (response) {
					App.execute("cmd:response:handle", response);
				});
			};
		}
	}
})