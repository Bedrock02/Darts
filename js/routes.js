App.Router.map(function() {
	this.resource('/');
	this.resource('game');
});

App.GameRoute = Ember.Route.extend({
	model: function () {
		return game;
	}
});