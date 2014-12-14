App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	Entities.MenuItem = Backbone.Model.extend({
		initialize: function () {
			new Backbone.Chooser(this);
		},

		defaults: {
			title: "",
			conv: ""
		}
	});

	Entities.Menu = Backbone.Collection.extend({
		model: Entities.MenuItem,

		initialize: function () {
			new Backbone.SingleChooser(this);
		}
	});

	var API = {
		getMenu: function () {
			var defer = $.Deferred(),
				activedConvsDefer = App.request("entity:conversations"),
				menu = new Entities.Menu([{
					title: "Lobby"
				}]);

			$.when(activedConvsDefer).then(function (convs) {
				_.each(convs, function (convItem) {
					menu.add([{
						title: "Chat",
						conv: convItem
					}]);
				})
				defer.resolve(menu)
			})

			return defer.promise();
		}
	};

	App.reqres.setHandler("entity:menu", function () {
		return API.getMenu();
	});

})