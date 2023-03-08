'use strict';

import Storage from 'scripts/storage.js';

class Preload {
    preload() {

        // load database into game
        this.game.storage = new Storage();

        // Add preload sprite
        var tmpPreload = this.game.cache.getImage('preloader');
        this.loadingSprite = this.add.sprite(
            (this.game.width - tmpPreload.width) / 2,
            (this.game.height - tmpPreload.height) / 2,
            'preloader'
        );

        // run preload sprite
        this.game.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.game.load.setPreloadSprite(this.loadingSprite);

        // Menu Assets
        this.game.load.image('menu_logo_main', 'assets/menu/logo_main_colour.png');
        // this.game.load.image('main_menu_dns', 'assets/menu/main_menu_dns.png');
        this.game.load.spritesheet('menu_logo_main_dark', 'assets/menu/logo_main_dark.png', 473, 231, 49);
        this.game.load.spritesheet('menu_logo_base', 'assets/menu/logo_base_white_50.png', 240, 120 , 81);
        this.game.load.spritesheet('menu_start', 'assets/menu/main_menu_start_spritesheet.png', 232, 40);
        this.game.load.spritesheet('menu_help', 'assets/menu/main_menu_help_spritesheet.png', 232, 40);
        this.game.load.spritesheet('menu_credits', 'assets/menu/main_menu_credits_spritesheet.png', 282, 40);
        this.game.load.spritesheet('menu_darwin', 'assets/menu/main_menu_darwin_animation_observe.png', 209, 167, 35);
        this.game.load.spritesheet('main_menu_dns_idle', 'assets/menu/main_menu_dns_spritesheet_idle.png', 150, 75, 25); //12fps
        this.game.load.spritesheet('main_menu_dns_tojump', 'assets/menu/main_menu_dns_spritesheet_tojump.png', 150, 75, 25); //12fps
        this.game.load.spritesheet('main_menu_dns_jump', 'assets/menu/main_menu_dns_spritesheet_jump.png', 150, 75, 16); //16fps

        // Warning Assets
        this.game.load.image('warning_text', 'assets/warning/warning_text_box.png');
        this.game.load.image('warning_text_box_replication', 'assets/warning/warning_text_box_replication.png');
        this.game.load.spritesheet('warning_ok', 'assets/warning/warinng_ok.png', 112, 100);
        this.game.load.spritesheet('warning_cancel', 'assets/warning/warinng_cancel.png', 112, 100);

        // Credits Assets
        this.game.load.image('credits', 'assets/pages/credits_text.png');
        this.game.load.image('about', 'assets/pages/credits_about.png');

        // Pages Assets
        // Help page
        this.game.load.image('help_1', 'assets/pages/help_1.png');
        this.game.load.image('help_2', 'assets/pages/help_2.png');
        this.game.load.image('help_3', 'assets/pages/help_3.png');
        this.game.load.image('help_4', 'assets/pages/help_4.png');
        this.game.load.image('help_5', 'assets/pages/help_5.png');
        this.game.load.image('help_6', 'assets/pages/help_6.png');

        // Evolution Assets
        this.game.load.image('evolution_plaque_default', 'assets/evolution/evolution_plaque.png');
        this.game.load.image('evolution_plaque_1', 'assets/evolution/evolution_plaque_1.png');
        this.game.load.image('evolution_plaque_2', 'assets/evolution/evolution_plaque_2.png');
        this.game.load.image('evolution_plaque_3', 'assets/evolution/evolution_plaque_3.png');
        this.game.load.image('evolution_plaque_4', 'assets/evolution/evolution_plaque_4.png');
        this.game.load.image('evolution_plaque_5', 'assets/evolution/evolution_plaque_5.png');
        this.game.load.image('evolution_plaque_6', 'assets/evolution/evolution_plaque_6.png');
        this.game.load.image('evolution_plaque_7', 'assets/evolution/evolution_plaque_7.png');
        this.game.load.image('evolution_plaque_8', 'assets/evolution/evolution_plaque_8.png');
        this.game.load.image('evolution_plaque_9', 'assets/evolution/evolution_plaque_9.png');
        this.game.load.image('evolution_plaque_10', 'assets/evolution/evolution_plaque_10.png');
        this.game.load.image('evolution_plaque_11', 'assets/evolution/evolution_plaque_11.png');
        this.game.load.image('evolution_plaque_12', 'assets/evolution/evolution_plaque_12.png');
        this.game.load.image('evolution_plaque_13', 'assets/evolution/evolution_plaque_13.png');
        this.game.load.image('evolution_plaque_14', 'assets/evolution/evolution_plaque_14.png');
        this.game.load.image('evolution_plaque_15', 'assets/evolution/evolution_plaque_15.png');
        this.game.load.image('evolution_plaque_16', 'assets/evolution/evolution_plaque_16.png');
        this.game.load.image('evolution_plaque_17', 'assets/evolution/evolution_plaque_17.png');
        this.game.load.image('evolution_plaque_18', 'assets/evolution/evolution_plaque_18.png');
        this.game.load.image('evolution_plaque_19', 'assets/evolution/evolution_plaque_19.png');
        this.game.load.image('evolution_plaque_20', 'assets/evolution/evolution_plaque_20.png');
        this.game.load.image('evolution_plaque_21', 'assets/evolution/evolution_plaque_21.png');
        this.game.load.image('evolution_plaque_22', 'assets/evolution/evolution_plaque_22.png');
        this.game.load.image('evolution_plaque_23', 'assets/evolution/evolution_plaque_23.png');
        this.game.load.image('evolution_plaque_24', 'assets/evolution/evolution_plaque_24.png');
        this.game.load.image('evolution_check_gold', 'assets/evolution/phases_completed_check_gold.png');
        this.game.load.image('evolution_check', 'assets/evolution/phases_completed_check.png');
        this.game.load.image('shadow_darwin', 'assets/evolution/shadow_darwin.png');
        this.game.load.image('microscope_for_darwin', 'assets/evolution/microscope_for_darwin.png');
        this.game.load.image('mircrooscope_view', 'assets/evolution/mircrooscope_view.png');
        this.game.load.spritesheet('evolution_darwin', 'assets/evolution/evolution_darwin_spritsheet_oberserve.png', 250, 225, 36);
        this.game.load.spritesheet('evolution_back', 'assets/evolution/evolution_back_spritesheet.png', 112, 100);
        this.game.load.spritesheet('evolution_forward', 'assets/evolution/evolution_forward_spritesheet.png', 112, 100);
        this.game.load.spritesheet('evolution_home', 'assets/evolution/evolution_home_spritesheet.png', 112, 100);
        this.game.load.spritesheet('evolution_dns_idle', 'assets/evolution/evolution_dns_spritesheet_idle.png', 150, 75, 25); //12fps
    
        // Game Assets
        this.game.load.image('grid', 'assets/grid.jpeg');

        this.game.load.spritesheet('lab_back', 'assets/lab/lab_back_spritesheet.png', 112, 100);
        this.game.load.spritesheet('lab_reset', 'assets/lab/lab_reset_spritesheet.png', 112, 100);
        this.game.load.spritesheet('lab_drag', 'assets/lab/lab_drag_spritesheet.png', 112, 100);
        this.game.load.image('lab_counter', 'assets/lab/lab_counter.png');
        this.game.load.spritesheet('lab_glass', 'assets/lab/lab_glass_spritesheet.png', 112, 100);
        this.game.load.spritesheet('lab_replicate', 'assets/lab/lab_replicate_spritesheet.png', 112, 100);
        this.game.load.spritesheet('lab_delete', 'assets/lab/lab_delete_spritesheet.png', 112, 100);
        this.game.load.image('a1', 'assets/tutorials/a1.png');
        this.game.load.image('a2', 'assets/tutorials/a2.png');
        this.game.load.image('a3', 'assets/tutorials/a3.png');
        this.game.load.image('b1', 'assets/tutorials/b1.png');
        this.game.load.image('b2', 'assets/tutorials/b2.png');
        this.game.load.image('b3', 'assets/tutorials/b3.png');
        this.game.load.image('c1', 'assets/tutorials/c1.png');
        this.game.load.image('d1', 'assets/tutorials/d1.png');
        this.game.load.image('e1', 'assets/tutorials/e1.png');
        this.game.load.image('e2', 'assets/tutorials/e2.png');
        this.game.load.image('f1', 'assets/tutorials/f1.png');
        this.game.load.image('g1', 'assets/tutorials/g1.png');
        this.game.load.image('h', 'assets/tutorials/h.png');
        this.game.load.image('z', 'assets/tutorials/z.png');


        //Score Assets
        this.game.load.image('score_hexa', 'assets/score/score_hexa.png');
        // this.game.load.image('score_darwin', 'assets/score/score_darwin.png');
        this.game.load.image('score_base_title', 'assets/score/score_base_title.png');
        this.game.load.image('score_base_star', 'assets/score/score_base_star.png');
        this.game.load.image('score_star', 'assets/score/score_star.png');
        this.game.load.spritesheet('score_back', 'assets/score/score_back_spritesheet.png', 112, 100);
        this.game.load.spritesheet('score_forward', 'assets/score/score_forward_spritesheet.png', 112, 100);
        this.game.load.spritesheet('score_home', 'assets/score/score_home_spritesheet.png', 112, 100);
        this.game.load.spritesheet('score_darwin', 'assets/score/score_darwin_spritesheet_huh.png', 127, 169 , 16);
        this.game.load.spritesheet('score_dns_jump', 'assets/score/score_dns_spritesheet_jump.png', 150, 75, 16); //16fps

        this.game.time.advancedTiming = true;
    }

    onLoadComplete() {
        this.game.state.start('menu', true, false);
    }
}

export default Preload;