App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	var API = {
			list: function() {
				MenuApp.Controller.list();
		}
	};

	App.commands.setHandler("cmd:menu:list", function(){
		API.list();
	})
});