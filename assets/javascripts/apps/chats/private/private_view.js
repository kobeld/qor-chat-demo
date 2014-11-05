App.module("ChatsApp.Private", function (Private, App, Backbone, Marionette, $, _) {

	Private.ChatLayout = Marionette.LayoutView.extend({
		className: "block",
		template: "#private-chat-layout",

		regions: {
			titleRegion: "#title-region",
			rosterRegion: "#roster-region",
			messagesRegion: "#messages-region",
			inputRegion: "#input-region"
		}
	});

	Private.ChatTitleView = Marionette.ItemView.extend({
		template: "#private-chat-title",

		reRender: function (newModel) {
			this.model = newModel;
			this.render();
		}
	});

	Private.ChatBuddyView = Marionette.ItemView.extend({
		template: "#private-chat-buddy",

		modelEvents: {
			"change:chosen": "changeChosen",
		},

		events: {
			"click a": "choose"
		},

		ui: {
			alink: "a"
		},

		changeChosen: function () {
			this.ui.alink.toggleClass("active");
		},

		choose: function (e) {
			e.preventDefault();
			this.model.choose();
		}
	});

	Private.ChatRosterView = Marionette.CompositeView.extend({
		template: "#private-chat-roster",
		childView: Private.ChatBuddyView,
		childViewContainer: ".list-group"
	});

	Private.ChatMessageView = Marionette.ItemView.extend({
		tagName: "li",
		className: "chatui-talk-msg",
		template: "#private-chat-message",

		onBeforeRender: function () {
			if (this.model.get("fromUserId") === App.MyAccount.get("id")) {
				this.$el.addClass("chatui-talk-msg-highlight themed-border");
			};
		}
	});

	Private.ChatMessagesView = Marionette.CollectionView.extend({
		tagName: "ul",
		template: "#private-chat-messages",
		childView: Private.ChatMessageView,

                reRender: function(messages){
                    this.collection = messages;
		    this.render();
                }
	});

	Private.ChatInputView = Marionette.ItemView.extend({
		template: "#private-chat-input",

		events: {
			"submit": "submit"
		},

		ui: {
			messageInput: "input[name=content]"
		},

		submit: function (e) {
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("form:submit", data);
			this.cleanup();
		},

		cleanup: function () {
			this.ui.messageInput.val("");
		}
	})

});
