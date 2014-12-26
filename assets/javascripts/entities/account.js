App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// Caching current user's account
	// Be initialized on App start
	var _myAccount = null;

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
			if (_myAccount != null) {
				defer.resolve(_myAccount);
				return defer.promise();
			};

			// Or fetch it from the API
			_myAccount = new Entities.Account();
			var response = _myAccount.fetch({
				// Oauth access token header
				headers: App.getBearerHeader()
			});

			response.done(function () {
				defer.resolveWith(response, [_myAccount]);
			}).fail(function () {
				_myAccount = null;
				defer.rejectWith(response, arguments);
			});

			return defer.promise();
		}
	};

	App.reqres.setHandler("entity:user:myaccount", function () {
		return API.getMyAccountEntity();
	});

	App.reqres.setHandler("entity:cache:myaccount", function () {
		return _myAccount;
	});

	App.reqres.setHandler("entity:check:myaccount", function (model) {
		return _myAccount.id == model.id;
	});
})