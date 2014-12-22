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

				// Listen to the close conversation event
				menuView.on("childview:close:convMenu", function (childView, args) {
					var conv = args.model.get("conv");
					// TODO: Sync to close the conversation
					_menu.removeConvMenu(args.model);

					// Remove the cached chat view
					App.execute("cmd:chats:close", conv);
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
					title: conv.title(),
					conv: conv
				})
				_menu.push(menuItem);
			};

			menuItem.choose();
		},

		updateUnreadCount: function (data) {
			var msg = data.message;
			var menuItem = _menu.findWhere({
				id: msg.convId
			});

			if (menuItem && !menuItem.isChosen()) {
				var unreadCount = menuItem.get("unreadCount") + 1;
				menuItem.set("unreadCount", unreadCount);
			};
		},
	};

});