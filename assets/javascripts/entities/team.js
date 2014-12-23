App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// Cache the teamId here
	var _teamId = "";

	// Request to fetch the cached teamId.
	App.reqres.setHandler("entities:cache:teamid", function () {
		return _teamId;
	});

	// Command to set the cached teamId.
	App.commands.setHandler("entities:set:teamid", function (teamId) {
		_teamId = teamId;
	});

});