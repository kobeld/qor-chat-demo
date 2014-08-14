App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// The chat Message
	Entities.Message = Backbone.Model.extend({
	});

	Entities.Messages = Backbone.Collection.extend({
		model: Entities.Message
	});

	var API = {
		getMessages: function () {
			return new Entities.Messages();
		}
	};

	App.reqres.setHandler("chat:messages", function () {
		return API.getMessages();
	});

});