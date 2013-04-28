ig.module(
	'game.entities.basicFloater'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityBasicFloater = ig.Entity.extend({
		size: {x: 20, y: 20},
		maxVel: {x: 0, y: 0},
		animSheet: new ig.AnimationSheet('media/Laika/colorBlock.png', 20, 20),

		flip: false,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function(x, y, settings){
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
		},

		update: function(){
			this.parent();
		},

		check: function(other){
			if(other instanceof EntityBalloon){
				other.receiveDamage(2, this);
				console.log("Floater damage dealt.");
			}
			this.kill();
		}

	});
});