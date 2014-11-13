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

            $.when(fetchingMessages).done(function(data) {
                // NOTE need to revser chats so it show as latest msgs are near the bottom
                var collection = data.collection;
                var models = collection.models.reverse()
                collection.models = models;
                self.constructor({
                    collection: collection,
                })

                self.render();
                self._scrollToLatest();
            }).fail(function (response) {
                if(response.status === 404){
                    var messages = App.request("chat:messages");
                    self.constructor({
                        collection: messages,
                    })
                    self.render();
                }else{
                    App.execute("cmd:response:handle", response);
                }
            });
        },

        appendMsg: function(msg){
            if(this.options && this.options.collection){
                this.options.collection.add(msg);
            }
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
