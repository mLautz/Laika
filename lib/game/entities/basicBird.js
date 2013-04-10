ig.module(
	'game.entities.basicBird'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityBasicBird = ig.Entity.extend({
		size: {x: 30, y: 15},
		maxVel: {x: 100, y: 0},
		animSheet: new ig.AnimationSheet('media/Laika/colorBlock.png', 30, 15),

		flip: false,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function(x, y, settings){
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
			this.maxVel.x = 90 + Math.random() * 40;
			this.vel.x = this.maxVel.x;
		},

		update: function(){
			var xdir = this.flip ? -1 : 1;
			this.vel.x = this.maxVel.x * xdir;

			this.parent();
		},

		handleMovementTrace: function(res){
			this.parent(res);
			//collision with a wall? turn back!
			if(res.collision.x){
				this.flip = !this.flip;
			}
		},

		check: function(other){
			if(other instanceof EntityBalloon){
				other.receiveDamage(10, this);
			}
			console.log("Bird collision detected.");
		}

	});
});