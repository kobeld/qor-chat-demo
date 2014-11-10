App.module("ChatsApp.Private.Roster", function (Roster, App, Backbone, Marionette, $, _) {
    Roster.BuddyView = Marionette.ItemView.extend({
        template: "#private-chat-buddy",

        modelEvents: {
            "change:chosen": "changeChosen",
        },

        events: {
            "click a": "choose"
        },

        ui: {
            alink: "a"
        },

        changeChosen: function () {
            this.ui.alink.toggleClass("active");
        },

        choose: function (e) {
            e.preventDefault();
            this.model.choose();
        }
    });

    Roster.RosterView = Marionette.CompositeView.extend({
        template: "#private-chat-roster",
        childView: Roster.BuddyView,
        childViewContainer: ".list-group"
    });
});
