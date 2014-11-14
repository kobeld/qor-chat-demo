App.module("ChatsApp.Private.Title", function (Title, App, Backbone, Marionette, $, _) {
    Title.TitleView = Marionette.ItemView.extend({
        template: "#private-chat-title",

        modelEvents: {
            "change:chosen": "changeChosen",
        },

        ui: {
            text: "h2",
        },

        changeChosen: function () {
            alert("TitleView: changeChosen")
            this.ui.text.html("hoo")
        },

        reRender: function (newModel) {
            this.model = newModel;
            this.render();
        }
    });
});
