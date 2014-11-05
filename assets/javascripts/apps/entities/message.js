App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// The chat Message
	Entities.Message = Backbone.Model.extend({
	});

	Entities.Messages = Backbone.Collection.extend({
            model: Entities.Message,
            url: function(){
                return App.ServerHost + "/messages/private";
            },
	});


        var API = {
            getMessages: function () {
                return new Entities.Messages();

                //var msgs = new Entities.Messages(),
                    //defer = $.Deferred(),
                    //response = msgs.fetch({
                        //headers: App.getBearerHeader(),
                    //});

                //response.done(function () {
                    //defer.resolveWith(response, msgs);
                //}).fail(function () {
                    //defer.rejectWith(response, arguments);
                //});

                //return defer.promise();
            }
        };

	App.reqres.setHandler("chat:messages", function () {
            return API.getMessages();
	});

});
