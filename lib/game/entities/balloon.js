ig.module(
	'game.entities.balloon'
)
.requires(
	'impact.entity'
)
.defines( function(){
	EntityBalloon = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/Laika/balloon.png', 92, 132),
		size: {x: 92, y: 92},
		maxVel: {x: 190, y: 90},

		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function(x, y, settings){
			this.parent(x, y, settings);

			this.addAnim('idle', 0.3, [0,1,2]);
			this.currentAnim = this.anims.idle;

			ig.input.bind(ig.KEY.SPACE, 'lift');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		},

		update: function(){
			this.accel = {x: 0, y: 0};

			if(ig.input.state('lift')){
				this.maxVel.y = 180;
				this.accel.y = -600;
			}else{
				this.maxVel.y = 100;
				this.accel.y = -200;
			}

			if(ig.input.state('left')){
				this.accel.x += -250;
			}

			if(ig.input.state('right')){
				this.accel.x += 250;
			}

			if(!(ig.input.state('left')||ig.input.state('right'))){
				this.vel.x = this.vel.x * 0.9;
			}

			this.parent();
		},

		handleMovementTrace: function(res){
			if(ig.game.distanceGenerated < 16800){
				this.parent(res);
			}
		},

		//disable damage for testing
		// receiveDamage: function(other, amount){

		// }
	});
});