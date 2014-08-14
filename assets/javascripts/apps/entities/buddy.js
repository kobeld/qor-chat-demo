App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// The chat buddy
	Entities.Buddy = Backbone.Model.extend({
	});

	Entities.Buddies = Backbone.Collection.extend({
		model: Entities.Buddy
	});

	var API = {
		getBuddies: function () {
			return new Entities.Buddies();
		}
	};

	App.reqres.setHandler("chat:buddies", function () {
		return API.getBuddies();
	});

});