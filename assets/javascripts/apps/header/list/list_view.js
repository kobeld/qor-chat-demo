App.module("HeaderApp.List", function (List, App, Backbone, Marionette, $, _) {

	// ItemView
	// User account item view
	List.UserAccountView = Marionette.ItemView.extend({
		tagName: "ul",
		className: "nav navbar-nav-custom pull-right",
		template: "#user-account",

		triggers: {
			"click a.js-logout": "user:logout",
			"click a.xmpp-settings": "user:xmpp",
			"click a.teams-settings": "user:teams",
		}
	});

	List.XmppSettingsView = Marionette.ItemView.extend({
		template: "#xmpp-settings"
	});

	List.TeamInfoView = Marionette.ItemView.extend({
		template: "#team-info",

		ui: {
			switchTeamBtn: ".js-switch-team"
		},

		events: {
			"click .js-switch-team": "onSwitchTeam"
		},

                onSwitchTeam: function(event){
                    var $Target = $(event.currentTarget);
                    var slug = $Target.data("team-slug");
                    // TODO maybe need to move to API request?
                    var url = App.options.HttpHost + "/teams/"+slug+"/switch";
                    $.ajax({
                            type: "POST",
                            url: url,
                            headers: App.getBearerHeader()
                    }).done(function (data) {
                            if (data.Errors) {
                                    alert("Validation Error");
                                    return
                            };

                            window.location.replace("/");

                    }).fail(function (data) {
                            alert("Internal Error");
                    });
                },
	});

	List.TeamsSettingsView = Marionette.CompositeView.extend({
		template: "#teams-settings",
		childView: this.TeamInfoView,
		childViewContainer: "#teams-info",
	});


});
