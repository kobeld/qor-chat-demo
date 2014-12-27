App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// The chat Message
	Entities.Message = Backbone.Model.extend({});

	Entities.Messages = Backbone.Collection.extend({
		model: Entities.Message,

		url: function () {
			var teamId = App.request("entity:cache:teamid");
			return App.options.HttpHost + "/teams/" + teamId + "/messages"
		}
	});

	var API = {
		getMessages: function (convId) {

			var defer = $.Deferred(),
				msgs = new Entities.Messages,
				response = msgs.fetch({
					data: {
						"convId": convId,
						"before": "",
						"limit": 10
					},
					headers: App.getBearerHeader(),
				});

			response.done(function () {
				defer.resolveWith(response, [msgs]);
			}).fail(function () {
				defer.rejectWith(response, arguments);
			});

			return defer.promise();
		}
	};

	App.reqres.setHandler("entity:messages", function (convId) {
		return API.getMessages(convId);
	});

});