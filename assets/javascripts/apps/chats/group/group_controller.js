App.module("ChatsApp.Group", function (Group, App, Backbone, Marionette, $, _) {
    Group.Controller = {
        load: function(){
            var groupChatLayout = new Group.ChatLayout();
            groupChatLayout.on("show", function () {
                    //this.titleRegion.show(titleView);
                    //this.rosterRegion.show(rosterView);
                    //this.inputRegion.show(inputView);
                    //this.messagesRegion.show(messagesView);

                    //ReadyChat.init(); // TODO: should change this logic to each view.
            });
            App.mainRegion.show(groupChatLayout);
        },
    };
});

