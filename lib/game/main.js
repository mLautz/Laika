ig.module( 
	'game.main' 
)
.requires(
	'game.entities.basicBird',
	'game.entities.balloon',

	'game.levels.testLevel',

	'game.services.levelGen',
	'game.services.spawner',

	'impact.debug.debug',
	'impact.game',
	'impact.font',

	'plugins.map-size'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load utilities
	font: new ig.Font( 'media/04b03.font.png' ),
	lvlGen: new LevelGenerator(),
	spawner: new EnemySpawner(),

	//physics config
	gravity: 100,

	//game state variables
	distanceGenerated: 0,
	pausedString: "Press Enter to begin!",

	//health stuff
	hpBars: new ig.Image('media/Laika/hpBars.png'),
	barDimensions: {x:12, y: 20},
	maxHealth: 10,
	
	
	init: function() {
		ig.input.bind(ig.KEY.ENTER, 'begin');

		this.player = this.lvlGen.createLevel();
        this.paused = true;

        this.deadZoneY = ig.system.height/2 - ig.system.width/20;
		this.screenHeight = ig.system.height;

		this.screen.x = 16;
		this.screen.y = ig.game.backgroundMaps[0].pxHeight - this.screenHeight;
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		if(!this.paused && this.player){
			this.parent();

			//Vertical Dead Zone
			var camY = this.screen.y;
			if((this.player.pos.y - camY) < this.deadZoneY + 100){ this.screen.y = camY + (this.player.pos.y - camY) - this.deadZoneY - 100;}

			//Stop camera at bottom level bounds
			if(this.screen.y >= ig.game.backgroundMaps[0].pxHeight - this.screenHeight){ this.screen.y = ig.game.backgroundMaps[0].pxHeight - this.screenHeight;}
		
			this.lvlGen.updateMap();
			this.spawner.spawnEnemies();
    	}
		
		if(this.paused && ig.input.pressed('begin')){
			this.paused = false;
			this.pausedString = "Press Enter to resume!";
		}else if(!this.paused && ig.input.pressed('begin')){
			this.paused = true;
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();

		if(this.paused){
			//pause screen
			this.font.draw(this.pausedString, ig.system.width/2, ig.system.height/2, ig.Font.ALIGN.CENTER);
		}

		if(this.player){
			this.hpBars.draw(ig.system.width/2 - this.barDimensions.x * this.maxHealth/2, 10, 0, 0 + (20 * this.player.health), 12 * this.maxHealth, 20);
		}else{
			this.hpBars.draw(ig.system.width/2 - this.barDimensions.x * this.maxHealth/2, 10, 0, 0, 12 * this.maxHealth, 20);
		}
	},

	loadLevel: function(level){
		this.parent(level);
		this.paused = true;
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 416, 624, 1);

});
