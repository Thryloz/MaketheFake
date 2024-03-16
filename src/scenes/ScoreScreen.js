class ScoreScreen extends Phaser.Scene{
    constructor(){
        super('scoreScreenScene')
    }
    preload(){
        this.load.bitmapFont('gem', './assets/gem.png', './assets/gem.xml');
    }

    create(){
        this.font = 'gem'
        if (gameOverFail){
            this.STAGE_CLEAR = this.add.bitmapText(350, 150, this.font, 'STAGE FAILED', 100).setOrigin(0.5).setTint(0x9abce0);
        } else if (gameOverPass){
            this.STAGE_CLEAR = this.add.bitmapText(350, 150, this.font, 'STAGE CLEAR', 100).setOrigin(0.5).setTint(0x9abce0);
        }
        this.add.rectangle(300, 220, game.config.width, 5, 0xd0cc80, 0.5)

        this.accuracy = ((300*excellentCOUNT) + (300 * perfectCOUNT) + (100 * goodCOUNT) + (50 * badCOUNT)) / (300 * amountOfNotes)
        this.accuracy = (this.accuracy * 100).toFixed(2)

        this.accuracyTEXT = this.add.bitmapText(100, 230, this.font, `Acc: ${this.accuracy}%`, 40).setTint(0xffffff);

        this.scoreTEXT = this.add.bitmapText(100, 300, this.font, score, 100).setTint(0xffffff);
        this.maxComboText = this.add.bitmapText(100, 450, this.font, `Combo    ${maxCombo}`, 30).setTint(0x9abce0);
        this.excellentText = this.add.bitmapText(400, 450, this.font, `Excellent  ${excellentCOUNT}`, 30).setTint(0x9abce0);
        this.perfectText = this.add.bitmapText(100, 525, this.font, `Perfect  ${perfectCOUNT}`, 30).setTint(0x9a81d3);
        this.goodText = this.add.bitmapText(400, 525, this.font, `Good       ${goodCOUNT}`, 30).setTint(0x9a81d3);
        this.badText = this.add.bitmapText(100, 600, this.font, `Bad      ${badCOUNT}`, 30).setTint(0x4408b7);
        this.missText = this.add.bitmapText(400, 600, this.font, `Miss       ${missCOUNT}`, 30).setTint(0x7c829e);

        this.space = this.add.bitmapText(700, 600, this.font, 'SPACE to go to Menu', 30).setTint(0xFFFFFF);
        this.r = this.add.bitmapText(700, 650, this.font, 'R to play again', 30).setTint(0xFFFFFF);

        this.tweens.add({
            targets: [this.space, this.r],
            duration: 1000,
            alpha: { from: 1, to: 0},
            yoyo: true,
            repeat: -1,
        });
        if (gameOverFail){
            this.F = this.add.bitmapText(750, 300, this.font, 'F', 200).setTint(0xFFFFFF);
        } else if (gameOverPass){
            if (this.accuracy > 94.99){
                this.S = this.add.bitmapText(750, 300, this.font, 'S', 200).setTint(0xFFFFFF);
            } else if (this.accuracy > 91.99){
                this.A = this.add.bitmapText(750, 300, this.font, 'A', 200).setTint(0xFFFFFF);
            } else if (this.accuracy > 84.99){
                this.B = this.add.bitmapText(750, 300, this.font, 'B', 200).setTint(0xFFFFFF);
            } else if (this.accuracy > 69.99){
                this.C = this.add.bitmapText(750, 300, this.font, 'C', 200).setTint(0xFFFFFF);
            } else if (this.accuracy > 49.99){
                this.D = this.add.bitmapText(750, 300, this.font, 'D', 200).setTint(0xFFFFFF);
            } else {
                this.F = this.add.bitmapText(750, 300, this.font, 'F', 200).setTint(0xFFFFFF);
            }
        }
        

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    update(){
        if (keyR.isDown){
            this.scene.start('playScene')
        }

        if (keySPACE.isDown){
            this.scene.start('menuScene')
        }
    }

} 