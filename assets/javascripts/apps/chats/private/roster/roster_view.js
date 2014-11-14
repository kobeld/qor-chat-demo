App.module("ChatsApp.Private.Roster", function (Roster, App, Backbone, Marionette, $, _) {
    Roster.BuddyView = Marionette.ItemView.extend({
        template: "#private-chat-buddy",

        modelEvents: {
            "model:chosen": "onChosen",
            "model:unchosen": "onUnchosen",
            "unread_number:show": "showUnreadNumber",
        },

        events: {
            "click a": "choose"
        },

        ui: {
            alink: "a",
            indicator: "a i"
        },

        onChosen: function(model){
            console.log(model)
            this.ui.alink.addClass("active");
        },
        onUnchosen: function(){
            this.ui.alink.removeClass("active");
        },
        changeChosen: function (data) {
            this.ui.alink.toggleClass("active");
        },

        showUnreadNumber: function(n){
            if(n==0){n=""}
            this.ui.indicator.html(n)
        },

        choose: function (e) {
            e.preventDefault();
            this.model.choose();
            this.model.clearUnread();
        }
    });

    Roster.RosterView = Marionette.CompositeView.extend({
        template: "#private-chat-roster",
        childView: Roster.BuddyView,
        childViewContainer: ".list-group",

        showUnreadNumber:  function(){
        }
    });
});
