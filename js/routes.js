App.Router.map(function() {
	this.resource('/');
	this.resource('game');
	this.resource('winner');
	this.resource('about');
});

App.GameRoute = Ember.Route.extend({
	model: function () {
		return game;
	}
});

App.WinnerRoute = Ember.Route.extend({
	model: function() {
		return game;
	}
});