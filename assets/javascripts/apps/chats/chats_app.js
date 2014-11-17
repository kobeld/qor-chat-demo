App.module("ChatsApp", function (ChatsApp, App, Backbone, Marionette, $, _) {
    // TODO abit gawky, to be improved
    App.Topic = {},
    App.Topic.ROSTER = "roster",
    App.Topic.MESSAGES = "messages",

    App.DType = {},
    App.DType.ROSTER_ALL = "all",
    App.DType.ROSTER_ONLINE = "online",
    App.DType.ROSTER_OFFLINE = "offline",
    App.DType.MESSAGES_PRIVATE = "private",
    App.DType.MESSAGES_GROUP = "group",


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
            topic: App.Topic.ROSTER,
            dType: App.DType.ROSTER_ALL,
        });
    });


    App.addInitializer(function(){
        new ChatsApp.Router({
            controller: API
        });
    });
});
