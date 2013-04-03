ig.module( 
	'game.main' 
)
.requires(
	'game.levels.testLevel',

	'impact.debug.debug',
	'impact.game',
	'impact.font',

	'plugins.map-size'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	tiles: new ig.Image( 'media/Laika/16map.png'),
	gravity: 300,

	genFlip: true,
	
	
	init: function() {
		ig.input.bind(ig.KEY.ENTER, 'begin');

		this.createLevel();
        this.paused = true;

        this.deadZoneY = ig.system.height/2 - ig.system.width/20;
		this.screenHeight = ig.system.height;
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
		
			this.updateMap();
    	}
		
		if(this.paused && ig.input.pressed('begin')){
			this.paused = false;
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	},

	loadLevel: function(level){
		this.parent(level);
		this.paused = true;
	},

	getRow: function(){
		if(this.genFlip){
			this.genFlip = false;
			return [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
		}else{
			this.genFlip = true;
			return [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1];
		}
	},

	createLevel: function(){
		// The first part of the map is always the same
        this.map = [];
        
        // Now randomly generate the remaining rows
        for( var y = 0; y < 42; y++ ) { 
            this.map[y] = this.getRow();
        }
        this.map[42] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        
        // The map is used as CollisionMap AND BackgroundMap
        this.collisionMap = new ig.CollisionMap( 16, this.map );
        var bgmap = new ig.BackgroundMap( 16, this.map, this.tiles );

        // Add the bgmap to the Game's array of BackgroundMaps
        // so it will be automatically drawn by .draw()
        this.backgroundMaps.push( bgmap );
        
        this.player = this.spawnEntity( EntityBalloon, ig.system.width/2-20, ig.system.height-16+64);
	},

	updateMap: function(){
		// Do we need a new row?
        if( this.screen.y < 0) {

            // Move screen and entities one tile up
            this.screen.y += 16;
            for( var i =0; i < this.entities.length; i++ ) {
                this.entities[i].pos.y += 16;
            }
            
            // Delete first row, insert new
            this.map.pop();
            var newRow = this.getRow();
            this.map.unshift(newRow);
        }
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 416, 624, 1);

});
