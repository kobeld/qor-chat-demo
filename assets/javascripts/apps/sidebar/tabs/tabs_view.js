App.module("SidebarApp.Tabs", function (Tabs, App, Backbone, Marionette, $, _) {
    Tabs.TabsView = Marionette.ItemView.extend({
	template: "#navigation-tabs",

        initialize: function () {
            this.switchPrivateTab();
        },

        events: {
            "click li": "activateTab"
        },

        _clearActiveTabs: function(){
            this.$("li a").removeClass("active")
        },

        activateTab: function(event){
            this._clearActiveTabs();
            $($(event.currentTarget).find("a")).addClass("active");
        },

        switchPrivateTab: function(){
            this._clearActiveTabs();
            this.$(".navigation-tab-private").addClass("active")
        },
        switchGroupTab: function(){
            this._clearActiveTabs();
            this.$(".navigation-tab-group").addClass("active")
        },
        switchHistoryTab: function(){
            this._clearActiveTabs();
            this.$(".navigation-tab-history").addClass("active")
        },
    });
});

