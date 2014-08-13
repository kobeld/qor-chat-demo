App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// MyAccount model
	Entities.MyAccount = Backbone.Model.extend({
		url: function () {
			return "http://localhost:3000/users/my-account";
		}
	});

	// API functions
	var API = {
		getMyAccountEntity: function () {
			var myAccount = new Entities.MyAccount(),
				defer = $.Deferred(),
				response = myAccount.fetch({
					// Oauth access token header
					headers: App.getBearerHeader(),
				});

			response.done(function () {
				defer.resolveWith(response, [myAccount]);
			}).fail(function () {
				defer.rejectWith(response, arguments);
			});

			return defer.promise();
		}
	};

	App.reqres.setHandler("user:myaccount:entity", function () {
		return API.getMyAccountEntity();
	});
})