$(function () {
	new LoginForm();
	new SignupForm();
});

var LoginForm = Marionette.ItemView.extend({
	el: "#form-login",

	events: {
		"click button[type=submit]": "login"
	},

	ui: {
		emailInput: "input[name=email]",
		passwordInput: "input[name=password]"
	},

	initialize: function () {
		// Bind the ui elements above.
		// The bindUIElements() will be called by default in render() method
		this.bindUIElements();
	},

	login: function (e) {
		e.preventDefault();

		var formData = {
			Email: this.ui.emailInput.val(),
			Password: this.ui.passwordInput.val()
		}

		$.ajax({
			type: "POST",
			url: "http://localhost:3000/login",
			data: formData

		}).done(function (data) {
			console.log(data);

			if (data.Errors) {
				alert("Validation Error");
				return
			};

			// Set the access token to the local storage.
			simpleStorage.set('token', data.access_token);
			window.location.replace("/");

		}).fail(function (data) {
			alert("Internal Error");
		});
	}

})

var SignupForm = Marionette.ItemView.extend({
	el: "#form-register",

	events: {
		"click button[type=submit]": "signup"
	},

	ui: {
		emailInput: "input[name=email]",
		nameInput: "input[name=name]",
		passwordInput: "input[name=password]",
		confirmInput: "input[name=confirmPassword]"
	},

	initialize: function () {
		// Bind the ui elements above.
		// The bindUIElements() will be called by default in render() method
		this.bindUIElements();
	},

	signup: function (e) {
		e.preventDefault();

		var formData = {
			Email: this.ui.emailInput.val(),
			Name: this.ui.nameInput.val(),
			Password: this.ui.passwordInput.val(),
			ConfirmPassword: this.ui.confirmInput.val()
		}

		$.ajax({
			type: "POST",
			url: "http://localhost:3000/signup",
			data: formData

		}).done(function (data) {
			if (data.Errors) {
				alert("Validation Error");
				return
			};

			// Set the access token to the local storage.
			simpleStorage.set('token', data.access_token);
			window.location.replace("/");

		}).fail(function (data) {
			alert("Internal Error");
		});
	}

});