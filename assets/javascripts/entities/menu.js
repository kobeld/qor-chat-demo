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
			var self = this,
				menuItem = this.first();

			if (convId != "") {
				menuItem = this.findWhere({
					id: convId
				});

				if (!menuItem) {
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
				};
			};
		},

		removeConvMenu: function (menuItem) {
			this.remove(menuItem);
			var lobbyMenu = this.first();
			lobbyMenu.choose();
		}

	});

	var API = {
		getMenu: function () {
			var defer = $.Deferred(),
				activedConvsDefer = App.request("entity:conversations"),
				menu = new Entities.Menu([{
					title: "Lobby"
				}]);

			// TODO: Get Active Conversation here
			$.when(activedConvsDefer).then(function (convs) {
				_.each(convs, function (convItem) {
					menu.add([{
						id: convItem.get("id"),
						title: "Chat",
						conv: convItem
					}]);
				});

				defer.resolve(menu);
			})

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