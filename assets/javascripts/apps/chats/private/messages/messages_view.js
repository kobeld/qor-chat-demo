App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {
    Private.ChatMessageView = Marionette.ItemView.extend({
        tagName: "li",
        className: "chatui-talk-msg",
        template: "#private-chat-message",

        onBeforeRender: function () {
            if (this.model.get("fromUserId") === App.MyAccount.get("id")) {
                this.$el.addClass("chatui-talk-msg-highlight themed-border");
            };
        }
    });

    Private.ChatMessagesView = Marionette.CollectionView.extend({
        tagName: "ul",
        template: "#private-chat-messages",
        childView: Private.ChatMessageView,

        // NOTE maybe not a good idea to put fetching processing in view layer
        loadRecent: function(chatWithUserId){
            var self = this;
            //this.collection = messages;
            //this.render();

            // Request recent conversation vai http api
            var fetchingMessages = App.request("chat:messages", {
                chatType: "private",
                withUserId: chatWithUserId,
            });

            $.when(fetchingMessages).done(function(msgsCollection) {

                console.log(msgsCollection)
                debugger
                self.collection = msgsCollection.collection;
                self.render();
                // Execute command to build the websocket connection
                //messagesView.reRender(msgs);
            }).fail(function (response) {
                App.execute("cmd:response:handle", response);
            });
        }
    });
});
