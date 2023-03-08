'use strict';

class Credits {

    create() {
        this.game.stage.backgroundColor = '#FFF';

        var tmpCreditsText = this.game.cache.getImage('credits_text');
        var credits_text = this.game.add.sprite(
            (this.game.width - tmpCreditsText.width) / 2,
            this.game.height * 0.2,
            'credits_text'
        );

        var tmpCreditsDarwin = this.game.cache.getImage("credits_darwin");
        var credits_darwin_x = 0.1 * this.game.width;
        var credits_darwin_y = this.game.height - tmpCreditsDarwin.height - 0.1 * this.game.height;
        var credits_darwin = this.game.add.sprite(credits_darwin_x, credits_darwin_y, "credits_darwin");

        this.game.input.onDown.add(this.goMenu, this);
    }

    goMenu() {
        this.game.state.start('menu');
    }

}

export default Credits;