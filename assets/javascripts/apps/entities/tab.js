App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {
    Entities.Tab = Backbone.Model.extend({
        initialize: function(){
            var selectable = new Backbone.Picky.Selectable(this);
            _.extend(this, selectable);

        }
    });

    Entities.TabCollection = Backbone.Collection.extend({
        model: Entities.Tab,

        initialize: function(){
            var singleSelect = new Backbone.Picky.SingleSelect(this);
            _.extend(this, singleSelect);
        }
    });

    var initializeTabs = function(){
        Entities.tabs = new Entities.TabCollection([
            {
                name: "Private Chat",
                icon: "gi-chat",
                url: "chats/private",
                triggerEvent: "chats:private",
            },
            {
                name: "Group Chat",
                icon: "gi-group",
                url: "chats/group",
                triggerEvent: "chats:group",
            },
            {
                name: "Chat History",
                icon: "gi-history",
                url: "chats/history",
                triggerEvent: "chats:history",
            },
        ]);
    };

    var API = {
        getTabs: function(){
            if(Entities.tabs === undefined){
                initializeTabs();
            }
            return Entities.tabs;
        }
    };

    App.reqres.setHandler("tabs:entities", function(){
        return API.getTabs();
    });
});


