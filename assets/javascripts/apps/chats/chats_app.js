App.module("ChatsApp", function (ChatsApp, App, Backbone, Marionette, $, _) {
    ChatsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "chats/private": "privateChats",
            "chats/group": "groupChats",
            "chats/history": "historyConversations",
        }
    });


    var API = {
        privateChats: function(){
            //alert("hi");
            ChatsApp.Private.Controller.index();
        },

        groupChats: function(){
        },

        historyConversations: function(){
        },

        loadPrivateChat: function() {
            ChatsApp.Private.Controller.load();
        }
    };

    App.vent.on("vent:websocket:open", function () {
        API.loadPrivateChat();
    });

    App.on("chats:private", function(){
        App.navigate("chats/private");
        API.privateChats();
    });

    App.addInitializer(function(){
        new ChatsApp.Router({
            controller: API
        });
    });

});
