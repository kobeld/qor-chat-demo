App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// The Conversation (1 on 1 or GUC)
	Entities.Conversation = Backbone.Model.extend({
		initialize: function () {
			new Backbone.Chooser(this);
		}
	});

	Entities.Conversations = Backbone.Collection.extend({
		model: Entities.Conversation,

		initialize: function () {
			new Backbone.SingleChooser(this);
		}
	});

	var API = {
		getConversations: function () {

			var defer = $.Deferred(),
				convs = new Entities.Conversations();

			// Temp
			setTimeout(function(){
				defer.resolveWith(response, [convs]);
			}, 1000);

			return defer.promise();
		}
	};

	App.reqres.setHandler("entity:conversations", function () {
		return API.getConversations();
	});

});