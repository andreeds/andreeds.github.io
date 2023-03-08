'use strict';

import Population from 'scripts/class/population.js';
import {drawBitmapPopulation, drawTrait, drawCircle} from 'scripts/drawing.js';
import {circleOverlap} from 'scripts/utility.js';

class DarwinianNetwork {

    constructor(game, population_params, query, traitColors, popColor, evolutionId){
        // Constants
        this.TRAIT_RADIUS = 20;
        this.TRAIT_OUTER_CIRCLE_PERCENTAGE = 0.6;
        this.TRAIT_STROKE = "#282828";
        this.TRAIT_STROKE_WIDTH = this.TRAIT_RADIUS * 0.4;
        this.TRAIT_POPUP_RADIUS = this.TRAIT_RADIUS * 3
        this.SHIFT_VERTICAL_PLAYABLE_AREA = 150;
        this.STD_POP_RADIUS = 100;
        this.PERCENTAGE_RADIUS_OF_COLLISION = 0.10;
        this.TWEEN_TIME = 500;
        this.IDLE_TWEEN_TIME = 1000;
        // Initialization
    	this.history = [];
    	this.game = game;
    	this.populations = [];
        this.query = query;
    	this.traitColors = traitColors;
    	this.popColor = popColor;
        this.score = 0;
        this.evolutionId = evolutionId;
    	for (var i = population_params.length - 1; i >= 0; i--) {
    		var population_param = population_params[i];
            var population = new Population(this.game, this, population_param["combative"], population_param["docile"], this.traitColors, this.popColor);
            this.putPopulationRandomPosition(population, this.game.world.width, this.game.world.height);
            // Tween animation
            population.startRisingToIdleAnimation();
    		this.populations.push(population)
    	}
    }

    checkCollisions(){
        var hasCollision = false;
        var popMerge1;
        var popMerge2;
    	for (var i = 0; i < this.populations.length; i++) {
            var population1Sprite =  this.populations[i].sprite;

            // Check collision with populations
            for (var j = i+1; j < this.populations.length; j++) {
                var population2Sprite = this.populations[j].sprite;
                if (population1Sprite != population2Sprite){
                    if (this.populations[i].checkCollision && this.populations[j].checkCollision) {
                        circleOverlap(this.populations[i], this.populations[j], function(){
                        // this.game.physics.arcade.overlap(population1Sprite, population2Sprite, function(){
                            popMerge1 = this.populations[i];
                            popMerge2 = this.populations[j];
                            hasCollision = true;
                        }, null, this);
                    }
                }
                if (hasCollision) { break; }
            }
            if (hasCollision) { break; }
        }
        if (hasCollision) {
            this.performMerge(popMerge1, popMerge2);
        }
    }

    checkQuery() {
        if (this.populations.length == this.query.length) {
            var allFound = true;
            for (var i = this.populations.length - 1; i >= 0; i--) {
                var population = this.populations[i];
                var foundInQuery = false;
                for (var j = this.query.length - 1; j >= 0; j--) {
                    var queryPopulation = this.query[j];
                    if (
                        (population.combative.length == queryPopulation.combative.length) &&
                        (population.docile.length == queryPopulation.docile.length) &&
                        ((new Set(population.combative)).equal(new Set(queryPopulation.combative))) &&
                        ((new Set(population.docile)).equal(new Set(queryPopulation.docile)))
                        ) {
                        foundInQuery = true;
                        break;
                    }
                }
                allFound = allFound && foundInQuery;
            }
            if (allFound) {
                this.game.camera.fade("black", 1500, true);
                this.game.camera.onFadeComplete.add(this.goScore, this);
            }
        }
    }

    goScore() {
        this.game.state.start('score', true, false, {"score": this.score, "evolutionId": this.evolutionId, "evolutionPage": this.game.gameController.evolutionPage});
    }

    performRemoval(population) {
        // Set the operator back to move
        this.game.gameController.selectOperator("lab_drag", this.game, this.game.gameController, false);
        // Remove collision detection
        population.checkCollision = false;
        // Tween animation
        var tween = this.game.add.tween(population.sprite.scale).to({x: 0, y:0}, this.TWEEN_TIME, null, true);
        tween.onComplete.add(function(){
            // Perform removal
            this.game.dn.removePopulation(population);
            this.game.dn.history.push({"op": "removal", "pop": population});
            // Check for end of the game
            this.game.dn.checkQuery();
        }, this);
    }

    performReplication() {
        var population = this.self;
        var trait = this.trait;
        var areaClickSprite = this.areaClickSprite;
        var traitSpritesGroup = this.traitSpritesGroup;
        this.self.game.dn.history.push({"op": "replication", "pop": population, "trait": trait});
        // Generate new population
        var combRepPop = [];
        for (var i = population.combative.length - 1; i >= 0; i--) {
            if (population.combative[i] != trait) {
                combRepPop.push(population.combative[i]);
            }
        }
        var replicatedPopulation = new Population(this.self.game, this.self.dn, combRepPop, population.docile.slice(), this.self.game.dn.traitColors, this.self.game.dn.popColor);
        this.self.dn.putPopulationRandomPosition(replicatedPopulation, this.self.game.world.width,this.self.game.world.height);
        // Save population in DN
        this.self.game.dn.populations.push(replicatedPopulation)
        // Remove big traits and outside area of click
        areaClickSprite.destroy();
        traitSpritesGroup.destroy();
        // Set the operator back to move
        this.self.game.gameController.selectOperator("lab_drag", this.self.game, this.self.game.gameController, false);
        // Check for end of the game
        this.self.game.dn.checkQuery();
        // Tween animation
        replicatedPopulation.startRisingToIdleAnimation();
    }

    performMerge(pop1, pop2){
        // Merge condition
    	if (pop1.combative.length > 0 || pop2.combative.length > 0) {
    		this.history.push({"op": "merge", "pop1": pop1, "pop2": pop2});
    		// remove populations from DN
            this.removePopulation(pop1);
    		this.removePopulation(pop2);
    		// Compute new traits
            var commonComb = new Set(pop1.combative).intersection(new Set(pop2.combative));
    		var combPop1 = new Set(pop1.combative);
    		var combPop2 = new Set(pop2.combative);
    		var combMergPop = combPop1.union(combPop2).difference(commonComb);
    		var docPop1 = new Set(pop1.docile);
    		var docPop2 = new Set(pop2.docile);
    		var docMergPop = docPop1.union(docPop2).difference(combMergPop).union(commonComb);
    		// Draw new population
            var popX = (pop1.sprite.x + pop2.sprite.x)/2;
            var popY = (pop1.sprite.y + pop2.sprite.y)/2;
    		var mergedPopulation = new Population(this.game, this.game.dn, Array.from(combMergPop), Array.from(docMergPop), this.traitColors, this.popColor);
            mergedPopulation.turnOnPhysics(popX, popY);
            // Tween animation
            mergedPopulation.startRisingToIdleAnimation();
    		// Save population in DN
    		this.populations.push(mergedPopulation)
            // Update score
            this.updateScore(Math.pow(2,combMergPop.size+docMergPop.size));
            // Check for end of the game
            this.game.dn.checkQuery();
    	}
    }

    removePopulation(pop) {
        this.populations.splice(this.populations.indexOf(pop),1);
        pop.sprite.visible = false;
        // #TOREMOVE
        // pop.sprite.body.enable = false;
    }

    showQuery() {
        // Generate area of click outside big traits
        var popupBackground = this.game.add.bitmapData(this.game.width, this.game.height);
        popupBackground.ctx.beginPath();
        popupBackground.ctx.rect(0, 0, this.game.width, this.game.height);
        popupBackground.ctx.fillStyle = "black";
        popupBackground.ctx.globalAlpha = 0.8;
        popupBackground.ctx.closePath();
        popupBackground.ctx.fill();
        var areaClickSprite = this.game.add.sprite(0, 0, popupBackground);
        areaClickSprite.scale.x = this.game.width;
        areaClickSprite.scale.y = this.game.height;
        // Draw populations in circular form
        var traitAngleShift = 360 / this.game.dn.query.length;
        var curr_trait_angle = 0;
        var queryPopulations = this.game.add.group();
        for (var i = this.game.dn.query.length - 1; i >= 0; i--) {
            var queryPopulation = this.game.dn.query[i];
            var nTraits = queryPopulation.combative.length + queryPopulation.docile.length;
            if(nTraits==1) {nTraits=2;}
            var populationRadius = this.game.dn.TRAIT_RADIUS*(1+Math.sin(Math.PI/nTraits))/Math.sin(Math.PI/nTraits) * (1+this.game.dn.TRAIT_OUTER_CIRCLE_PERCENTAGE);
            var popBmp = drawBitmapPopulation(this.game, queryPopulation.combative, queryPopulation.docile || [], populationRadius, this.game.dn.popColor, this.game.dn.traitColors, this.game.dn.TRAIT_STROKE, this.game.dn.TRAIT_OUTER_CIRCLE_PERCENTAGE, this.game.dn.TRAIT_RADIUS, this.game.dn.TRAIT_STROKE_WIDTH);
            // Compute circular formation
            var x = this.game.world.width/2;
            var y = this.game.world.height/2;
            if (this.game.dn.query.length > 1) {
                var virtualCircularFormQuantity = this.game.dn.query.length;
                if(virtualCircularFormQuantity==1) {virtualCircularFormQuantity=2;}
                var popR = this.game.dn.STD_POP_RADIUS*(1+Math.sin(Math.PI/virtualCircularFormQuantity))/Math.sin(Math.PI/virtualCircularFormQuantity) * (1+this.game.dn.TRAIT_OUTER_CIRCLE_PERCENTAGE);
                var degree = curr_trait_angle * traitAngleShift;
                var traitAngle = -(degree * Math.PI)/180;
                var traitOuterCircle = this.game.dn.TRAIT_OUTER_CIRCLE_PERCENTAGE * popR;
                x = this.game.width/2 + traitOuterCircle * Math.cos(traitAngle);
                y = this.game.height/2 + traitOuterCircle * Math.sin(traitAngle);
            }
            // Create sprite for population
            var popSprite = this.game.add.sprite(x-this.game.dn.STD_POP_RADIUS, y-this.game.dn.STD_POP_RADIUS, popBmp);
            queryPopulations.add(popSprite);
            // rotate circular formation
            curr_trait_angle++;
        }
        // If click in area, close popup
        areaClickSprite.inputEnabled = true;
        areaClickSprite.events.onInputDown.add(this.game.dn.destroyShowQuery, {"self": this, "areaClickSprite": areaClickSprite, "queryPopulations": queryPopulations});
    }

    destroyShowQuery() {
        this.queryPopulations.destroy()
        this.areaClickSprite.destroy();
        // Set the operator back to move
        this.self.game.gameController.selectOperator("lab_drag", this.self.game, this.self.game.gameController, false);
    }

    updateScore(scoreToSum) {
        this.score += scoreToSum;
        this.game.scoreText.text = this.score;
    }

    putPopulationRandomPosition(pop, maxX, maxY, minX, minY) {
        var minX = minX || 0;
        var minY = minY || 0;
        var hasCollision = true;
        // Set timer for trying to find position
        var timer = (new Date()).getTime();

        var newX;
        var newY;
        while (hasCollision) {
            hasCollision = false;
            newX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            newY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
            // Keep poition within visible screen
            if ((newX + 2*pop.radius) > this.game.world.width) {
                newX -= 2*pop.radius;
            } else if ((newX - 2*pop.radius) < 0) {
                newX += 2*pop.radius;
            }
            if ((newY + 2*pop.radius) > this.game.world.height) {
                newY -= 2*pop.radius;
            } else if ((newY - 2*pop.radius) < 0) {
                newY += 2*pop.radius;
            }

            if ((newY + 2*pop.radius) > (this.game.world.height - this.SHIFT_VERTICAL_PLAYABLE_AREA)) {
                newY -= this.SHIFT_VERTICAL_PLAYABLE_AREA + 2*pop.radius;
            }
            // Test collision
            // pop.sprite.reset(newX,newY);
            pop.sprite.x = newX;
            pop.sprite.y = newY;
            for (var i = 0; i < this.populations.length; i++) {
                var currPop = this.populations[i];
                circleOverlap(pop, currPop, function(){hasCollision=true;}, null, this);
                if (hasCollision) {
                    break;
                }
            }
            // Check timer
            var thisSelf = this;
            if (((new Date()).getTime() - timer) > 800) {
                alertify.alert("Ops...","We can't fit the new population in the screen. Please, try a new evolution.", function(){
                    thisSelf.game.state.start("game", true, false, thisSelf.game.gameController.evolution);
                    alertify.message("Evolution restarted");
                  });
                break;
            }
        }
        if (!hasCollision) {
            pop.turnOnPhysics(newX,newY);
        }
    }

}

export default DarwinianNetwork;