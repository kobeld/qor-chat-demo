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

    Messages.ChatMessagesView = Marionette.CompositeView.extend({
        template: "#private-chat-messages",
        childView: Messages.ChatMessageView,
        childViewContainer: "ul",

        onShow: function(){
            $('#private-chat-more-messages').waypoint(function(direction) {
                // TODO
                console.log(direction);
            }, {
                onlyOnScroll: true,
                offset: '935%',
                context: '.chatui-talk-scroll',

            });
        },

        // NOTE maybe not a good idea to put fetching processing in view layer
        loadRecent: function(chatWithUserId){
            var self = this;

            // clear original showing messages
            self.destroyChildren();

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
                self._scrollToLatest();
            }).fail(function (response) {
                App.execute("cmd:response:handle", response);
            });
        },

        appendMsg: function(msg){
            this.options.collection.add(msg);
            this._scrollToLatest();
        },

        _scrollToLatest: function(){
            var scrollBar = $("#messages-region");
            scrollBar.scrollTop(scrollBar[0].scrollHeight)
            scrollBar.animate({
                scrollTop: scrollBar[0].scrollHeight
            });
        }
    });
});
