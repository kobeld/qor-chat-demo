App.module("ChatsApp.Private.Messages", function (Messages, App, Backbone, Marionette, $, _) {
    Messages.ChatMessageView = Marionette.ItemView.extend({
        tagName: "li",
        className: "chatui-talk-msg",
        template: "#private-chat-message",

        onBeforeRender: function () {
            if (this.model.get("fromUserId") === App.MyAccount.get("id")) {
                this.$el.addClass("chatui-talk-msg-highlight themed-border");
            };
        }
    });

    Messages.ChatMessagesView = Marionette.CollectionView.extend({
        tagName: "ul",
        template: "#private-chat-messages",
        childView: Messages.ChatMessageView,

        // NOTE maybe not a good idea to put fetching processing in view layer
        loadRecent: function(chatWithUserId){
            var self = this;
            // Request recent conversation vai http api
            var fetchingMessages = App.request("chat:messages", {
                chatType: "private",
                withUserId: chatWithUserId,
            });

            $.when(fetchingMessages).done(function(msgsCollection) {
                self.constructor({
                    collection: msgsCollection.collection,
                })
                self.render();
            }).fail(function (response) {
                App.execute("cmd:response:handle", response);
            });
        },

        appendMsg: function(msg){
            this.options.collection.add(msg);

            // scroll to latest message just sent or received
            var scrollBar = $("#messages-region");
            scrollBar.animate({
                scrollTop: scrollBar[0].scrollHeight
            });
        },
    });
});
