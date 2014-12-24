App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// Cache the teamId here
	var _teamId = "";

	// Request to fetch the cached teamId.
	App.reqres.setHandler("entity:cache:teamid", function () {
		return _teamId;
	});

	// Command to set the cached teamId.
	App.commands.setHandler("entity:set:teamid", function (teamId) {
		_teamId = teamId;
	});

});