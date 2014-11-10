App.module("ChatsApp.Private.Messages", function (Messages, App, Backbone, Marionette, $, _) {
    Messages.InputView = Marionette.ItemView.extend({
        template: "#private-chat-input",

        events: {
            "submit": "submit"
        },

        ui: {
            messageInput: "input[name=content]"
        },

        submit: function (e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
            this.cleanup();
        },

        cleanup: function () {
            this.ui.messageInput.val("");
        }
    })
});
