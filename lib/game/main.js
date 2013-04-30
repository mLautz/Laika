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
	font: new ig.Font( 'media/white.font.png' ),
	blackFont: new ig.Font( 'media/black.font.png'),
	titleImage: new ig.Image( 'media/Laika/titleScreen.png'),
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
			this.titleImage.draw(ig.system.width/2 - 132, ig.system.height/3 - 244, 0, 0, 264, 264);

			if(this.pausedString == "Press Enter to begin!"){
				this.blackFont.draw("Kudryavka dreams of space.", ig.system.width/2, ig.system.height/2 - 125, ig.Font.ALIGN.CENTER);
				this.blackFont.draw("Can you make her dreams come true?", ig.system.width/2, ig.system.height/2 - 105, ig.Font.ALIGN.CENTER);
			}

			this.font.draw("Left/Right arrows to move.", ig.system.width/2, ig.system.height/2 - 7, ig.Font.ALIGN.CENTER);
			this.font.draw("Space to rise faster.", ig.system.width/2, ig.system.height/2 + 8, ig.Font.ALIGN.CENTER);
			this.font.draw("Enter to pause/resume.", ig.system.width/2, ig.system.height/2 + 25, ig.Font.ALIGN.CENTER);
			this.font.draw(this.pausedString, ig.system.width/2, ig.system.height/2 + 50, ig.Font.ALIGN.CENTER);
		}else if(this.distanceGenerated > 16780){
			this.font.draw("- Welcome to space Kudryavka....", ig.system.width/2, ig.system.height/2 - 85, ig.Font.ALIGN.CENTER);
			if(this.endTimer == null){
				this.endTimer = new ig.Timer();
			}
			if(this.endTimer.delta() > 1.5){
				this.font.draw("- I'm sorry we did this to you...", ig.system.width/2, ig.system.height/2 - 20, ig.Font.ALIGN.CENTER);
				if(this.endTimer.delta() > 3){
					this.font.draw("- Please keep dreaming.", ig.system.width/2, ig.system.height/2 + 45, ig.Font.ALIGN.CENTER);
				}
			}
		}else{
			if(this.player){
				this.hpBars.draw(ig.system.width/2 - this.barDimensions.x * this.maxHealth/2, 10, 0, 0 + (20 * this.player.health), 12 * this.maxHealth, 20);
			}else{
				this.font.draw("- I'm sorry Kudryavka.", ig.system.width/2, ig.system.height/2 - 25, ig.Font.ALIGN.CENTER);
				this.font.draw("You were so brave.", ig.system.width/2, ig.system.height/2 - 25, ig.Font.ALIGN.CENTER);	
			}
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
