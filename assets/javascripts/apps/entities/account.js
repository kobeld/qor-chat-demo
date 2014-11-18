App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// Caching current user's account
	var myAccount = null;

	// MyAccount model
	Entities.Account = Backbone.Model.extend({
		url: function () {
			return "http://localhost:3000/users/my-account";
		}
	});

	// API functions
	var API = {
		getMyAccountEntity: function () {

			var defer = $.Deferred();

			// Return if it is already there
			if (myAccount != null) {
				defer.resolve(myAccount);
				return defer.promise();
			};

			// Or fetch it from the API
			myAccount = new Entities.Account(),
				response = myAccount.fetch({
					// Oauth access token header
					headers: App.getBearerHeader(),
				});

			response.done(function () {
				defer.resolveWith(response, [myAccount]);
			}).fail(function () {
				myAccount = null;
				defer.rejectWith(response, arguments);
			});

			return defer.promise();
		}
	};

	App.reqres.setHandler("Entity:User:MyAccount", function () {
		return API.getMyAccountEntity();
	});
})