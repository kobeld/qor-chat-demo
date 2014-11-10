App.module("ChatsApp.Private.Title", function (Title, App, Backbone, Marionette, $, _) {
    Title.TitleView = Marionette.ItemView.extend({
        template: "#private-chat-title",

        reRender: function (newModel) {
            this.model = newModel;
            this.render();
        }
    });
});
