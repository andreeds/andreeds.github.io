'use strict';

import {getLevels, getPositionByLevelId, getLevelByPoistion, getMinBestScore} from 'scripts/levels.js';

class Score {

    init(info) {
        this.score = info.score;
        this.evolutionId = info.evolutionId;
        this.minBestScore = getMinBestScore(this.evolutionId);
        this.evolutionPage = info.evolutionPage;
        // Save score to database
        this.game.storage.saveScore(this.evolutionId, this.score);
    }

    create() {
        this.game.stage.backgroundColor = '#FFF';

        // Blue Hexagon
        var tmpScoreHexa = this.game.cache.getImage('score_hexa');
        var score_hexa_x = (this.game.width - tmpScoreHexa.width) / 2;
        var score_hexa_y = (this.game.height - tmpScoreHexa.height) / 2;
        var score_hexa = this.game.add.sprite(
            score_hexa_x,
            score_hexa_y,
            'score_hexa'
        );

        
        // Score Energy
        // var score_val_x = score_hexa_x + tmpScoreHexa.width / 1.5;
        var score_val_x = score_hexa_x + tmpScoreHexa.width/2;
        var score_val_y = score_hexa_y + tmpScoreHexa.height/2;


        var scorte_colour_number = '#FFF';

        if ( this.score <= this.minBestScore ) {

            var tmpScoreStar = this.game.cache.getImage("score_star");
            var score_star = this.game.add.sprite(score_val_x, score_val_y, "score_star");
            score_star.anchor.setTo(0.5);
            this.game.add.tween(score_star.scale).to({x:1.3, y:1.3}).to({x:1.0, y:1.0}).loop(true).start();

            scorte_colour_number = 'gold';
        }
        
        var score_val = this.game.add.text(score_val_x, score_val_y, this.score.toString(), {"font": '70px Terminator', align: 'center', fill: scorte_colour_number, boundsAlignV: "middle", strokeThickness: 10});
        score_val.anchor.setTo(0.5);
        
        var score_energy = this.game.add.text(score_val_x, score_val_y+50, "energy used", {"font": '20px Terminator', align: 'center', fill: 'black', boundsAlignV: "middle"});
        score_energy.anchor.setTo(0.5);

        // Darwin
        var tmpScoreDarwin = this.game.cache.getImage('score_darwin');
        var score_darwin = this.game.add.sprite(
            this.game.width * 0.1,
            (this.game.height - (tmpScoreDarwin.height/4))*0.9,
            'score_darwin'
        );
        score_darwin.animations.add('huh');
        score_darwin.animations.play('huh', 32, true);

        var tmpScoreDNs = this.game.cache.getImage('score_dns_jump');
        var score_dns_jump = this.game.add.sprite(
            this.game.width * 0.1 + (tmpScoreDarwin.height/4) * 0.5,
            (this.game.height - (tmpScoreDNs.height/4))*0.95,
            'score_dns_jump'
        );
        score_dns_jump.animations.add('junp_score');
        score_dns_jump.animations.play('junp_score', 16, true);
        
        // Base Text Title

        // Text Title
        var score_title_x = this.game.width / 2;
        var score_title_y = score_hexa_y - 35 * 2.0;

        var tmpScoreBase = this.game.cache.getImage('score_base_title');
        var score_base_title = this.game.add.sprite(
            score_title_x,
            score_title_y,
            'score_base_title'
        );
        score_base_title.anchor.setTo(0.5);
        var score_title = this.game.add.text(score_title_x, score_title_y, "EVOLUTION\nEXPLAINED", {"font": '35px Terminator', align: 'center', fill: '#000', boundsAlignV: "middle"});
        score_title.anchor.setTo(0.5);
    
        // Buttons
        var tmpScoreButton = this.game.cache.getImage("score_back");

        var score_buttons_x = score_title_x;
        var ajustement_score_button_x = ((tmpScoreButton.width / 3) * 0.74);
        var score_buttons_y_upper = score_hexa_y + tmpScoreHexa.height;
        this.button_score_home = this.game.add.button(
        score_buttons_x, 
        score_buttons_y_upper, 
        'score_home', 
        this.goMenu, 
        this, 
        1, 0, 2);
        this.button_score_home.anchor.setTo(0.5);
            
        this.button_score_back = this.game.add.button(
        score_buttons_x - ajustement_score_button_x, 
        score_buttons_y_upper - tmpScoreButton.height * 0.5, 
        'score_back', 
        this.goEvolution, 
        this, 
        1, 0, 2);
        this.button_score_back.anchor.setTo(0.5);

        this.button_home_forward = this.game.add.button(
        score_buttons_x + ajustement_score_button_x, 
        score_buttons_y_upper - tmpScoreButton.height * 0.5, 
        'score_forward', 
        this.goNextPhase, 
        this,
        1, 0, 2);
        this.button_home_forward.anchor.setTo(0.5);


    }

    goEvolution() {
        this.game.state.start('evolution', true, false, {"page": this.evolutionPage});
    }

    goNextPhase() {
        var evoPos = 1 + getPositionByLevelId(this.evolutionId);
        var levels = getLevels();
        var nextEvoPos;
        var nextEvoPage;
        if (evoPos > levels.length - 1) {
            nextEvoPos = 0;
            nextEvoPage = 0;
        } else {
            nextEvoPos = evoPos;
            nextEvoPage = this.evolutionPage;
        }
        var nextEvolution = getLevelByPoistion(nextEvoPos);
        this.game.state.start("game", true, false, nextEvolution, nextEvoPage);
    }

    goMenu() {
        this.game.state.start('menu');
    }

}

export default Score;