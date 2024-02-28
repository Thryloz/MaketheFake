
class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }
    preload(){
        this.load.bitmapFont('gem', './assets/gem.png', './assets/gem.xml'); // yoinked from example

        this.load.image('tap', './assets/tap.png')
    }

    create(){


        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.PLAY = this.add.bitmapText(width/2, 270, 'gem', 'LOGO', 128).setOrigin(0.5).setTint(0xffffff).setScale(1);
        this.CREDITS = this.add.bitmapText(width/2, 450, 'gem', 'CREDITS', 64).setOrigin(0.5).setTint(0xA020F0);
        this.instructions = this.add.bitmapText(width/2, 550, 'gem', 'Press SPACE to start', 32).setOrigin(0.5).setTint(0xFFFFFF);




    }

    update(){
        if (keySPACE.isDown){
            this.scene.start('playScene')
        }
    }

}