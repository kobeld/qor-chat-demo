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

				accountView.on("user:xmpp", function () {
					var xmppView = new List.XmppSettingsView({
						model: myAccount
					});
					App.modalRegion.show(xmppView);
				});

				App.headerRegion.show(accountView);

			}).fail(function (response) {
				App.execute("cmd:response:handle", response);
			});
		}
	};

});