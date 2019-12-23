import {drawBitmapPopulation, drawTrait, drawCircle} from 'scripts/drawing.js';

class Population {

    constructor(game, dn, combative, docile, traitColors, popColor, popX, popY) {
        // Initializations
        this.dn = dn;
        this.game = game;
        this.combative = combative;
        this.docile = docile;
        this.traitColors = traitColors;
        this.popX = popX;
        this.popY = popY;
        // Population Properties
        var nTraits = this.combative.length + this.docile.length;
        if (nTraits==1) {nTraits=2} // nTrait 1 can't be computed in function sin
        this.radius =  this.dn.TRAIT_RADIUS*(1+Math.sin(Math.PI/nTraits))/Math.sin(Math.PI/nTraits) * (1+this.dn.TRAIT_OUTER_CIRCLE_PERCENTAGE);
        this.color = popColor;
        this.generatePopulationSprite();
    }

    turnOnPhysics(newX,newY) {
        this.checkCollision = true;
        this.sprite.reset(newX, newY);
    }

    generatePopulationSprite(){

        // Drawing
        var popDrawing = drawBitmapPopulation(this.game, this.combative, this.docile, this.radius, this.color, this.traitColors, this.dn.TRAIT_STROKE, this.dn.TRAIT_OUTER_CIRCLE_PERCENTAGE, this.dn.TRAIT_RADIUS, this.dn.TRAIT_STROKE_WIDTH);
        this.sprite = this.game.add.sprite(this.x, this.y, popDrawing);
        // Set a population reference from within the sprite
        this.sprite.populationRef = this;

        // Input
        this.sprite.inputEnabled = true;
        this.sprite.input.enableDrag();
        this.sprite.input.boundsRect = new Phaser.Rectangle(0, 0, this.game.world.width, this.game.world.height-this.dn.SHIFT_VERTICAL_PLAYABLE_AREA);
        this.sprite.events.onInputDown.add(this.handlePopulationClick, this);

        // Positioning sprite
        if (this.popX && this.popY) {
            this.sprite.x = this.popX;
            this.sprite.y = this.popY;
        }
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        
    }

    startRisingToIdleAnimation() {
        var tween = this.game.add.tween(this.sprite.scale).from({x: 0, y:0}, this.dn.TWEEN_TIME);
        tween.chain(this.game.add.tween(this.sprite.scale).from({x: 0.95, y:0.95}, this.dn.IDLE_TWEEN_TIME).from({x: 1.0, y:1.0}, this.dn.IDLE_TWEEN_TIME).loop(true))
        tween.start();
    }

    handlePopulationClick() {
        if (this.game.selectedOperator == "lab_replicate") {
            if (this.combative.length > 1) {
                this.popupCombative = this.generatePopupCombative();
            } else {
                // Alert player
                var popupGroup = this.game.gameController.warnPopup(
                    "warning_text_box_replication",
                    function(){popupGroup.destroy();}
                );
                // Set the operator back to move
                this.game.gameController.selectOperator("lab_drag", this.game, this.game.gameController, false);
            }
        }
        else if (this.game.selectedOperator == "lab_delete") {
            this.game.dn.performRemoval(this);
        }
    }

    generatePopupCombative() {
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
        // Generate big traits
        var bigTraitRadius = this.dn.TRAIT_POPUP_RADIUS;
        var nTraits = this.combative.length;
        var populationRadius = bigTraitRadius*(1+Math.sin(Math.PI/nTraits))/Math.sin(Math.PI/nTraits) * (1+this.dn.TRAIT_OUTER_CIRCLE_PERCENTAGE);

        // Draw Combative Traits
        var traitSpritesGroup = this.game.add.group();
        var traitAngleShift = 360 / (this.combative.length);
        var curr_trait_angle = 0;
        for (var i = this.combative.length - 1; i >= 0; i--) {
            var c = this.combative[i];
            var popX = populationRadius; var popY = populationRadius;
            var degree = curr_trait_angle * traitAngleShift;
            var traitAngle = -(degree * Math.PI)/180;
            var traitOuterCircle = this.dn.TRAIT_OUTER_CIRCLE_PERCENTAGE * populationRadius;
            var x = popX + traitOuterCircle * Math.cos(traitAngle);
            var y = popY + traitOuterCircle * Math.sin(traitAngle);

            var bitmapSize = 2 * bigTraitRadius;
            var bmd = this.game.add.bitmapData(bitmapSize, bitmapSize);
            drawCircle(bmd, bigTraitRadius, bigTraitRadius, bigTraitRadius, this.traitColors[c])

            curr_trait_angle++;

            var traitSprite = this.game.add.sprite(x-bigTraitRadius, y-bigTraitRadius, bmd);
            traitSprite.inputEnabled = true;
            traitSprite.events.onInputDown.add(this.game.dn.performReplication, {"self": this, "trait": c, "areaClickSprite": areaClickSprite, "traitSpritesGroup": traitSpritesGroup});
            traitSpritesGroup.add(traitSprite);
        }
        traitSpritesGroup.x = this.game.world.width/2 - populationRadius;
        traitSpritesGroup.y = this.game.world.height/2 - populationRadius;

        areaClickSprite.inputEnabled = true;
        areaClickSprite.events.onInputDown.add(this.destroyPopup, {"self": this, "areaClickSprite": areaClickSprite, "traitSpritesGroup": traitSpritesGroup});
    }

    destroyPopup() {
        this.traitSpritesGroup.destroy()
        this.areaClickSprite.destroy();
        // Set the operator back to move
        this.self.game.gameController.selectOperator("lab_drag", this.self.game, this.self.game.gameController, false);
    }
}

export default Population;
