'use strict';
import {getPage} from 'scripts/pages.js';

class Pages {

    constructor() {
    }

    init(pageInfo) {
        this.pageName = pageInfo["pageName"];
        this.pageNumber = pageInfo["pageNumber"];
        this.pages = getPage(this.pageName);
    }

    create() {
        this.game.stage.backgroundColor = '#FFF';

        // Show Page
        var tmpCreditsText = this.game.cache.getImage(this.pages[this.pageNumber]);
        var credits_text = this.game.add.sprite(
            (this.game.width - tmpCreditsText.width) / 2,
            (this.game.height - tmpCreditsText.height) / 2,
            this.pages[this.pageNumber]
        );
        // credits_text.anchor.setTo(0.5);


        // Back arrow
        if (this.pageNumber > 0) {
            var tmpEvolutionBack = this.game.cache.getImage("evolution_back");
            this.button_score_back = this.game.add.button(
            this.game.width * 0.05, 
            this.game.height * 0.5 - tmpEvolutionBack.height * 1, 
            'evolution_back', 
            function(){ this.game.state.start('pages', true,false, {"pageName": this.pageName, "pageNumber": this.pageNumber - 1}); }, 
            this,
            1, 0, 2);
            this.button_score_back.anchor.setTo(0);
        }

        // Forward arrow
        if (this.pageNumber < (this.pages.length-1)) {
            var tmpEvolutionForward = this.game.cache.getImage("evolution_forward");
            this.button_home_forward = this.game.add.button(
            this.game.width * 0.95, 
            this.game.height * 0.5, 
            'evolution_forward', 
            function(){ this.game.state.start('pages', true,false, {"pageName": this.pageName, "pageNumber": this.pageNumber + 1});}, 
            this,
            1, 0, 2);
            this.button_home_forward.anchor.setTo(1);
        }

        // Draw home button
        var tmpEvolutionHome = this.game.cache.getImage("evolution_home");
        this.button_score_home = this.game.add.button(
        this.game.width * 0.95, 
        this.game.height * 0.95, 
        'evolution_home', 
        function(){ this.game.state.start('menu');}, 
        this, 
        1, 0, 2);
        this.button_score_home.anchor.setTo(1);
    }
}

export default Pages;