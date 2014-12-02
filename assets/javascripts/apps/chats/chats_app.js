App.module("ChatsApp", function (ChatsApp, App, Backbone, Marionette, $, _) {

	var API = {
		Private: {
			show: function() {
				ChatsApp.Private.Controller.show();
			}
		}
	};

	// App.vent.on("vent:websocket:open", function () {
	// 	API.loadPrivateChat();
	// });
	App.commands.setHandler("cmd:chats:private:show", function(){
		API.Private.show();
	})
});