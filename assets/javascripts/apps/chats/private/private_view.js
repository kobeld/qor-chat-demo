App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	Private.UserInfoView = Marionette.ItemView.extend({
		className: "sidebar-scroll",
		template: "#user-info-sidebar-view"
	});

});