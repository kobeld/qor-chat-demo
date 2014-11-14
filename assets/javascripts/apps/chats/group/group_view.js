App.module("ChatsApp.Group", function (Group, App, Backbone, Marionette, $, _) {
    Group.ChatLayout = Marionette.LayoutView.extend({
        className: "block",
        template: "#group-chat-layout",

        regions: {
            //titleRegion: "#title-region",
            //rosterRegion: "#roster-region",
            //messagesRegion: "#messages-region",
            //inputRegion: "#input-region"
        }
    });
});

