App.module("HeaderApp", function (HeaderApp, App, Backbone, Marionette, $, _) {

	var API = {
		listHeader: function () {
			HeaderApp.List.Controller.listHeader();
		}
	};

	HeaderApp.on("before:start", function(options){
		API.listHeader();
	})
});
