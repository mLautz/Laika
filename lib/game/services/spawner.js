//Support functions to spawn enemies for Laika

ig.module(
	'game.services.spawner'
)
.requires(
	'game.entities.balloon',
	'game.entities.basicBird',
	'game.entities.basicFloater',
	'game.entities.satellite'
)
.defines(function(){
	EnemySpawner = ig.Class.extend({
		lastSpawn: {basicBird: 0, basicFloater: 0, satellite: 0},
		spawnDelay: {basicBird: 180 + Math.random() * 200, basicFloater: 140 + Math.random() * 200, satellite: 0},
		
		spawnEnemies: function(){
			if(ig.game.distanceGenerated > this.lastSpawn.basicBird + this.spawnDelay.basicBird){
				this.spawnBasicBird();
			}

			if(ig.game.distanceGenerated > this.lastSpawn.basicFloater + this.spawnDelay.basicFloater){
				this.spawnBasicFloater();
			}

			if(ig.game.distanceGenerated > this.lastSpawn.satellite + this.spawnDelay.satellite){
				this.spawnSatellite();
			}
		},

		spawnBasicBird: function(){
			//height limit check
			if(ig.game.distanceGenerated < 6400){
				var flipVal = (Math.random() * 2 < 1) ? 1 : -1;
				ig.game.spawnEntity(EntityBasicBird, Math.random() * ig.system.width - 30, 0, {vel: {flip: flipVal}});
				this.lastSpawn.basicBird = ig.game.distanceGenerated;
				this.spawnDelay.basicBird = 180 + Math.random() * 160;
			}
		},

		spawnBasicFloater: function(){
			if(ig.game.distanceGenerated < 9600 && ig.game.distanceGenerated > 3200){
				ig.game.spawnEntity(EntityBasicFloater, Math.random() * ig.system.width - 48, 0);
				this.lastSpawn.basicFloater = ig.game.distanceGenerated;
				this.spawnDelay.basicFloater = 140 + Math.random() * 100;
			}
		},

		spawnSatellite: function(){
			if(ig.game.distanceGenerated > 9600 && ig.game.distanceGenerated < 16000){
				ig.game.spawnEntity(EntitySatellite, Math.random() * ig.system.width - 96, 0);
				this.lastSpawn.satellite = ig.game.distanceGenerated;
				this.spawnDelay.satellite = 130 + Math.random() * 80;
			}
		}
	});
});