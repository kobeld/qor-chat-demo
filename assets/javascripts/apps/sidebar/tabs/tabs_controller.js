App.module("SidebarApp.Tabs", function (Tabs, App, Backbone, Marionette, $, _) {
    Tabs.Controller = {
        loadTabs: function () {
            var links = App.request("tabs:entities");
            var tabsView = new Tabs.TabsView({
                collection: links,
            });
	    App.leftRegion.show(tabsView);
        },

        setActiveTab: function(name){
            var links = App.request("tabs:entities");
            var tabToSelect = links.find(function(tab){ return tab.get("url") === name; });
            tabToSelect.select();
            links.trigger("reset");
        }
    }
});

