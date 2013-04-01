ig.module(
	'game.entities.balloon'
)
.requires(
	'impact.entity'
)
.defines( function(){
	EntityBalloon = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/Laika/balloon.png', 40, 60),
		size: {x: 40, y: 60},
		maxVel: {x: 70, y: 45},

		init: function(x, y, settings){
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;

			ig.input.bind(ig.KEY.SPACE, 'drop');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		},

		update: function(){
			this.accel = {x: 0, y: 0};

			if(!ig.input.state('drop')){
				this.accel.y = -400;
			}

			if(ig.input.state('left')){
				this.accel.x += -200;
			}

			if(ig.input.state('right')){
				this.accel.x += 200;
			}

			if(!(ig.input.state('left')||ig.input.state('right'))){
				this.vel.x = this.vel.x * 0.9;
				console.log("xVel ="+this.vel.x);
			}

			this.parent();
		}
	});
});