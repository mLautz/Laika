//Support functions to generate Laika level

ig.module(
	'game.services.levelGen'
)
.requires(
	'game.entities.balloon'
)
.defines(function(){
    LevelGenerator = ig.Class.extend({
        lastShift: 0,
        shiftDist:  3200,
        mapShade: 2,
        shadeMax: 6,
        map: null,
        
    	
    	createLevel: function(){
    		// The first part of the map is always the same
            this.map = [];
            
            // Now randomly generate the remaining rows
            for( var y = 0; y < 42; y++ ) { 
                this.map[y] = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
            }
            this.map[42] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
            ig.game.distanceGenerated += 16;

            //set collisionmap to match the original background map
    		var collData = new Array(this.map.length);
    		for(var i = 0; i < collData.length; i++){
    			collData[i] = new Array(this.map[i].length);
    			for(var j = 0; j < collData[0].length; j++){
    				collData[i][j] = this.map[i][j];
    			}
    		}
    		ig.game.collisionMap = new ig.CollisionMap( 16, collData );


    		// Now randomly generate the remaining rows
            for( var y = 0; y < 42; y++ ) { 
                this.map[y] = this.getRow();
            }
    		// The map is used as BackgroundMap
            var bgmap = new ig.BackgroundMap( 16, this.map, new ig.Image( 'media/Laika/16map.png'));
            this.map[42] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


            // Add the bgmap to the Game's array of BackgroundMaps
            // so it will be automatically drawn by .draw()
            ig.game.backgroundMaps.push( bgmap );
            
            var player = ig.game.spawnEntity( EntityBalloon, ig.system.width/2-20, ig.system.height-16);

    		return player;
    	},

    	updateMap: function(){
    		// Do we need a new row?
            if( ig.game.screen.y < 0 && ig.game.player) {

                // Move screen and entities one tile up
                ig.game.screen.y += 16;
                for( var i =0; i < ig.game.entities.length; i++ ) {
                	if(ig.game.entities[i].pos.y > ig.system.height){
                		ig.game.entities[i].kill();
                	}else{
                    	ig.game.entities[i].pos.y += 16;
                	}
                }
                
                // Delete first row, insert new
                this.map.pop();
                var newRow = this.getRow();
                this.map.unshift(newRow);

                if(ig.game.distanceGenerated > this.lastShift + this.shiftDist){
                	this.lastShift = ig.game.distanceGenerated;
                	if(this.mapShade <= this.shadeMax){
    	            	this.mapShade++;
        			}
                }
            }
    	},

    	getRow: function(){
    		ig.game.distanceGenerated += 16;
            return [this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade,this.mapShade];
    	}
    });
});