App.module("HeaderApp", function (HeaderApp, App, Backbone, Marionette, $, _) {

	var API = {
		listHeader: function () {
			HeaderApp.List.Controller.listHeader();
		}
	};

	App.commands.setHandler("cmd:header:show", function () {
		API.listHeader();
	});
});