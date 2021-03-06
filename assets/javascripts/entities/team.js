App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {
	var _teams = null

	Entities.Team = Backbone.Model.extend({
		urlRoot: function () {
			return App.options.HttpHost + "/teams/";
		},

		switchTo: function () {
			var self = this,
				response = $.ajax({
					type: "POST",
					url: self.urlRoot() + self.get("slug") + "/switch",
					headers: App.getBearerHeader()
				});

			return response;
		}
	});

	Entities.TeamCollection = Backbone.Collection.extend({
		model: Entities.Team,

		url: function () {
			return App.options.HttpHost + "/teams/";
		},

		// Features from: backbone-collection-sorting.js
		sorting: {
			by: 'name',
			type: 'alpha'
		},
	});

	var API = {
		getTeamsEntity: function () {
			var defer = $.Deferred();

			// Return if it is already there
			if (_teams != null) {
				defer.resolve(_teams);
				return defer.promise();
			};

			_teams = new Entities.TeamCollection;
			var response = _teams.fetch({
				// Oauth access token header
				headers: App.getBearerHeader(),
			});

			response.done(function () {
				defer.resolveWith(response, [_teams]);
			}).fail(function () {
				defer.rejectWith(response, arguments);
			});

			return defer.promise();
		}
	};

	// Cache the teamId here
	var _teamId = "";

	// Request to fetch the cached teamId.
	App.reqres.setHandler("entity:cache:teamid", function () {
		return _teamId;
	});

	// Command to set the cached teamId.
	App.commands.setHandler("entity:set:teamid", function (teamId) {
		_teamId = teamId;
	});

	App.reqres.setHandler("entity:teams", function () {
		return API.getTeamsEntity();
	});

});