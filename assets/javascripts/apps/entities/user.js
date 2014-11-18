App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// User Model
	Entities.User = Backbone.Model.extend({
		urlRoot: function () {
			return "http://localhost:3000/teams/" +  this.get("teamId") + "/users";
		}

	});

	// User Collection
	Entities.UserCollection = Backbone.Collection.extend({
		model: Entities.User,

		url: function () {
			return "http://localhost:3000/teams/" + this.teamId + "/users";
		}
	});

	// API functions
	var API = {

		getUserEntities: function (teamId) {
			var users = new Entities.UserCollection(),
				defer = $.Deferred();

			users.teamId = teamId;
			var response = users.fetch({
				// Oauth access token header
				headers: App.getBearerHeader(),
			});

			response.done(function () {
				defer.resolveWith(response, [users]);
			}).fail(function () {
				defer.rejectWith(response, arguments);
			});

			return defer.promise();
		}
	};

	App.reqres.setHandler("user:entities", function (teamId) {
		return API.getUserEntities(teamId);
	})
});