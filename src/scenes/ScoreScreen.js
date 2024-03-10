class ScoreScreen extends Phaser.Scene{
    constructor(){
        super('scoreScreenScene')
    }


    create(){
        this.font = 'gem'
        this.maxComboText = this.add.bitmapText(width/2, 100, this.font, `Combo    ${maxCombo}`, 50).setOrigin(0.5).setTint(0xFFFFFF);
        this.excellentText = this.add.bitmapText(width/2, 200, this.font, `Excellent    ${excellentCOUNT}`, 50).setOrigin(0.5).setTint(0xFFFFFF);
        this.perfectText = this.add.bitmapText(width/2, 300, this.font, `Perfect    ${perfectCOUNT}`, 50).setOrigin(0.5).setTint(0xFFFFFF);
        this.goodText = this.add.bitmapText(width/2, 400, this.font, `Good    ${goodCOUNT}`, 50).setOrigin(0.5).setTint(0xFFFFFF);
        this.badText = this.add.bitmapText(width/2, 500, this.font, `Bad    ${badCOUNT}`, 50).setOrigin(0.5).setTint(0xFFFFFF);
        this.missText = this.add.bitmapText(width/2, 600, this.font, `Miss    ${missCOUNT}`, 50).setOrigin(0.5).setTint(0xFFFFFF);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update(){
        if (keySPACE.isDown){
            this.scene.start('playScene')
        }
    }

} 