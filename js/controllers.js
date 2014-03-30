App.ActionController = Ember.ObjectController.extend({
	behavior: true,

	actions:{
		notify: function() {
			alert("I am notifying you");
		}
	}
});

App.GameController = Ember.ObjectController.extend({
	editing : true,
	canAddPlayers: true,

	actions:{
		addPoints: function(player,points){
			points = parseInt(points);
			if(Ember.typeOf(points) == "number" && points > 0){
				var index = game.players.indexOf(player);
				var newScore = parseInt(player.score) + parseInt(points)
				Ember.set(game.players[index],'score',newScore);
				this.send('checkWinner',player);
			}
		},

		addPlayer: function(player){
			object = {
				playerName : player,
				score : 0
			}
			this.set('numberOfPlayers',game.numberOfPlayers+1);
			if(game.numberOfPlayers == 2){
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
				alert(player.playerName+'Won!');
			}
		}
	}
});
