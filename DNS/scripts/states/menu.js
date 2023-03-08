'use strict';

class Menu {

    create() {
        this.game.stage.backgroundColor = '#FFF';

        var whiteBack = this.game.add.bitmapData(this.game.width, this.game.height);
        whiteBack.ctx.beginPath();
        whiteBack.ctx.rect(0, 0, this.game.width, this.game.height);
        whiteBack.ctx.fillStyle = "white";
        whiteBack.ctx.closePath();
        whiteBack.ctx.fill();
        this.game.add.sprite(0, 0, whiteBack);

        // >>> MENU
        var tmpMenuLogoBase = this.game.cache.getImage('menu_logo_base');
        // var tmpMenuLogoBase = this.game.cache.getImage('menu_logo_main_dark');
        var tmpMenuLogoMain = this.game.cache.getImage('menu_logo_main');
    
        var menu_logo_x = (this.game.width - (tmpMenuLogoBase.width / 9) * 2) / 2;
        var menu_logo_y = this.game.height * 0.15;
        
        // logo pink base
        var menu_logo_base = this.game.add.sprite(
            menu_logo_x,
            menu_logo_y,
            'menu_logo_base'
        );
        menu_logo_base.scale.setTo(2,2);
        menu_logo_base.animations.add('logo_base');
        menu_logo_base.animations.play('logo_base', 7, true);

        // logo black 
        var menu_logo_main_dark = this.game.add.sprite(
            menu_logo_x,
            menu_logo_y,
            'menu_logo_main_dark'
        );
        menu_logo_main_dark.animations.add('logo_base_main_dark');
        menu_logo_main_dark.animations.play('logo_base_main_dark', 12, true);

        // logo blue 
        var menu_logo_main = this.game.add.sprite(
            menu_logo_x,
            menu_logo_y,
            'menu_logo_main'
        );

        // >>> START button
        var tmpMenuStart = this.game.cache.getImage("menu_start");
        var menu_start_x = (this.game.width - (tmpMenuStart.width / 3)) / 2;
        var menu_start_y = menu_logo_y + (tmpMenuLogoBase.height / 9) * 2 + (tmpMenuStart.height * 1.5);

        var button_start = this.game.add.button(
            menu_start_x, 
            menu_start_y, 
            'menu_start', 
            this.goEvolution, 
            this, 
            1, 0, 2);

        // >>> HELP button
        var tmpMenuCredits = this.game.cache.getImage("menu_help");
        var button_credits = this.game.add.button(
            menu_start_x, 
            1.5 * tmpMenuStart.height + menu_start_y, 
            'menu_help', 
            function(){this.goPage("help")}, 
            this, 
            1, 0, 2);

        // >>> CREDITS button
        var tmpMenuCredits = this.game.cache.getImage("menu_credits");
        var button_credits = this.game.add.button(
            menu_start_x, 
            3 * tmpMenuStart.height + menu_start_y, 
            'menu_credits', 
            function(){this.goPage("credits")},
            this, 
            1, 0, 2);
        
        // >>> DARWIN
        var tmpMenuDarwin = this.game.cache.getImage("menu_darwin");
        var menu_darwin_x = this.game.width - (tmpMenuDarwin.width/6) - 0.1 * this.game.width;
        var menu_darwin_y = this.game.height - (tmpMenuDarwin.height/6) - 0.1 * this.game.height;
        var menu_darwin = this.game.add.sprite(menu_darwin_x, menu_darwin_y, "menu_darwin");
        menu_darwin.animations.add('observe');
        menu_darwin.animations.play('observe', 10, true);

        // >>> DNS
        var tmpMenuDNSIdle = this.game.cache.getImage("main_menu_dns_idle");
        var menu_DNsIdle = this.game.add.sprite(menu_darwin_x, menu_darwin_y + (tmpMenuDarwin.height/6) + (tmpMenuDNSIdle.height/6)*0.25, "main_menu_dns_idle");
        menu_DNsIdle.anchor.setTo(1);
        var dnIdleAnim = menu_DNsIdle.animations.add('dnIdle');
        dnIdleAnim.onComplete.add(function(){

            var tmpMenuDNSToJump = this.game.cache.getImage("main_menu_dns_tojump");
            var menu_DNsToJump= this.game.add.sprite(menu_darwin_x, menu_darwin_y + (tmpMenuDarwin.height/6) + (tmpMenuDNSIdle.height/6)*0.25, "main_menu_dns_tojump");
            menu_DNsToJump.anchor.setTo(1);
            var dnToJumpAnim = menu_DNsToJump.animations.add('dnToJump');

            dnToJumpAnim.onComplete.add(function(){
                var tmpMenuDNSJump = this.game.cache.getImage("main_menu_dns_jump");
                var menu_DNsJump= this.game.add.sprite(menu_darwin_x, menu_darwin_y + (tmpMenuDarwin.height/6) + (tmpMenuDNSIdle.height/6)*0.25, "main_menu_dns_jump");
                menu_DNsJump.anchor.setTo(1);
                var dnJumpAnim = menu_DNsJump.animations.add('dnJump');
                dnJumpAnim.play(16, true);
            }, this);
            dnToJumpAnim.play(12, false, true);
        }, this);
        dnIdleAnim.play(12, false, true);

    }

    goEvolution() {
        this.game.state.start('evolution', true, false, {"page": 0});
    }

    goPage(pageName) {
        this.game.state.start('pages', true,false, {"pageName": pageName, "pageNumber": 0});
    }
}

export default Menu;