App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// The Conversation (1 on 1 or GUC)
	Entities.Conversation = Backbone.Model.extend({
		initialize: function () {
			new Backbone.Chooser(this);
		},

		// Temp
		urlRoot: function () {
			return "http://localhost:3000/teams/" + this.get("teamId") + "/conversations"
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
		}
	});

	Entities.Conversations = Backbone.Collection.extend({
		model: Entities.Conversation,

		initialize: function () {
			new Backbone.SingleChooser(this);
		},

		url: function () {
			var teamId = App.request("entity:cache:teamid");
			return "http://localhost:3000" + teamId + "/conversations";
		}
	});

	var API = {
		getConversations: function () {

			var defer = $.Deferred(),
				convs = new Entities.Conversations();

			// Temp
			setTimeout(function () {
				defer.resolveWith(convs);
			}, 200);

			return defer.promise();
		}
	};

	App.reqres.setHandler("entity:conversations", function () {
		return API.getConversations();
	});

});