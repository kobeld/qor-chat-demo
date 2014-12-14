App.module("ChatsApp", function (ChatsApp, App, Backbone, Marionette, $, _) {

	var API = {
		Private: {
			show: function() {
				ChatsApp.Private.Controller.show();
			}
		}
	};

	App.commands.setHandler("cmd:chats:private:show", function(){
		API.Private.show();
	})
});