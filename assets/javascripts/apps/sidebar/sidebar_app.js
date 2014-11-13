App.module("SidebarApp", function (SidebarApp, App, Backbone, Marionette, $, _) {
	var API = {
		loadTabs: function () {
			SidebarApp.Tabs.Controller.loadTabs();
		},
	};

	SidebarApp.on("before:start", function(options){
		API.loadTabs();
	});

        App.commands.setHandler("set:active:tab", function(name){
            App.SidebarApp.Tabs.Controller.setActiveTab(name);
        });
});

