App.module("SidebarApp.Tabs", function (Tabs, App, Backbone, Marionette, $, _) {
    Tabs.TabView = Marionette.ItemView.extend({
        template: "#navigation-tab",

        tagName: "li",

        events: {
            "click a": "navigate"
        },

        ui: {
            "link": "a"
        },

        navigate: function(e){
            e.preventDefault();
            App.trigger(this.model.get("triggerEvent"));
        },

        onRender: function(){
            if(this.model.selected){
                //this.$el.addClass("active");
                this.ui.link.addClass("active");
            };
        }
    });

    Tabs.TabsView = Marionette.CollectionView.extend({
        template: "#navigation-tabs",
        childView: Tabs.TabView,
        initialize: function () {
        },
    });
});

