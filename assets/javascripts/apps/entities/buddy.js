App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	// The chat buddy
	Entities.Buddy = Backbone.Model.extend({
            initialize: function () {
                new Backbone.Chooser(this);
                this.unreadNumber = 0;
            },


            setUnread: function(){
                this.unreadNumber += 1;
                this.trigger("unread_number:show", this.unreadNumber);
            },

            clearUnread: function(){
                this.unreadNumber = 0;
                this.trigger("unread_number:show", this.unreadNumber);
            }

	});

	Entities.Buddies = Backbone.Collection.extend({
		model: Entities.Buddy,

		initialize: function () {
			new Backbone.SingleChooser(this);
		},

		findById: function (id) {
                    var buddy = this.findWhere({
                        id: id
                    });
                    return buddy;
                },

		chooseById: function (id) {
                    var buddy = this.findById(id);
                    if(buddy){
                        buddy.choose();
                    }
		},

		chooseFirst: function() {
			var buddy = this.first();
			if (buddy) {
				buddy.choose();
			}
		}
	});

	var API = {
		getBuddies: function () {
			return new Entities.Buddies();
		}
	};

	App.reqres.setHandler("chat:buddies", function () {
		return API.getBuddies();
	});

});
