import Boot from 'scripts/states/boot.js';
import Preload from 'scripts/states/preload.js';
import Menu from 'scripts/states/menu.js';
import Evolution from 'scripts/states/evolution.js';
import Credits from 'scripts/states/credits.js';
import Game from 'scripts/states/game.js';
import Score from 'scripts/states/score.js';
import Pages from 'scripts/states/pages.js';

class Games extends Phaser.Game {
    constructor() {

        // Guarantees Landscape
        if (!(window.innerHeight > window.innerWidth)) {
            // Code for fixing size
            /** Config part */
            var FIXED_SIZE    = 768;
            var FIXED_MEASURE = 'Height';

            /** Name maping */
            var fixedName  = FIXED_MEASURE;
            var resName    = fixedName === 'Height' ? 'Width' : 'Height';
            var FIXED_NAME = fixedName.toUpperCase();
            var RES_NAME   = resName.toUpperCase();

            /** Measures of document */
            var documentElement = document.documentElement;
            var documentFixed   = documentElement['client' + fixedName];
            var documentRes     = documentElement['client' + resName];
            var ratio           = documentRes / documentFixed;

            /** Canvas measures */
            var canvasFixed = FIXED_SIZE;
            var canvasRes   = FIXED_SIZE * ratio;

            var screen = {};
            screen['CANVAS_' + FIXED_NAME] = canvasFixed;
            screen['CANVAS_' + RES_NAME] = canvasRes;

            /* Fix for CocoonJS */
            window.width  = navigator.isCocoonJS  ? window.innerWidth  : screen.CANVAS_WIDTH;
            window.height = navigator.isCocoonJS  ? window.innerHeight : screen.CANVAS_HEIGHT;


            super({
                width: screen.CANVAS_WIDTH,
                // width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                height: screen.CANVAS_HEIGHT,
                // height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                transparent: false,
                enableDebug: true
            });

            this.state.add('boot', Boot);
            this.state.add('preload', Preload);
            this.state.add('menu', Menu);
            this.state.add('evolution', Evolution);
            this.state.add('credits', Credits);
            this.state.add('game', Game);
            this.state.add('score', Score);
            this.state.add('pages', Pages);

            this.state.start('boot');
        } else {
            alertify.alert("Device Orientation","This game is better run in landscape mode. Please, turn your device sideways and reload the page.");
        }
    }
}

export default Games;