App.module("ChatsApp", function (ChatsApp, App, Backbone, Marionette, $, _) {
    ChatsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "chats/private": "privateChats",
            "chats/group": "groupChats",
            "chats/history": "historyChats",
        }
    });

    var API = {
        privateChats: function(){
            ChatsApp.Private.Controller.load();

            App.navigate("chats/private");
            App.execute("set:active:tab", "chats/private");
        },

        groupChats: function(){
            ChatsApp.Group.Controller.load();

            App.navigate("chats/group");
            App.execute("set:active:tab", "chats/group");
        },

        historyChats: function(){
            ChatsApp.History.Controller.load();

            App.navigate("chats/history");
            App.execute("set:active:tab", "chats/history");
        },

        loadPrivateChat: function() {
            ChatsApp.Private.Controller.load();
        }
    };



    App.on("chats:private", function(){
        API.privateChats();
    });
    App.on("chats:group", function(){
        API.groupChats();
    });
    App.on("chats:history", function(){
        API.groupChats();
    });


    App.vent.on("vent:websocket:open", function () {
        // Request roster via websocket
        App.execute("cmd:websocket:send", {
            topic: "roster",
            dType: "all",
        });
    });


    App.addInitializer(function(){
        new ChatsApp.Router({
            controller: API
        });
    });
});
