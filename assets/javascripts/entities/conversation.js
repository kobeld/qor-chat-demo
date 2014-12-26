App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// The Conversation (1 on 1 or GUC)
	Entities.Conversation = Backbone.Model.extend({
		initialize: function () {
			new Backbone.Chooser(this);
		},

		// Temp
		urlRoot: function () {
			var teamId = this.get("teamId") || App.request("entity:cache:teamid");
			return App.options.HttpHost + "/teams/" + teamId + "/conversations"
		},

		title: function () {
			var withUsers = this.get("withUsers"),
				title = "No Users"

			if (withUsers.length == 1) {
				title = withUsers[0].get("name");
			} else if (withUsers.length > 1) {
				title = "Meeting (" + (withUsers.length + 1) + " people)";
			};

			return title;
		},

		isGroupChat: function () {
			return (this.get("withUsers").length > 1);
		},

		deactivate: function () {
			var teamId = this.get("teamId") || App.request("entity:cache:teamid"),
				url = App.options.HttpHost + "/teams/" + teamId + "/conversations/" +
					this.id + "/deactivate";

			$.ajax({
				type: "PUT",
				url: url,
				headers: App.getBearerHeader()
			})
		},

		// Used to set necessary fields like withUsers
		setup: function () {
			var withUserIds = _.reject(this.get("participantIds"), function (userId) {
				return userId == App.request("entity:cache:myaccount").id;
			});

			var withUserCollection = App.request("entity:cache:users", withUserIds);
			this.set("withUsers", withUserCollection.models);
		}
	});

	Entities.Conversations = Backbone.Collection.extend({
		model: Entities.Conversation,

		initialize: function () {
			new Backbone.SingleChooser(this);
		},

		url: function () {
			var teamId = App.request("entity:cache:teamid");
			return App.options.HttpHost + "/teams/" + teamId + "/conversations";
		}
	});

	var API = {
		getConversations: function () {

			var defer = $.Deferred(),
				convs = new Entities.Conversations(),
				response = convs.fetch({
					headers: App.getBearerHeader(),
				});

			response.done(function () {
				convs.forEach(function (conv) {
					conv.setup();
				});
				defer.resolveWith(response, [convs])
			}).fail(function () {
				defer.rejectWith(response, arguments);
			});

			return defer.promise();
		},

		getConversation: function (id) {
			var defer = $.Deferred(),
				conv = new Entities.Conversation({
					id: id
				});

			var response = conv.fetch({
				// Oauth access token header
				headers: App.getBearerHeader(),
			});

			response.done(function () {
				conv.setup();
				defer.resolveWith(response, [conv]);
			}).fail(function () {
				defer.rejectWith(response, arguments);
			});
			return defer.promise();
		}
	};

	App.reqres.setHandler("entity:conversations", function () {
		return API.getConversations();
	});

	App.reqres.setHandler("entity:conversation", function (id) {
		return API.getConversation(id);
	});

});