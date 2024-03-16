class Tutorial extends Phaser.Scene{
    constructor(){
        super('tutorialScene')
    }

    create(){
        this.font = 'gem'
        this.current_page = 0

        this.page_4 = this.add.image(width/2, height/2, 'tutorial', 'tutorial_4')
        this.page_4_instructions = this.add.bitmapText(525, height-100, font, 'Get as high of a score as you can in 2 minutes.\nGood luck!', 35).setOrigin(0.5).setTint(0xFFFFFF)
        this.page_4_exit = this.add.bitmapText(525, height - 25, font, 'Press SPACE to go back to menu').setOrigin(0.5).setTint(0xffffff)
        this.play_tween = this.tweens.add({
            targets: this.page_4_exit,
            duration: 800,
            alpha: { from: 1, to: 0},
            yoyo: true,
            repeat: -1,
        });

        this.page_3 = this.add.image(width/2, height/2, 'tutorial', 'tutorial_3')
        this.page_3_instructions = this.add.bitmapText(525, height-100, font, 'Enemies will appear periodically on the screen.\nIf you have ammo, press SHIFT to enter aim mode.\nA reticle will appear which you can move using\nWASD or ARROW KEYS and SPACE to shoot.\nTake them down before they reach you.', 35).setOrigin(0.5).setTint(0xFFFFFF)
        this.page_3_instructions.setWordTint('reticle', 1, true, 0xA020F0)
        this.page_3_instructions.setWordTint('SHIFT', 1, true, 0xff0000)
        this.page_3_instructions.setWordTint('WASD', 1, true, 0xff0000)
        this.page_3_instructions.setWordTint('ARROW', 1, true, 0xff0000)
        this.page_3_instructions.setWordTint('KEYS', 1, true, 0xff0000)
        this.page_3_instructions.setWordTint('SPACE', 1, true, 0xff0000)

        this.page_2 = this.add.image(width/2, height/2, 'tutorial', 'tutorial_2')
        this.page_2_instructions = this.add.bitmapText(600, height/2, font, 'As you hit notes, you\'ll build up \na charge indicated on the right side\nof the screen. When that charge fills up,\nyou will get 1 ammo.', 35).setOrigin(0.5).setTint(0xFFFFFF)

        this.page_1 = this.add.image(width/2, height/2, 'tutorial', 'tutorial_1')
        this.page_1_instructions = this.add.bitmapText(525, height-100, font, 'The higher the combo, the faster the notes will fall.\n You can also manually change the speed with TAB.\n Note: this will disable speed automatically changing.', 35).setOrigin(0.5).setTint(0xFFFFFF)
        this.page_1_instructions.setWordTint('TAB.', 1, true, 0xA020F0)
        this.page_1_instructions.setCharacterTint(103, 53, true, 0xff0000)

        this.page_0 = this.add.image(width/2, height/2, 'tutorial', 'tutorial_0')
        this.page_0_instructions = this.add.bitmapText(500, height-100, font, 'Notes will fall down from the top of the screen.\nTap their respective lanes when they reach the RED line.', 35).setOrigin(0.5).setTint(0xFFFFFF)
        this.page_0_instructions.setWordTint('RED', 1, true, 0xff0000)


        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    }



    update(){
        if (this.keySPACE.isDown){
            this.scene.start('menuScene')
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            switch(this.current_page){
                case 0:
                    this.tweens.add({
                        targets: [this.page_0, this.page_0_instructions],
                        x: -width,
                        duration: 200
                    })
                    this.current_page++
                    break;
                case 1:
                    this.tweens.add({
                        targets: [this.page_1, this.page_1_instructions],
                        x: -width,
                        duration: 200
                    })
                    this.current_page++
                    break;
                case 2:
                    this.tweens.add({
                        targets: [this.page_2, this.page_2_instructions],
                        x: -width,
                        duration: 200
                    })
                    this.current_page++
                    break;
                case 3:
                    this.tweens.add({
                        targets: [this.page_3, this.page_3_instructions],
                        x: -width,
                        duration: 200
                    })
                    this.current_page++
                    break;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            switch(this.current_page){
                case 1:
                    this.tweens.add({
                        targets: [this.page_0, this.page_0_instructions],
                        x: width/2,
                        duration: 200
                    })
                    this.current_page--
                    break;
                case 2:
                    this.tweens.add({
                        targets: [this.page_1, this.page_1_instructions],
                        x: width/2,
                        duration: 200
                    })
                    this.current_page--
                    break;
                case 3:
                    this.tweens.add({
                        targets: [this.page_2, this.page_2_instructions],
                        x: width/2,
                        duration: 200
                    })
                    this.current_page--
                    break;
                case 4:
                    this.tweens.add({
                        targets: [this.page_3, this.page_3_instructions],
                        x: width/2,
                        duration: 200
                    })
                    this.current_page--
                    break;
            }
        }
    }
}