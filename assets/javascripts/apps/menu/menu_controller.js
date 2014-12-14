App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	MenuApp.Controller = {
		list: function () {

			// TODO: Should open conversation later
			var menuDeferred = App.request("entity:menu");

			$.when(menuDeferred).done(function (menu) {
				var menuView = new MenuApp.MenuView({
					collection: menu
				});

				App.leftRegion.show(menuView);
			})
		}
	};

});