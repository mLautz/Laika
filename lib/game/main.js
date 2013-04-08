ig.module( 
	'game.main' 
)
.requires(
	'game.entities.basicBird',

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

	mapShade: 2,
	shadeMax: 6,
	shadeFlip: false,
	lastShift: 0,
	shiftDist: 500,
	distTraveled: 0,

	//pause screen settings/assets
	pausedString: "Press Enter to begin!",
	
	
	init: function() {
		ig.input.bind(ig.KEY.ENTER, 'begin');

		this.createLevel();
        this.paused = true;

        this.deadZoneY = ig.system.height/2 - ig.system.width/20;
		this.screenHeight = ig.system.height;

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
		
			this.updateMap();
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
	},

	getRow: function(){
		return [this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade];
	},

	createLevel: function(){
		// The first part of the map is always the same
        this.map = [];
        
        // Now randomly generate the remaining rows
        for( var y = 0; y < 42; y++ ) { 
            this.map[y] = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
        }
        this.map[42] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

        //set collisionmap to match the original background map
		var collData = new Array(this.map.length);
		for(var i = 0; i < collData.length; i++){
			collData[i] = new Array(this.map[i].length);
			for(var j = 0; j < collData[0].length; j++){
				collData[i][j] = this.map[i][j];
			}
		}
		this.collisionMap = new ig.CollisionMap( 16, collData );


		// Now randomly generate the remaining rows
        for( var y = 0; y < 42; y++ ) { 
            this.map[y] = this.getRow();
        }
		// The map is used as BackgroundMap
        var bgmap = new ig.BackgroundMap( 16, this.map, this.tiles );
        this.map[42] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


        // Add the bgmap to the Game's array of BackgroundMaps
        // so it will be automatically drawn by .draw()
        this.backgroundMaps.push( bgmap );
        
        this.player = this.spawnEntity( EntityBalloon, ig.system.width/2-20, ig.system.height-16);
		this.spawnEntity(EntityBasicBird, ig.system.width/6, ig.system.height/3);
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
            this.distTraveled += 16;
            if(this.distTraveled > this.lastShift + this.shiftDist){
            	this.lastShift = this.distTraveled;
            	if(this.mapShade <= this.shadeMax){
	            	this.mapShade++;
    			}
            }
        }
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 416, 624, 1);

});
