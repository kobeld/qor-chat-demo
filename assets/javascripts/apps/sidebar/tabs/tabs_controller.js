App.module("SidebarApp.Tabs", function (Tabs, App, Backbone, Marionette, $, _) {
    Tabs.Controller = {
        loadTabs: function () {
            var tabsView = new Tabs.TabsView({});
	    App.leftRegion.show(tabsView);
        },
    }
});

