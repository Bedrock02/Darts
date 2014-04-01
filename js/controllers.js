
App.GameController = Ember.ObjectController.extend({
	editing : true,
	playWithLimit: true,
	editingName: false,

	actions:{
		addPoints: function(player,points){
			points = parseInt(points);
			if(Ember.typeOf(points) == "number" && points > 0){
				var index = game.players.indexOf(player);
				var newScore = parseInt(player.score) + parseInt(points)
				Ember.set(game.players[index],'score',newScore);
				
				if(this.playWithLimit){
					this.send('checkWinner',player);
				}
			}
		},

		addPlayer: function(player){
			object = {
				playerName : player,
				score : 0
			}
			this.set('numberOfPlayers',game.numberOfPlayers+1);
			if(game.numberOfPlayers >= 2){
				this.set('canAddPlayers',false);
			}
			game.players.addObject(object);
		},

		setLimit: function(points){
			this.set('limit',points);
			this.set('editing',false);
		},

		editLimit: function (){
			this.set('editing',true);
		},

		checkWinner: function(player){
			if(parseInt(game.limit) === player.score || player.score > parseInt(game.limit)){
				this.set('winner',player);
				this.set('editing',true);
				this.set('playWithLimit',true);
				this.transitionTo('winner');
			}
		},
		noLimit: function(){
			this.set('playWithLimit',false);
		},

		editName: function(){
			this.set('editingName',true);
		},

		doneEditingName: function(){
			this.set('editingName',false);
		}
	}
});

App.WinnerController = Ember.ObjectController.extend({
	
	actions:{
		newGame: function(){
			this.set('players',[]);
			this.set('canAddPlayers',true);
			this.set('limit',0);
			this.set('numberOfPlayers',0);
			this.set('winner',null);
			this.transitionTo('game');
		},
		restartGame: function(){
			for(var i =0; i < game.players.length; i++){
				Ember.set(game.players[i],'score',0);
			}
			this.set('winner',null);
			this.transitionTo('game');
		}
	}
});