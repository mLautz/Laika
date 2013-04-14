ig.module(
	'game.entities.satellite'
)
.requires(
	'impact.entity'
)
.defines( function(){
	EntitySatellite = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/Laika/colorBlock.png', 50, 30),
		size: {x: 50, y: 30},
		maxVel: {x: 100, y: 90},
		delayTimer: null,
		moveDelay: 0.5,
		moving: false,
		damageDealt: false,

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function(x, y, settings){
			this.parent(x, y, settings);

			//this.delayTimer = new ig.Timer();
			//choose side
			this.pos.x = (((Math.random() * 2) > 1) ? (0 - this.size.x) : (ig.system.width + this.size.x));

			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
		},

		update: function(){
			if(!this.moving){
				if(this.pos.x > 0){
					this.vel.x = -this.maxVel.x - Math.random() * 30;
				}else{
					this.vel.x = this.maxVel.x + Math.random() * 30;
				}

				this.moving = true;
			}else{
				if((this.pos.x < -this.size.x * 2) || this.pos.x > (ig.system.width + this.size.x * 2)){
					this.kill();
				}
			}

			this.parent();
		},

		check: function(other){
			if(other instanceof EntityBalloon && !this.damageDealt){
				other.receiveDamage(1, this);
				console.log("Satellite damage dealt.");
			}
			this.damageDealt = true;
		},

		handleMovementTrace: function(res){
			this.pos.x += this.vel.x * ig.system.tick;
    		this.pos.y += this.vel.y * ig.system.tick;
		}
	});
});