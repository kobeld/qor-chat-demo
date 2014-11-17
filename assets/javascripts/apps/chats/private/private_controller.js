App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {
    var _selectedUser = null;

    Private.Controller = {
        index: function(){
        },

        load: function () {
            var self = this,
                    privateChatLayout = new Private.ChatLayout(),
                    buddies = App.request("chat:buddies"),
                    messages = App.request("chat:messages"), // TODO fetch real history message with chosen buddy's id
                    titleView = new Private.Title.TitleView({
                    }),
                    inputView = new Private.Messages.InputView(),
                    rosterView = new Private.Roster.RosterView({
                            collection: buddies
                    });


            var messagesView = new Private.Messages.ChatMessagesView();



            inputView.on("form:submit", function (data) {
                if (data.content === "" || _selectedUser === null) {
                    alert("Please select a buddy on the right side to chat.")
                    return;
                };

                var msg = {
                    content: data.content,
                    toUserId: _selectedUser.get("id"),
                    fromUserId: App.MyAccount.get("id"),
                    fromUserAvatar: App.MyAccount.get("avatar")
                }

                messagesView.appendMsg(msg);

                App.execute("cmd:websocket:send", {
                    topic: App.Topic.MESSAGES,
                    dType: App.DType.MESSAGES_PRIVATE,
                    message: msg
                });
            });

            messagesView.on("show", function () {
                // Set the handler to deal with the messages
                App.vent.on("vent:websocket:messages", function (data) {
                    var msg = data.message;

                    if (data.dType === App.DType.ROSTER_ALL) {
                        // messages.reset(object);

                    } else if (data.dType === App.DType.MESSAGES_PRIVATE) {
                        if (_selectedUser == null) {
                            buddies.chooseById(msg.fromUserId);
                        }
                        if(_selectedUser.get("id") == msg.fromUserId) {
                            messagesView.appendMsg(msg);
                        }else{
                            // show unread if incomming messages is not active
                            var fromBuddy = buddies.findById(msg.fromUserId);
                            if(!!fromBuddy){
                                fromBuddy.setUnread();
                            }
                        }
                    } else if (data.dType === "composing") {
                        // TODO:
                    };
                });
            });

            rosterView.on("show", function(){
                if(buddies.length > 0){
                    buddies.chooseFirst();
                }
            });

            privateChatLayout.on("show", function () {
                    this.titleRegion.show(titleView);
                    this.inputRegion.show(inputView);
                    this.messagesRegion.show(messagesView);
                    this.rosterRegion.show(rosterView);

                    ReadyChat.init(); // TODO: should change this logic to each view.
            });

            privateChatLayout.listenTo(buddies, "collection:chose:one", function (chosen) {
                titleView.reRender(chosen);
                _selectedUser = chosen;
                var chatWithUserId = chosen.get("id");
                messagesView.loadRecent(chatWithUserId);
            });

            App.mainRegion.show(privateChatLayout);
        }
    };
});
