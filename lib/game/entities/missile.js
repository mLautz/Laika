ig.module(
	'game.entities.missile'
)
.requires(
	'impact.entity'
)
.defines( function(){
	EntityMissile = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/Laika/balloon.png', 40, 60),
		size: {x: 40, y: 60},
		maxVel: {x: 90, y: 90},
		damageDealt: false,

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function(x, y, settings){
			this.parent(x, y, settings);
		},

		update: function(){
			this.parent();
		},

		check: function(other){
			if(other instanceof EntityBalloon && !this.damageDealt){
				other.receiveDamage(10, this);
				console.log("Missile damage dealt.");
			}
			this.damageDealt = true;
		}
	});
});