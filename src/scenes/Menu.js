
class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }
    preload(){
        this.load.bitmapFont('gem', './assets/gem.png', './assets/gem.xml'); // yoinked from example
        this.load.image('logo', './assets/logo.png');
        //this.load.image('tap', './assets/tap.png')
        //this.load.image('logo', './assets/logo.png')
        
    }

    create(){

        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.logo = this.add.image(width/2, 220, 'logo').setScale(1)
        this.tweens.add({
            targets: this.logo,
            duration: 2500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1,
            onYoyo: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onYoyoScope: this
        });

        this.PLAY = this.add.bitmapText(width/2, 400, 'gem', 'PLAY', 64).setOrigin(0.5).setTint(0xA020F0).setScale(1.2);
        this.TUTORIAL = this.add.bitmapText(width/2, 500, 'gem', 'TUTORIAL', 64).setOrigin(0.5).setTint(0xFFFFFF);
        this.CREDITS = this.add.bitmapText(width/2, 600, 'gem', 'CREDITS', 64).setOrigin(0.5).setTint(0xA020F0);


        this.cursor = 400


    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyDOWN)){
            if (this.cursor == 400){
                this.cursor += 100
                this.PLAY.setScale(1)
                this.TUTORIAL.setScale(1.2)
            } else if (this.cursor == 500){
                this.cursor += 100
                this.TUTORIAL.setScale(1)
                this.CREDITS.setScale(1.2)
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyUP)){
            if (this.cursor == 600){
                this.cursor -= 100
                this.CREDITS.setScale(1)
                this.TUTORIAL.setScale(1.2)
            } else if (this.cursor == 500){
                this.cursor -= 100
                this.TUTORIAL.setScale(1)
                this.PLAY.setScale(1.2)
            } 
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            switch(this.cursor){
                case (400):
                    this.tweens.add({
                        targets: this.logo,
                        duration: 2500,
                        scale: { from: 1, to: 15 },
                        alpha: { from: 1, to: 0},
                        repeat: 0,
                    });
                    this.PLAY.setAlpha(0)
                    this.TUTORIAL.setAlpha(0)
                    this.CREDITS.setAlpha(0)
                    this.time.delayedCall(2500, () => {
                        this.scene.start('playScene');
                    }, null, this)
                    
                    break;
                case (500):
                    this.scene.start('tutorialScene')
                    break;
                case (600):
                    this.scene.start('creditsScene')
                    break;
                default:
                    break;
            }
        }

    }

}