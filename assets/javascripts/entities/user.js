App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// Caching the user collection
	// Be initialized on App start
	var _users = null;

	// User Model
	Entities.User = Backbone.Model.extend({

		initialize: function () {
			new Backbone.Chooser(this);
		},

		urlRoot: function () {
			var teamId = App.request("entity:cache:teamid");
			return  App.options.HttpHost + "/teams/" + teamId + "/users";
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
			var teamId = App.request("entity:cache:teamid");
			return App.options.HttpHost + "/teams/" + teamId + "/users";
		},

		// Features from: backbone-collection-sorting.js
		sorting: {
			by: 'name',
			type: 'alpha'
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

		getUsersEntity: function () {

			var defer = $.Deferred();

			// Return if it is already there
			if (_users != null) {
				defer.resolve(_users);
				return defer.promise();
			};

			_users = new Entities.UserCollection;
			var response = _users.fetch({
				// Oauth access token header
				headers: App.getBearerHeader(),
			});

			response.done(function () {

				// Subscripe to the roster events of websocket
				App.vent.on("vent:websocket:roster", function (data) {

					var object = data.object;
					if (data.dType === "all") {
						_.each(data.object, function (onlineUser) {
							_users.setOnlineStatus(onlineUser.id, true);
						});
					} else {
						_users.setOnlineStatus(object.id, (data.dType === "online"));
					}
				});

				defer.resolveWith(response, [_users]);
			}).fail(function () {
				defer.rejectWith(response, arguments);
			});

			return defer.promise();
		}
	};

	App.reqres.setHandler("entity:users", function () {
		return API.getUsersEntity();
	});

	App.reqres.setHandler("entity:cache:users", function (userIds) {

		if (userIds) {
			var selectedUsers = new Entities.UserCollection;
			_.each(userIds, function (userId) {
				var user = _users.findWhere({
					id: userId
				});

				if (user) {
					selectedUsers.add(user)
				};
			});
			return selectedUsers;

		} else {
			return _users;
		}
	})

});