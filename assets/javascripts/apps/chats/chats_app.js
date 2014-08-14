App.module("ChatsApp", function (ChatsApp, App, Backbone, Marionette, $, _) {

	var API = {
		loadPrivateChat: function() {
			ChatsApp.Private.Controller.load();
		}
	};

	App.vent.on("vent:websocket:open", function () {

		// var buddyJson = {
		// 	name: "Aaron Liang",
		// 	avatar: "http://www.gravatar.com/avatar/a3ed819e3c69ed22ee557fc0063143c3?s=40"
		// };

		// var roster = [{
		// 	name: "Aaron Liang",
		// 	avatar: "http://www.gravatar.com/avatar/a3ed819e3c69ed22ee557fc0063143c3?s=40"
		// },{
		// 	name: "Azuma Fan",
		// 	avatar: "http://www.gravatar.com/avatar/a3ed819e3c69ed22ee557fc0063143c3?s=40"
		// }]

		API.loadPrivateChat();
	});

});