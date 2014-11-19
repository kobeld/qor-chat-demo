App.module("HeaderApp.List", function (List, App, Backbone, Marionette, $, _) {

	List.Controller = {
		listHeader: function () {
			var self = this,
				fetchingMyAccount = App.request("entity:user:myaccount");

			$.when(fetchingMyAccount).done(function (myAccount) {

				var accountView = new List.UserAccountView({
					model: myAccount
				});

				accountView.on("user:logout", function () {
					App.logout();
				});

				App.headerRegion.show(accountView);

			}).fail(function (response) {
				App.execute("cmd:response:handle", response);
			});
		}
	};

});