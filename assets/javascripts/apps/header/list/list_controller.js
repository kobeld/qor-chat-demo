App.module("HeaderApp.List", function (List, App, Backbone, Marionette, $, _) {

	// TODO: Not good to store myAccount info here
	App.MyAccount = null;

	List.Controller = {
		listHeader: function () {
			var self = this,
				fetchingMyAccount = App.request("entity:user:myaccount");

			$.when(fetchingMyAccount).done(function (myAccount) {
				// Execute command to build the websocket connection
				App.execute("cmd:websocket:connect", myAccount);

				var accountView = new List.UserAccountView({
					model: myAccount
				});

				accountView.on("user:logout", function () {
					App.logout();
				});

				App.headerRegion.show(accountView);
				App.MyAccount = myAccount;

			}).fail(function (response) {
				App.execute("cmd:response:handle", response);
			});
		}
	};

});