App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// User Model
	Entities.User = Backbone.Model.extend({

		initialize: function() {
			new Backbone.Chooser(this);
		},

		urlRoot: function () {
			return "http://localhost:3000/teams/" +  this.get("teamId") + "/users";
		},

		defaults: {
			isOnline: false
		}

	});

	// User Collection
	Entities.UserCollection = Backbone.Collection.extend({
		model: Entities.User,

		initialize: function() {
			new Backbone.MultiChooser(this);
		},

		url: function () {
			return "http://localhost:3000/teams/" + this.teamId + "/users";
		},

		setOnlineStatus: function(userId, isOnline) {
			var user = this.findWhere({id: userId});
			if (user) {
				user.set("isOnline", isOnline);
			};
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

	App.reqres.setHandler("entities:user", function (teamId) {
		return API.getUserEntities(teamId);
	})
});