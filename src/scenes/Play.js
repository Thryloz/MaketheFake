class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    // delete later
    preload(){
        this.load.bitmapFont('gem', './assets/gem.png', './assets/gem.xml');
    }

    create(){

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        keyFIRST = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keySECOND = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyTHIRD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEMICOLON)
        keyFOURTH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.QUOTES)

        visibleZone = this.add.rectangle(game.config.width/2, game.config.height-150, game.config.width, 2, 0xFF0000, 0.5)
        excellentZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 15, 0x4169E1, 0)
        perfectZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 40, 0xA020F0, 0)
        goodZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 70, 0xA02AF0, 0)
        badZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 100, 0xAAAAF0, 0)
        missZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 150, 0xAAAAF0, 0)

        excellentTEXT = this.add.bitmapText(width/2, visibleZone.y-150, 'gem', 'EXCELLENT', 50).setOrigin(0.5).setTint(0xFFFFFF).setAlpha(0);
        perfectTEXT = this.add.bitmapText(width/2, visibleZone.y-150, 'gem', 'PERFECT', 50).setOrigin(0.5).setTint(0xFFFFFF).setAlpha(0);
        goodTEXT = this.add.bitmapText(width/2, visibleZone.y-150, 'gem', 'GOOD', 50).setOrigin(0.5).setTint(0xFFFFFF).setAlpha(0);
        badTEXT = this.add.bitmapText(width/2, visibleZone.y-150, 'gem', 'BAD', 50).setOrigin(0.5).setTint(0xFFFFFF).setAlpha(0);
        missTEXT = this.add.bitmapText(width/2, visibleZone.y-150, 'gem', 'MISS', 50).setOrigin(0.5).setTint(0xFFFFFF).setAlpha(0);

        keyOne = this.add.image(LANE_ONE, game.config.height-100, "tap").setAlpha(0).setScale(3);
        keyTwo =  this.add.image(LANE_TWO, game.config.height-100, "tap").setAlpha(0).setScale(3);
        keyThree = this.add.image(LANE_THREE, game.config.height-100, "tap").setAlpha(0).setScale(3);
        keyFour = this.add.image(LANE_FOUR, game.config.height-100, "tap").setAlpha(0).setScale(3);


        timeBetweenNotes = 200


        this.noteGroup = this.add.group({
            runChildUpdate: true    
        });

        this.time.addEvent({
            delay: timeBetweenNotes,
            callback: () => {
                this.addNote()
            },
            loop: true
        })

        
    }

    addNote() {
        let note = new Note(this, 0);
        this.noteGroup.add(note)
    }

    update(){
        // 15 40 70 100 150

        if (Phaser.Input.Keyboard.JustDown(keyFIRST)){
            this.tweens.add({
                targets: keyOne,
                alpha: { from: 1, to: 0},
                ease: 'Sine.InOut',
                duration: 450,
                repeat: 0,
            });
            var laneOneNote = Phaser.Actions.GetFirst(this.noteGroup.getChildren(), {x: LANE_ONE} )

            if (laneOneNote != null){
                if (laneOneNote.y > visibleZone.y-15 || (laneOneNote.y < visibleZone.y+15 && laneOneNote.y > visibleZone.y)){
                    this.tweens.add({
                        targets: excellentTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneOneNote.destroy()
                } else if (laneOneNote.y > visibleZone.y-40 || (laneOneNote.y < visibleZone.y+40 && laneOneNote.y > visibleZone.y+15)){
                    this.tweens.add({
                        targets: perfectTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneOneNote.destroy()
                } else if (laneOneNote.y > visibleZone.y-70 || (laneOneNote.y < visibleZone.y+70 && laneOneNote.y > visibleZone.y+40)){
                    this.tweens.add({
                        targets: goodTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneOneNote.destroy()
                } else if (laneOneNote.y > visibleZone.y-100 || (laneOneNote.y < visibleZone.y+100 && laneOneNote.y > visibleZone.y+70)){
                    this.tweens.add({
                        targets: badTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneOneNote.destroy()
                } else if (laneOneNote.y > visibleZone.y-150 || laneOneNote.y > visibleZone.y+150){
                    this.tweens.add({
                        targets: missTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneOneNote.destroy()
                }
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keySECOND)){
            this.tweens.add({
                targets: keyTwo,
                alpha: { from: 1, to: 0},
                ease: 'Sine.InOut',
                duration: 450,
                repeat: 0,
            });
            var laneTwoNote = Phaser.Actions.GetFirst(this.noteGroup.getChildren(), {x: LANE_TWO} )
            
            if (laneTwoNote != null){
                if (laneTwoNote.y > visibleZone.y-15 || (laneTwoNote.y < visibleZone.y+15 && laneTwoNote.y > visibleZone.y)){
                    this.tweens.add({
                        targets: excellentTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneTwoNote.destroy()
                } else if (laneTwoNote.y > visibleZone.y-40 || (laneTwoNote.y < visibleZone.y+40 && laneTwoNote.y > visibleZone.y+15)){
                    this.tweens.add({
                        targets: perfectTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneTwoNote.destroy()
                } else if (laneTwoNote.y > visibleZone.y-70 || (laneTwoNote.y < visibleZone.y+70 && laneTwoNote.y > visibleZone.y+40)){
                    this.tweens.add({
                        targets: goodTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneTwoNote.destroy()
                } else if (laneTwoNote.y > visibleZone.y-100 || (laneTwoNote.y < visibleZone.y+100 && laneTwoNote.y > visibleZone.y+70)){
                    this.tweens.add({
                        targets: badTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneTwoNote.destroy()
                } else if (laneTwoNote.y > visibleZone.y-150 || laneTwoNote.y > visibleZone.y+150){
                    this.tweens.add({
                        targets: missTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneTwoNote.destroy()
                }
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyTHIRD)){
            this.tweens.add({
                targets: keyThree,
                alpha: { from: 1, to: 0},
                ease: 'Sine.InOut',
                duration: 450,
                repeat: 0,
            });
            var laneThreeNote = Phaser.Actions.GetFirst(this.noteGroup.getChildren(), {x: LANE_THREE} )

            if (laneThreeNote != null){
                if (laneThreeNote.y > visibleZone.y-15 || (laneThreeNote.y < visibleZone.y+15 && laneThreeNote.y > visibleZone.y)){
                    this.tweens.add({
                        targets: excellentTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneThreeNote.destroy()
                } else if (laneThreeNote.y > visibleZone.y-40 || (laneThreeNote.y < visibleZone.y+40 && laneThreeNote.y > visibleZone.y+15)){
                    this.tweens.add({
                        targets: perfectTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneThreeNote.destroy()
                } else if (laneThreeNote.y > visibleZone.y-70 || (laneThreeNote.y < visibleZone.y+70 && laneThreeNote.y > visibleZone.y+40)){
                    this.tweens.add({
                        targets: goodTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneThreeNote.destroy()
                } else if (laneThreeNote.y > visibleZone.y-100 || (laneThreeNote.y < visibleZone.y+100 && laneThreeNote.y > visibleZone.y+70)){
                    this.tweens.add({
                        targets: badTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneThreeNote.destroy()
                } else if (laneThreeNote.y > visibleZone.y-150 || laneThreeNote.y > visibleZone.y+150){
                    this.tweens.add({
                        targets: missTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneThreeNote.destroy()
                }
            }
            
        }
        if (Phaser.Input.Keyboard.JustDown(keyFOURTH)){
            this.tweens.add({
                targets: keyFour,
                alpha: { from: 1, to: 0},
                ease: 'Sine.InOut',
                duration: 450,
                repeat: 0,
            });
            var laneFourNote = Phaser.Actions.GetFirst(this.noteGroup.getChildren(), {x: LANE_FOUR} )

            if (laneFourNote != null){
                if (laneFourNote.y > visibleZone.y-15 || (laneFourNote.y < visibleZone.y+15 && laneFourNote.y > visibleZone.y)){
                    this.tweens.add({
                        targets: excellentTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneFourNote.destroy()
                } else if (laneFourNote.y > visibleZone.y-40 || (laneFourNote.y < visibleZone.y+40 && laneFourNote.y > visibleZone.y+15)){
                    this.tweens.add({
                        targets: perfectTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneFourNote.destroy()
                } else if (laneFourNote.y > visibleZone.y-70 || (laneFourNote.y < visibleZone.y+70 && laneFourNote.y > visibleZone.y+40)){
                    this.tweens.add({
                        targets: goodTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneFourNote.destroy()
                } else if (laneFourNote.y > visibleZone.y-100 || (laneFourNote.y < visibleZone.y+100 && laneFourNote.y > visibleZone.y+70)){
                    this.tweens.add({
                        targets: badTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneFourNote.destroy()
                } else if (laneFourNote.y > visibleZone.y-150 || laneFourNote.y > visibleZone.y+150){
                    this.tweens.add({
                        targets: missTEXT,
                        scale: {from: 1, to: 1.2},
                        alpha: { from: 1, to: 0},
                        ease: 'Elastic.InOut',
                        duration: 350,
                        repeat: 0,
                    });
                    laneFourNote.destroy()
                }
            }
        }

    }
}