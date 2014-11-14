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
                        //this._reChoose();
		},

                _reChoose: function(){
		    this.chooser = new Backbone.SingleChooser(this);
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
                        // NOTE it's a bit tricky here because the buddy is not re new every time
                        // when Private.Controller.load executed.
                        // we store buddies for the sake of saving ws roster fetching times
                        // in the current desing ws connection and ws roster fetching happen once
                        // only when page refreshing
                        if(buddy.isChosen()){
                            buddy.unchoose();
                            buddy.choose();
                        }else{
                            buddy.choose();
                        }
                    }
		}
	});

        var initializeBuddies = function(){
            Entities.buddies = new Entities.Buddies();
        };

	var API = {
		getBuddies: function () {
                    if(Entities.buddies === undefined){
                        initializeBuddies();
                    }
                    return Entities.buddies;
		}
	};

        App.vent.on("vent:websocket:roster", function (data) {
            var object = data.object;
            if (data.dType === "all") {
                Entities.buddies.reset(object);
                Entities.buddies.chooseFirst();
            } else if (data.dType === "online") {
                Entities.buddies.add(object);

            } else if (data.dType === "offline") {
                Entities.buddies.remove(object)

            };
        });

	App.reqres.setHandler("chat:buddies", function () {
		return API.getBuddies();
	});

});
