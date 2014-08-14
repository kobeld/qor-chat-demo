App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// The chat buddy
	Entities.Buddy = Backbone.Model.extend({
		initialize: function () {
			new Backbone.Chooser(this);
		}
	});

	Entities.Buddies = Backbone.Collection.extend({
		model: Entities.Buddy,

		initialize: function () {
			new Backbone.SingleChooser(this);
		}
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