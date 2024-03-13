class Tutorial extends Phaser.Scene{
    constructor(){
        super('tutorialScene')
    }

    create(){
        this.font = 'gem'

        this.add.bitmapText(50, 50, this.font, 'KEYS: (A) (S) (;) (\')', 50).setTint(0xffffff);
        this.add.bitmapText(50, 150, this.font, 'TAB: Opens Speed Control Panel', 50).setTint(0xffffff);
        this.add.bitmapText(50, 250, this.font, 'SHIFT: Enters Aim Mode', 50).setTint(0xffffff);
        this.add.bitmapText(50, 330, this.font, '   When in aim mode, use WASD or arrow keys to move', 30).setTint(0xffffff);

        this.add.rectangle(game.config.width/2, 400, game.config.width, 5, 0xFF0000, 0.5)
        this.add.bitmapText(50, 430, this.font, 'Tap the notes when they reach the red line', 30).setTint(0xffffff);
        this.add.bitmapText(50, 480, this.font, 'This charges your ammo to enter aim mode', 30).setTint(0xffffff);
        this.add.bitmapText(50, 530, this.font, 'Shoot the enemies before they can reach you', 30).setTint(0xffffff);
        this.add.bitmapText(50, 580, this.font, 'Get as high of a score as you can', 30).setTint(0xffffff);
        this.add.bitmapText(width/2, 680, this.font, 'Press SPACE to go back to Menu', 50).setTint(0xffffff).setOrigin(0.5);

        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update(){
        if (this.keySPACE.isDown){
            this.scene.start('menuScene')
        }
    }
}