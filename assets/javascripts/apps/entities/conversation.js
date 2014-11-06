App.module("Conversation", function (Entities, App, Backbone, Marionette, $, _) {

	// Conversation model
	Entities.Conversation = Backbone.Model.extend({
		url: function () {
			return App.ServerBaseURL + "/conversations/all";
		}
	});

	// API functions
	var API = {
		getConversationEntity: function () {
			var conv = new Entities.Conversation(),
				defer = $.Deferred(),
				response = conv.fetch({
					// Oauth access token header
					headers: App.getBearerHeader(),
				});

			response.done(function () {
				defer.resolveWith(response, [conv]);
			}).fail(function () {
				defer.rejectWith(response, arguments);
			});

			return defer.promise();
		}
	};

	App.reqres.setHandler("conversations:all:entity", function () {
		return API.getConversationEntity();
	});
})

