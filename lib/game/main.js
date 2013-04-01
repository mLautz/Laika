ig.module( 
	'game.main' 
)
.requires(
	'game.levels.testLevel',

	'impact.debug.debug',
	'impact.game',
	'impact.font'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 300,
	
	
	init: function() {
		// Initialize your game here; bind keys etc.

		this.loadLevel(LevelTestLevel);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 416, 624, 1);

});
