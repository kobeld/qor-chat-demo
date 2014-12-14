App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	MenuApp.Controller = {
		list: function (teamId, convId) {

			// TODO: Should open conversation later
			var menuDeferred = App.request("entity:menu");

			$.when(menuDeferred).done(function (menu) {
				var menuView = new MenuApp.MenuView({
					collection: menu
				});

				MenuApp.listenTo(menu, "collection:chose:one", function (chosen) {
					App.execute("cmd:lobby:show", teamId)
				});

				App.leftRegion.show(menuView);
				menu.chooseByConvId(convId);
			})
		}
	};

});