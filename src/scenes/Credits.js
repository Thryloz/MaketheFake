class Credits extends Phaser.Scene{
    constructor(){
        super("creditsScene")
    }

    create() {        
        this.CREDITS = this.add.bitmapText(140, 60, 'gem', 'CREDITS', 64).setOrigin(0.5).setTint(0xffffff);

        if (!this.silverwolf_gif){
            this.silverwolf_gif = this.anims.create({
                key: 'silverwolf_gif_animation',
                frameRate: 24,
                repeat: -1,
                frames: this.anims.generateFrameNames('silverwolf_gif', {
                    prefix: 'frame_',
                    suffix: '_delay-0.05s',
                    start: 0,
                    end: 145,
                    zeroPad: 3
                }),
            })
        }
        this.gif_base = this.add.sprite(width/2, height/2 - 10, 'silverwolf_gif', "frame_000_delay-0.05s")
        this.gif_base.play('silverwolf_gif_animation')
        // it took like an hour to figure out how to add a gif to phaser


        let font_size = 24;
        this.add.bitmapText(332, 120, 'gem', 'Programming, Art, and SFX by Jim Lee', font_size).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(435, 170, 'gem', 'Design and Inspiration by Hoyoverse: Honkai Star Rail', font_size).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(390, 550, 'gem', 'BGM: Got a Date? (tnbee mix) by tnbee\nhttps://www.youtube.com/watch?v=RLdkD-D9Asw', font_size).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(510, 600, 'gem', 'Font name: gem (professor gave it to us and I can\'t find source', font_size).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(500, 650, 'gem', 'And HUGE thanks to Nathan Altice, Nate Laffan, and Jimmy Teng\nfor teaching and to all the playtesters of CMPM120 Winter 2024', 24).setOrigin(0.5).setTint(0xffffff);



        this.return = this.add.bitmapText(width/2, 700, 'gem', `Press SPACE to return`, 24).setOrigin(0.5).setTint(0xffffff);
        this.tweens.add({
            targets: this.return,
            duration: 800,
            alpha: { from: 1, to: 0},
            yoyo: true,
            repeat: -1,
        });
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){ 
            this.scene.start('menuScene')
        }
    }
}