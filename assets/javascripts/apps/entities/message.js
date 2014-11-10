App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// The chat Message
	Entities.Message = Backbone.Model.extend({
	});

	Entities.Messages = Backbone.Collection.extend({
            model: Entities.Message,
            url: function(){
                return App.ServerBaseURL + "/messages/private";
            },
	});


        var API = {
            getEmptyMessages: function () {
                return new Entities.Messages();
            },

            getPrivateMessages: function (withUserId) {
                var msgs = new Entities.Messages(),
                    defer = $.Deferred(),
                    response = msgs.fetch({
                        data: {
                            withUserId: withUserId,
                        },
                        headers: App.getBearerHeader(),
                    });

                response.done(function (data) {
                    defer.resolveWith(response, msgs);
                }).fail(function () {
                    defer.rejectWith(response, arguments);
                });

                return defer.promise();
            }
        };

	App.reqres.setHandler("chat:messages", function (options) {
            if(options === undefined){
                return API.getEmptyMessages();
            }
            if(options.chatType == "private"){
                return API.getPrivateMessages(options.withUserId);
            }
	});

});
