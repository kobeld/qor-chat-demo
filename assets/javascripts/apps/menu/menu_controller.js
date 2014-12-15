App.module("MenuApp", function (MenuApp, App, Backbone, Marionette, $, _) {

	var _menu = [];

	MenuApp.Controller = {
		list: function (teamId, convId) {

			// TODO: Should open conversation later
			var menuDeferred = App.request("entity:menu");

			$.when(menuDeferred).done(function (menu) {
				_menu = menu
				var menuView = new MenuApp.MenuView({
					collection: _menu
				});

				MenuApp.listenTo(_menu, "collection:chose:one", function (chosen) {
					// Show lobby if it is not conversation
					if (chosen.get("conv")) {
						App.execute("cmd:chats:private:conv", chosen.get("conv"));
					} else {
						App.execute("cmd:lobby:show", teamId);
					}
				});

				App.leftRegion.show(menuView);
				_menu.chooseByConvId(convId);
			})
		},

		activeOrAdd: function (conv) {
			var menuItem = _menu.findWhere({
				id: conv.id
			});
			if (!menuItem) {
				menuItem = new App.Entities.MenuItem({
					id: conv.get("id"),
					title: conv.get("withUser").get("name"),
					conv: conv
				})
				_menu.push(menuItem);
			};
			menuItem.choose();
		}
	};

});