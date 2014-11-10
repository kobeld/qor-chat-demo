App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {
    Private.ChatLayout = Marionette.LayoutView.extend({
        className: "block",
        template: "#private-chat-layout",

        regions: {
            titleRegion: "#title-region",
            rosterRegion: "#roster-region",
            messagesRegion: "#messages-region",
            inputRegion: "#input-region"
        }
    });
});
