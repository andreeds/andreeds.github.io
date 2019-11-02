'use strict';

import DarwinianNetwork from 'scripts/class/darwiniannetwork.js';
import {generateRandomColor, generateRandomTraitColors} from 'scripts/utility.js';

class Game {

    init(evolution, evolutionPage) {
        this.evolution = evolution;
        this.traits = evolution.traits;
        this.populations = evolution.populations;
        this.query = evolution.query;
        this.evolutionId = evolution.id;
        this.evolutionPage = evolutionPage;
        this.tutorials = evolution.tutorials;
    }

    preload() {
    }

    create() {

        // Constants
        this.TRANSITION_SPRITE_RATIO = 700;

        this.game.gameController = this;

        // Background scene
        this.game.stage.backgroundColor = '#000';
        this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'grid');

        // Colour definitions
        var popColor = "white";
        var traitColors = generateRandomTraitColors(this.traits);
        // Create DN
        this.game.dn = new DarwinianNetwork(this.game, this.populations, this.query, traitColors, popColor, this.evolutionId);
        
        // Drawing Dashboard
        var tmpLabDrag = this.game.cache.getImage("lab_drag");
        var lab_drag_x = (this.game.width - (tmpLabDrag.width / 3)) / 2;
        var ajustement_lab_drag_x = ((tmpLabDrag.width / 3) * 0.74);
        var lab_button_y_upper = this.game.height - tmpLabDrag.height * 1.75;
        var lab_button_y_lower = this.game.height - tmpLabDrag.height * 1.25;
        this.button_lab_drag = this.game.add.button(
            lab_drag_x, 
            lab_button_y_upper, 
            'lab_drag', 
            this.selectOperator, 
            {"self": this, "operator": "lab_drag"},
            1, 0, 2);

        var tmpLabCounter = this.game.cache.getImage("lab_counter");
        this.button_lab_counter = this.game.add.sprite(
            lab_drag_x - ajustement_lab_drag_x * 1,
            lab_button_y_lower,
            'lab_counter'
        );

        var tmpLabReset = this.game.cache.getImage("lab_reset");
        this.button_lab_reset = this.game.add.button(
            lab_drag_x - ajustement_lab_drag_x * 2, 
            lab_button_y_upper, 
            'lab_reset', 
            this.goReset, 
            this, 
            1, 0, 2);

        this.button_lab_back = this.game.add.button(
            lab_drag_x - ajustement_lab_drag_x * 3, 
            lab_button_y_lower, 
            'lab_back', 
            this.goEvolution, 
            this, 
            1, 0, 2);

        var tmpLabGlass = this.game.cache.getImage("lab_glass");
        this.button_lab_glass = this.game.add.button(
            lab_drag_x + ajustement_lab_drag_x * 1, 
            lab_button_y_lower, 
            'lab_glass', 
            this.game.dn.showQuery,
            this,
            1, 0, 2);

        var tmpLabReplicate = this.game.cache.getImage("lab_replicate");
        this.button_lab_replicate = this.game.add.button(
            lab_drag_x + ajustement_lab_drag_x * 2, 
            lab_button_y_upper, 
            'lab_replicate', 
            this.selectOperator, 
            {"self": this, "operator": "lab_replicate"}, 
            1, 0, 2);

        var tmpLabDelete = this.game.cache.getImage("lab_delete");
        this.button_lab_delete = this.game.add.button(
            lab_drag_x + ajustement_lab_drag_x * 3, 
            lab_button_y_lower, 
            'lab_delete', 
            this.selectOperator, 
            {"self": this, "operator": "lab_delete"}, 
            1, 0, 2);

        var text_counter_x = lab_drag_x - ajustement_lab_drag_x * 1 + (tmpLabDrag.width / 3) * 0.5;
        var text_counter_y = lab_button_y_lower + tmpLabDrag.height * 0.5;
        this.game.scoreText = this.game.add.text(text_counter_x, text_counter_y, "0", {"font": '35px Terminator', align: 'left', fill: '#FFF', boundsAlignV: "middle"});
        this.game.scoreText.anchor.setTo(0.5);

        // Tutorial
        if (this.tutorials.length > 0) {
            var popupBackground = this.game.add.bitmapData(this.game.width, this.game.height);
            popupBackground.ctx.beginPath();
            popupBackground.ctx.rect(0, 0, this.game.width, this.game.height);
            popupBackground.ctx.fillStyle = "black";
            popupBackground.ctx.globalAlpha = 0.8;
            popupBackground.ctx.closePath();
            popupBackground.ctx.fill();
            var areaClickSprite = this.game.add.sprite(0, 0, popupBackground);

            var tutoIdx = 0;
            var currTuto = this.showTutorial(this.tutorials,tutoIdx);

            areaClickSprite.inputEnabled = true;
            areaClickSprite.events.onInputDown.add(function(){
                if (tutoIdx < (this.tutorials.length-1)) {
                    currTuto.destroy();
                    tutoIdx++;
                    currTuto = this.showTutorial(this.tutorials, tutoIdx);
                } else {
                    currTuto.destroy();
                    areaClickSprite.destroy();
                }
            }, this);
        }

        // Dashboard selection
        this.game.selectedOperator = "lab_drag";
        this.button_lab_drag.frame = 2;
        this.button_lab_drag.freezeFrames = true;
        this.currentSelectedOperator = this.button_lab_drag;

        // Draw tween transition
        var tmpTrans2 = this.game.cache.getImage("mircrooscope_view");
        var transition2 = this.game.add.sprite(this.game.world.width/2, this.game.world.height/2, "mircrooscope_view");
        transition2.anchor.setTo(0.5);
        //###TOFIX: ration constant
        var scaleRatio = this.game.world.width/this.TRANSITION_SPRITE_RATIO;
        transition2.scale.setTo(scaleRatio,scaleRatio);
        var microTransAnim = this.game.add.tween(transition2.scale).to({x:3,y:3}, 5000);
        microTransAnim.onComplete.add(function(){
            transition2.destroy();
        }, this);
        microTransAnim.start();
    }


    showTutorial(tutorialLabels, tutoIdx) {
        var tmpTutorialTest = this.game.cache.getImage(tutorialLabels[tutoIdx]);
        var lab_tutorial_test = this.game.add.sprite(
            (this.game.width + tmpTutorialTest.width) / 2,
            this.game.height,
            tutorialLabels[tutoIdx]
        );
        lab_tutorial_test.anchor.setTo(1);
        return lab_tutorial_test;
    }


    selectOperator(op, game, gameController, localCall=true) {

        var operator = op;
        var game = game;
        var gameController = gameController;
        if (localCall) {
            operator = this.operator;
            game = this.self.game;
            gameController = this.self;
        }

        var modified =  false;
        var chosenOperator;
        // Change selected operator to pressed frame colors
        if (operator == "lab_drag") {
            game.selectedOperator = "lab_drag";
            chosenOperator = gameController.button_lab_drag;
            modified = true;
        } else if (operator == "lab_reset") {
            game.selectedOperator = "lab_reset";
            chosenOperator = gameController.button_lab_reset;
            modified = true;
        } else if (operator == "lab_glass") {
            game.selectedOperator = "lab_glass";
            chosenOperator = gameController.button_lab_glass;
            modified = true;
        } else if (operator == "lab_replicate") {
            game.selectedOperator = "lab_replicate";
            chosenOperator = gameController.button_lab_replicate;
            modified = true;
        } else if (operator == "lab_delete") {
            game.selectedOperator = "lab_delete";
            chosenOperator = gameController.button_lab_delete;
            modified = true;
        }

        if (modified) {
            gameController.currentSelectedOperator.frame = 0;
            gameController.currentSelectedOperator.freezeFrames = false;
            chosenOperator.frame = 2;
            chosenOperator.freezeFrames = true;
            gameController.currentSelectedOperator = chosenOperator;
        }
    }

    update() {
        // Check Collision between populations
        this.game.dn.checkCollisions();
    }

    goEvolution() {
        var selfThis = this;
        if (this.game.dn.history.length > 0) {
            this.warnPopup(
                "warning_text",
                function(){
                    selfThis.game.state.start('evolution', true, false, {"page": selfThis.evolutionPage});
                  },
                function(){}
            );
        } else {
            selfThis.game.state.start('evolution', true, false, {"page": selfThis.evolutionPage});
        }
    }

    goReset() {
        var selfThis = this;
        if (this.game.dn.history.length > 0) {
            this.warnPopup(
                "warning_text",
                function(){
                    selfThis.game.state.start("game", true, false, selfThis.evolution, selfThis.evolutionPage);
                  },
                function(){}
            );
        } else {
            selfThis.game.state.start("game", true, false, selfThis.evolution, selfThis.evolutionPage);
        }
    }

    warnPopup(imgName, funcOk, funcCancel, funcContext) {
        // Warn group
        var warnGroup = this.game.add.group();
        // Black background
        var popupBackground = this.game.add.bitmapData(this.game.width, this.game.height);
        popupBackground.ctx.beginPath();
        popupBackground.ctx.rect(0, 0, this.game.width, this.game.height);
        popupBackground.ctx.fillStyle = "black";
        popupBackground.ctx.globalAlpha = 0.8;
        popupBackground.ctx.closePath();
        popupBackground.ctx.fill();
        var areaClickSprite = this.game.add.sprite(0, 0, popupBackground);
        areaClickSprite.inputEnabled = true;
            areaClickSprite.events.onInputDown.add(function(){warnGroup.destroy()});
        warnGroup.add(areaClickSprite);

        var tmpWarnText = this.game.cache.getImage(imgName);
        var warnTextSprite = this.game.add.sprite(
            (this.game.width - tmpWarnText.width )/ 2 ,
            this.game.height * 0.1,
            imgName
        );
        // warnTextSprite.anchor.setTo(0.5);
        warnGroup.add(warnTextSprite);
        // Buttons
        // Ok button
        if (funcOk) {
            var tmpWarnOk = this.game.cache.getImage("warning_ok");
            var button_ok = this.game.add.button(
                this.game.width / 2 - tmpWarnText.width/2,
                this.game.height / 2 + tmpWarnText.height/2 - tmpWarnOk.height,
                'warning_ok', 
                function(){funcOk.call(funcContext)}, 
                this, 
                1, 0, 2);
            warnGroup.add(button_ok);
        }
        // Cancel button
        if (funcCancel) {
            var tmpWarnCancel = this.game.cache.getImage("warning_cancel");
            var button_cancel = this.game.add.button(
                this.game.width / 2 + tmpWarnText.width/2,
                this.game.height / 2 + tmpWarnText.height/2,
                'warning_cancel', 
                function(){warnGroup.destroy()}, 
                this, 
                1, 0, 2);
            button_cancel.anchor.setTo(1);
            warnGroup.add(button_cancel);
        }
        return warnGroup;
    }

}

export default Game;