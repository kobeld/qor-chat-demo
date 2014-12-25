App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	Entities.MenuItem = Backbone.Model.extend({
		initialize: function () {
			new Backbone.Chooser(this);
		},

		defaults: {
			title: "",
			conv: "",
			unreadCount: 0
		}
	});

	Entities.Menu = Backbone.Collection.extend({
		model: Entities.MenuItem,

		initialize: function () {
			new Backbone.SingleChooser(this);
		},

		chooseByConvId: function (convId) {

			if (convId == "") {
				// Choose the Lobby Menu
				this.first().choose();

			} else {
				var self = this,
					menuItem = this.findWhere({
						id: convId
					});

				if (menuItem) {
					// Found the item in the cache
					menuItem.choose();

				} else {
					// Not found, fetch the conv and make the menuItem
					var convEntity = App.request("entity:conversation", convId);
					$.when(convEntity).done(function (conv) {
						menuItem = API.newConvMenuItem(conv);
						self.push(menuItem);
						if (menuItem) {
							menuItem.choose();
						}
					}).fail(function (response) {
						App.execute("cmd:response:handle", response);
					});
				}
			};
		},

		removeConvMenu: function (menuItem) {
			// Deactivate Conversation here
			var conv = menuItem.get("conv");
			if (conv) {
				conv.deactivate();
			};

			this.remove(menuItem);
			var lobbyMenu = this.first();
			lobbyMenu.choose();
		},

		addConvMenuItems: function (convs) {
			var self = this;
			convs.forEach(function (conv) {
				menuItem = API.newConvMenuItem(conv);
				self.push(menuItem);
			});
		}

	});

	var API = {
		getMenu: function () {
			var defer = $.Deferred(),
				activedConvsDefer = App.request("entity:conversations"),
				menu = new Entities.Menu([{
					title: "Lobby"
				}]);

			// Fetch Active Conversation
			$.when(activedConvsDefer).done(function (convs) {
				menu.addConvMenuItems(convs);
				defer.resolve(menu);
			}).fail(function (response) {
				defer.rejectWith(response, arguments);
			});

			return defer.promise();
		},

		newConvMenuItem: function (conv) {
			return new Entities.MenuItem({
				id: conv.id,
				title: conv.title(),
				conv: conv
			});
		}
	};

	App.reqres.setHandler("entity:menu", function () {
		return API.getMenu();
	});

	App.reqres.setHandler("entity:menuItem:new", function (conv) {
		return API.newConvMenuItem(conv);
	});

})