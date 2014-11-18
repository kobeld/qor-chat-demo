App.module("RosterApp.Sidebar", function (Sidebar, App, Backbone, Marionette, $, _) {

	Sidebar.Controller = {
		showRoster: function (teamId) {
			var self = this,
				userEntities = App.request("entities:user", teamId);

			$.when(userEntities).done( function (users) {
				console.log(users);


			}).fail(function (response) {
				App.execute("cmd:response:handle", response);
			});
		}
	};

});