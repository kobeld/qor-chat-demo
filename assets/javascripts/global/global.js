App.module("Global", function (Global, App, Backbone, Marionette, $, _) {

	// Cached for current login user
	Global.MyAccount = "";

	// Helper function to tell if the user passing in is current MyAccount.
	Global.IsCurrentUser = function (userModel) {
		return Global.MyAccount.id === userModel.id
	}

});