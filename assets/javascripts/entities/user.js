App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// User Model
	Entities.User = Backbone.Model.extend({

		initialize: function () {
			new Backbone.Chooser(this);
		},

		urlRoot: function () {
			var teamId = App.request("entities:cache:teamid");
			return "http://localhost:3000/teams/" + teamId + "/users";
		},

		defaults: {
			isOnline: false
		}

	});

	// User Collection
	Entities.UserCollection = Backbone.Collection.extend({
		model: Entities.User,

		initialize: function () {
			new Backbone.MultiChooser(this);
		},

		url: function () {
			var teamId = App.request("entities:cache:teamid");
			return "http://localhost:3000/teams/" + teamId + "/users";
		},

		setOnlineStatus: function (userId, isOnline) {
			var user = this.findWhere({
				id: userId
			});
			if (user) {
				user.set("isOnline", isOnline);
			};
		}
	});

	// API functions
	var API = {

		getUserEntities: function () {
			var users = new Entities.UserCollection(),
				defer = $.Deferred();

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

	App.reqres.setHandler("entities:user", function () {
		return API.getUserEntities();
	})
});