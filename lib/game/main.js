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
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 300,

	//generation variables
	mapShade: 2,
	shadeMax: 6,
	shadeFlip: false,
	lastShift: 0,
	shiftDist: 800,
	distanceGenerated: 0,
	lastSpawn: 0,
	spawnDelay: 0,

	//pause screen settings/assets
	pausedString: "Press Enter to begin!",
	
	
	init: function() {
		ig.input.bind(ig.KEY.ENTER, 'begin');

		this.player = createLevel();
        this.paused = true;

        this.deadZoneY = ig.system.height/2 - ig.system.width/20;
		this.screenHeight = ig.system.height;

		this.screen.x = 16;
		this.screen.y = ig.game.backgroundMaps[0].pxHeight - this.screenHeight;
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		if(!this.paused){
			this.parent();

			//Vertical Dead Zone
			var camY = this.screen.y;
			if((this.player.pos.y - camY) > (this.screenHeight - this.deadZoneY)){ this.screen.y = camY + (this.player.pos.y - camY) - (this.screenHeight - this.deadZoneY);}
			else if((this.player.pos.y - camY) < this.deadZoneY){ this.screen.y = camY + (this.player.pos.y - camY) - this.deadZoneY;}

			//Stop camera at bottom level bounds
			if(this.screen.y >= ig.game.backgroundMaps[0].pxHeight - this.screenHeight){ this.screen.y = ig.game.backgroundMaps[0].pxHeight - this.screenHeight;}
		
			updateMap();
			spawnEnemies();
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
