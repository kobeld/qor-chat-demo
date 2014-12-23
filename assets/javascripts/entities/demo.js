App.module("Entities", function (Entities, App, Backbone, Marionette, $, _) {

	Entities.DemoUser = new Entities.User({
		id: "5469a9c263ed2e0df1010102",
		name: "Anan",
		email: "anan@duoerl.com",
		teamId: "5469a9c263ed2e0df1000002",
		teamIds: ["5469a9c263ed2e0df1000002"]
	});

	Entities.DemoPrivateConv = new Entities.Conversation({
		id: "5469a9c263ed2e0df1000102",
		teamId: "5469a9c263ed2e0df1000002",
		withUsers: [Entities.DemoUser]
	});

	Entities.DemoMenuItem = new Entities.MenuItem({
		id: Entities.DemoPrivateConv.id,
		title: Entities.DemoUser.get("name"),
		conv: Entities.DemoPrivateConv
	});
});