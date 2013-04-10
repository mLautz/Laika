//Support functions to spawn enemies for Laika

ig.module(
	'game.services.spawner'
)
.requires(
	'game.entities.balloon',
	'game.entities.basicBird'
)
.defines(function(){
	
	spawnEnemies = function(){
		if(ig.game.distanceGenerated > ig.game.lastSpawn + ig.game.spawnDelay){
			var flipVal = (Math.random() * 2 < 1) ? false : true;
			ig.game.spawnEntity(EntityBasicBird, Math.random() * ig.system.width, 0, {vel: {flip: flipVal}});
			ig.game.lastSpawn = ig.game.distanceGenerated;
			ig.game.spawnDelay = 180 + Math.random() * 200;
		}
	}
});