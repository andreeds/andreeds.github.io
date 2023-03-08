'use strict';
import {getLevels,getMinBestScore} from 'scripts/levels.js';

class Evolution {

    constructor() {
        // Constants
        this.DEFAULT_PLAQUE_KEY = "evolution_plaque_default";
        // DN Evolutions
        this.evolutions = getLevels();
    }

    init(pagination) {
        // Constant of pagination
        this.PLAQUES_PER_PAGE = 6;
        this.PLAQUES_PER_ROW = 3;

        // Start pagination
        this.currPage = pagination.page;
        var numPages = Math.ceil(this.evolutions.length / this.PLAQUES_PER_PAGE);
        this.plaqueStart = pagination.page * this.PLAQUES_PER_PAGE;
        this.plaqueStop = this.plaqueStart + (this.PLAQUES_PER_PAGE-1);
        this.plaqueStop = this.plaqueStop > (this.evolutions.length -1) ? (this.evolutions.length -1) : this.plaqueStop;
        // Check for prev and nex pages
        this.prevPage = -1;
        if (((this.currPage+1) * this.PLAQUES_PER_PAGE) - this.PLAQUES_PER_PAGE > 0) {
            this.prevPage = this.currPage - 1;
        }
        this.nextPage = -1;
        if (this.evolutions.length - ((this.currPage+1) * this.PLAQUES_PER_PAGE) > 0 ) {
            this.nextPage = this.currPage + 1;
        }
    }

    create() {
        this.game.stage.backgroundColor = '#FFF';

        // Draw home button
        var tmpEvolutionHome = this.game.cache.getImage("evolution_home");
        this.button_score_home = this.game.add.button(
        this.game.width * 0.95, 
        this.game.height * 0.95, 
        'evolution_home', 
        this.goMenu, 
        this, 
        1, 0, 2);
        this.button_score_home.anchor.setTo(1);

        // Draw arrows
        var tmpEvolutionBack = this.game.cache.getImage("evolution_back");
        if (this.prevPage != -1) {
            this.button_score_back = this.game.add.button(
	        this.game.width * 0.05, 
	        this.game.height * 0.5 - tmpEvolutionBack.height * 1, 
	        'evolution_back', 
	        this.goEvolution, 
	        {"game": this.game, "page": this.prevPage}, 
	        1, 0, 2);
	        this.button_score_back.anchor.setTo(0);
        }

        var tmpEvolutionForward = this.game.cache.getImage("evolution_forward");
        if (this.nextPage != -1) {
            this.button_home_forward = this.game.add.button(
	        this.game.width * 0.95, 
	        this.game.height * 0.5, 
	        'evolution_forward', 
	        this.goEvolution, 
	        {"game": this.game, "page": this.nextPage}, 
	        1, 0, 2);
	        this.button_home_forward.anchor.setTo(1);
        }

        // Draw rows of plaques
        var distCounter = 0;
        var row = 0;
        var plaque_available_width = ((this.game.width - this.game.width * 0.10 - (2 * tmpEvolutionBack.width / 3)) * 0.95) / this.PLAQUES_PER_ROW;
        var blank_space_plaque_x = this.game.width * 0.05 + (tmpEvolutionBack.width / 3);
        
        for (var i = this.plaqueStart; i <= this.plaqueStop; i++) {

            var imgCache = "evolution_plaque_"+(i+1);
            if (!this.game.cache.checkKey(Phaser.Cache.IMAGE, imgCache)) {
                imgCache = this.DEFAULT_PLAQUE_KEY;
            }
            var tmpEvolutionPlaque = this.game.cache.getImage(imgCache);
            var evolution_plaque_x = blank_space_plaque_x + plaque_available_width * 0.5 + (plaque_available_width * distCounter);
            var evolution_plaque_y = this.game.height * 0.2 + (row * tmpEvolutionPlaque.height * 1.35);
            var evolution_plaque = this.game.add.sprite(
                evolution_plaque_x,
                evolution_plaque_y,
                imgCache
            );
            evolution_plaque.anchor.setTo(0.5)
            evolution_plaque.inputEnabled = true;
            evolution_plaque.events.onInputDown.add(this.goGame, {"game": this.game, "evolution": this.evolutions[i], "evolutionPage": this.currPage});
            
            var evoScore = this.game.storage.getMinScore(this.evolutions[i].id);
            if ( evoScore >=0 ) {
            	
            	var colour_score = 'gold';
            	var colour_check = "evolution_check_gold";
            	
            	var minBestScore = getMinBestScore(this.evolutions[i].id);
            	
            	if (minBestScore < evoScore){
            		colour_score = "#FFF";
            		colour_check = "evolution_check"     		
            	}
            	var tmpEvolutionCheck = this.game.cache.getImage(colour_check);
            	var evolution_check = this.game.add.sprite(
                	evolution_plaque_x,
                	evolution_plaque_y,
                	colour_check
            		);
            	evolution_check.anchor.setTo(0.5)


            	var score_plaque = this.game.add.text(evolution_plaque_x, evolution_plaque_y + tmpEvolutionPlaque.height * 0.375 - 35/4, evoScore.toString(), {"font": '35px Terminator', align: 'left', fill: colour_score, boundsAlignV: "middle", strokeThickness: 10});
        		score_plaque.anchor.setTo(0.5);
            }


            if ((distCounter + 1) >= this.PLAQUES_PER_ROW) {
                row++;
                distCounter = 0;
            } else {
                distCounter++;
            }
        }

        // Draw Darwin
		var tmpEvolutionDarwin = this.game.cache.getImage("evolution_darwin");
        var evolution_darwin_x = 0;
        var evolution_darwin_y = this.game.height - (tmpEvolutionDarwin.height/6) - 0.05 * this.game.height;
        var evolution_darwin = this.game.add.sprite(evolution_darwin_x, evolution_darwin_y, "evolution_darwin");
        evolution_darwin.animations.add('evolution_darwin');
        evolution_darwin.animations.play('evolution_darwin', 16, true);

       	var tmpEvolutionDN = this.game.cache.getImage("evolution_dns_idle");
        var evolution_dns_idle = this.game.add.sprite(evolution_darwin_x + (tmpEvolutionDarwin.width/6) * 0.5, this.game.height - (tmpEvolutionDN.height/5) - 0.05 * this.game.height, "evolution_dns_idle");
        evolution_dns_idle.animations.add('evolution_dns_idle');
        evolution_dns_idle.animations.play('evolution_dns_idle', 12, true);

    }

    goMenu() {
        this.game.state.start('menu');
    }

    goGame() {
        // transition Animation

        var whiteBackground = this.game.add.bitmapData(this.game.width, this.game.height);
        whiteBackground.ctx.beginPath();
        whiteBackground.ctx.rect(0, 0, this.game.width, this.game.height);
        whiteBackground.ctx.fillStyle = "white";
        whiteBackground.ctx.closePath();
        whiteBackground.ctx.fill();
        var backgroundAnim = this.game.add.sprite(0, 0, whiteBackground);
        backgroundAnim.inputEnabled = true;

        var tmpTrans1 = this.game.cache.getImage("shadow_darwin");
        var transition1 = this.game.add.sprite(this.game.world.width*0.38, this.game.world.height*0.6, "shadow_darwin");
        transition1.anchor.setTo(0.5);
        transition1.scale.setTo(0.9,0.9)

        var tmpMicro = this.game.cache.getImage("microscope_for_darwin");
        var micro = this.game.add.sprite(this.game.world.width, this.game.world.height, "microscope_for_darwin");
        micro.anchor.setTo(1);
        micro.scale.setTo(0.8,0.8)

        var transition1Tween = this.game.add.tween(transition1).to({x: this.game.world.width*0.4}, 500).start();
        transition1Tween.onComplete.add(function(){
            transition1.destroy();
            micro.destroy();
            // Change state
            this.game.state.start("game", true, false, this.evolution, this.evolutionPage);
        },this);
    }

    goEvolution() {
        this.game.state.start('evolution', true, false, {"page": this.page});
    }

}

export default Evolution;