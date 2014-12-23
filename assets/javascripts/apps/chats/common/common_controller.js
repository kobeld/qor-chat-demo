App.module("ChatsApp.Common", function (Common, App, Backbone, Marionette, $, _) {

	var _chatViews = [];
	var _currentChatView = "";

	Common.Controller = {

		findChatView: function (conv) {
			var chatView = _.find(_chatViews, function (view) {
				return view.id == conv.id;
			});

			return chatView;
		},

		pushChatView: function(chatView) {
			_chatViews.push(chatView);
		},

		popChatView: function (conv) {
			_chatViews = _.reject(_chatViews, function (view) {
				return view.id == conv.id;
			});
		},

		setCurrentChatView: function(chatView) {
			_currentChatView = chatView;
		},

		getCurrentChatView: function() {
			return _currentChatView;
		},

		hideCurrentChatView: function () {
			if (_currentChatView) {
				_currentChatView.$el.hide();
				_currentChatView = "";
			};
		}
	}
})