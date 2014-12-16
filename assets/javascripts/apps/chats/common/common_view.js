App.module("ChatsApp.Common", function (Common, App, Backbone, Marionette, $, _) {

	Common.UserInfoView = Marionette.ItemView.extend({
		className: "sidebar-scroll",
		template: "#user-info-sidebar-view"
	});

})