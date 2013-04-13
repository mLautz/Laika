//Support functions to spawn enemies for Laika

ig.module(
	'game.services.spawner'
)
.requires(
	'game.entities.balloon',
	'game.entities.basicBird',
	'game.entities.basicFloater'
)
.defines(function(){
	spawnerInit = function(){
		this.lastSpawn = {basicBird: 0, basicFloater: 0};
		this.spawnDelay = {basicBird: 180 + Math.random() * 200, basicFloater: 140 + Math.random() * 200};
	}
	
	spawnEnemies = function(){
		if(ig.game.distanceGenerated > this.lastSpawn.basicBird + this.spawnDelay.basicBird){
			spawnBasicBird();
		}

		if(ig.game.distanceGenerated > this.lastSpawn.basicFloater + this.spawnDelay.basicFloater){
			spawnBasicFloater();
		}
	},

	spawnBasicBird = function(){
		var flipVal = (Math.random() * 2 < 1) ? false : true;
		ig.game.spawnEntity(EntityBasicBird, Math.random() * ig.system.width - 30, 0, {vel: {flip: flipVal}});
		this.lastSpawn.basicBird = ig.game.distanceGenerated;
		this.spawnDelay.basicBird = 180 + Math.random() * 160;
	},

	spawnBasicFloater = function(){
		ig.game.spawnEntity(EntityBasicFloater, Math.random() * ig.system.width - 20, 0);
		this.lastSpawn.basicFloater = ig.game.distanceGenerated;
		this.spawnDelay.basicFloater = 80 + Math.random() * 100;
	}
});