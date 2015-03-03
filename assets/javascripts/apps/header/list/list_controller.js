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

				var myTeams = App.request("entity:teams");
				$.when(myTeams).done(function (teams) {
					accountView.on("user:teams", function () {
						var teamsView = new List.TeamsSettingsView({
							collection: teams
						});

						teamsView.on("childview:team:switch", function (childview, args) {
							var team = args.model;
							team.switchTo().done(function(data){
								App.reload();
							}).fail(function(data){
								App.execute("cmd:response:handle", data);
							})
						});

						App.modalRegion.show(teamsView);
					});
				}).fail(function (response) {
					App.execute("cmd:response:handle", response);
				});

				App.headerRegion.show(accountView);

			}).fail(function (response) {
				App.execute("cmd:response:handle", response);
			});
		}
	};

});