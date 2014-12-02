App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	var API = {
		Sidebar: {
			list: function() {
				MenuApp.Sidebar.Controller.list();
			}
		}
	};

	App.commands.setHandler("cmd:menu:sidebar:list", function(){
		API.Sidebar.list();
	})
});