'use strict';

class Boot {
    preload() {
        this.load.image('preloader', 'assets/preloader.gif');
    }

    create() {
        this.game.stage.backgroundColor = "#000";
        this.resizeGame();
        this.game.state.start('preload');
    }

    resizeGame() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.forceLandscape = true;
        this.game.scale.refresh();
    };
}

export default Boot;