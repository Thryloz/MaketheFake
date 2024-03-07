class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    // delete later
    preload(){
        this.load.bitmapFont('gem', './assets/gem.png', './assets/gem.xml');
        this.load.image('background', './assets/makethefakebackground.png')
        this.load.image('charge_level_ui', './assets/chargelevelui.png');
        this.load.image('fill_bar', './assets/fillbar.png');

        this.load.image('bluenoteclick_center', './assets/bluenoteclick_center.png')
        this.load.image('bluenoteclick_inner', './assets/bluenoteclick_inner.png')
        this.load.image('bluenoteclick_outer', './assets/bluenoteclick_outer.png')
    }

    create(){
        speed = 5
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)
        keyFIRST = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keySECOND = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyTHIRD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEMICOLON)
        keyFOURTH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.QUOTES)

        this.background = this.add.image(width/2, height/2, 'background')

        visibleZone = this.add.rectangle(game.config.width/2, game.config.height-80, game.config.width, 2, 0xFF0000, 0.5)
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

        this.keyOneCenter = this.add.image(LANE_ONE, game.config.height-80, "bluenoteclick_center").setAlpha(0).setScale(0.5)
        this.keyOneInner = this.add.image(LANE_ONE, game.config.height-80, "bluenoteclick_inner").setAlpha(0).setScale(0.5)
        this.keyOneOuter = this.add.image(LANE_ONE, game.config.height-80, "bluenoteclick_outer").setAlpha(0).setScale(0.5)
        this.keyTwoCenter = this.add.image(LANE_TWO, game.config.height-80, "bluenoteclick_center").setAlpha(0).setScale(0.5)
        this.keyTwoInner = this.add.image(LANE_TWO, game.config.height-80, "bluenoteclick_inner").setAlpha(0).setScale(0.5)
        this.keyTwoOuter = this.add.image(LANE_TWO, game.config.height-80, "bluenoteclick_outer").setAlpha(0).setScale(0.5)
        this.keyThreeCenter = this.add.image(LANE_THREE, game.config.height-80, "bluenoteclick_center").setAlpha(0).setScale(0.5)
        this.keyThreeInner = this.add.image(LANE_THREE, game.config.height-80, "bluenoteclick_inner").setAlpha(0).setScale(0.5)
        this.keyThreeOuter = this.add.image(LANE_THREE, game.config.height-80, "bluenoteclick_outer").setAlpha(0).setScale(0.5)
        this.keyFourCenter = this.add.image(LANE_FOUR, game.config.height-80, "bluenoteclick_center").setAlpha(0).setScale(0.5)
        this.keyFourInner = this.add.image(LANE_FOUR, game.config.height-80, "bluenoteclick_inner").setAlpha(0).setScale(0.5)
        this.keyFourOuter = this.add.image(LANE_FOUR, game.config.height-80, "bluenoteclick_outer").setAlpha(0).setScale(0.5)


        this.speedControlPanel = this.add.rectangle(width/2, height/2, width/2, height/2, 0x301934, 1).setStrokeStyle(2, 0xA020F0, 1)
        this.speedControlPanel.setVisible(false)
        this.speedControlPanel.setDepth(3)

        this.speedTEXTbackground = this.add.rectangle(width/2, height/2 - 40, 50, 65, 0x887191, 1).setStrokeStyle(2, 0xA020F0, 1).setVisible(false)
        this.speedTEXTbackground.setDepth(4)


        this.speedTEXT = this.add.bitmapText(width/2, height/2 - 40, 'gem', speed, 50).setOrigin(0.5).setTint(0xFFFFFF).setVisible(false)
        this.speedTEXT.setDepth(5)

        


        //chargeUI = new CannonSystem(this, game.config.width-100, game.config.height/2, 'charge_level_ui', 1)

        // https://newdocs.phaser.io/docs/3.60.0/Phaser.GameObjects.NineSlice#setSize
        chargeUI = this.add.nineslice(game.config.width-70, game.config.height/2 - 50, 'charge_level_ui', 0, 50)
        fill_bar = this.add.nineslice(game.config.width-70, 425, 'fill_bar', 0, 40, 0, 6, 6, 6, 6).setOrigin(0.5, 0).setRotation(Math.PI)
        charge_level = 0;

        this.noteGroup = this.add.group({
            runChildUpdate: true    
        });

        this.noteSpawning = this.time.addEvent({
            delay: -369.1503 * Math.log(0.0666085*speed),
            callback: () => {
                this.addNote()
            },
            loop: true
        })

        
    }

    addNote() {
        let note = new Note(this, 0, speed);
        this.noteGroup.add(note)
    }

    update(){
        // 15 40 70 100 150
        if (Phaser.Input.Keyboard.JustDown(keyTAB)){
            if (!scenePaused){
                this.noteSpawning.paused = true
                this.speedControlPanel.setVisible(true)
                this.speedTEXT.setVisible(true)
                this.speedTEXTbackground.setVisible(true)
                scenePaused = true;
            } else {
                this.noteSpawning.paused = false
                this.speedControlPanel.setVisible(false)
                this.speedTEXT.setVisible(false)
                this.speedTEXTbackground.setVisible(false)
                scenePaused = false;
            }
        }
        console.log(charge_level)
        if (charge_level > 0){
            fill_bar.height = charge_level * 2
        }

        if (charge_level > 100){
            charge_level = 0
        } else if (charge_level < 0){
            charge_level = 0
        }


        //console.log(this.noteSpawning.delay)
        if(scenePaused){
            Phaser.Actions.Call(this.noteGroup.getChildren(), (note) => note.speed = 0.1)
            if (Phaser.Input.Keyboard.JustDown(keyFIRST) && speed > 1){
                speed--;
                this.noteSpawning.delay = -369.1503 * Math.log(0.0666085*speed)
            } else if (Phaser.Input.Keyboard.JustDown(keyFOURTH) && speed < 10){
                speed++;
                this.noteSpawning.delay = -369.1503 * Math.log(0.0666085*speed)
            }
            this.speedTEXT.setText(speed)
        } else {
            Phaser.Actions.Call(this.noteGroup.getChildren(), (note) => note.speed = speed*2)
            if (Phaser.Input.Keyboard.JustDown(keyFIRST)){
                this.clickTween(this.keyOneCenter, this.keyOneInner, this.keyOneOuter)
                var laneOneNote = Phaser.Actions.GetFirst(this.noteGroup.getChildren(), {x: LANE_ONE} )

                if (laneOneNote != null){
                    if ((laneOneNote.y > visibleZone.y-15 && laneOneNote.y < visibleZone.y) || (laneOneNote.y < visibleZone.y+ 15 && laneOneNote.y > visibleZone.y)){
                        this.tweens.add({
                            targets: excellentTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += excellentCHARGE
                        laneOneNote.destroy()
                    } else if ((laneOneNote.y > visibleZone.y-40 && laneOneNote.y < visibleZone.y + 15) || (laneOneNote.y < visibleZone.y+40 && laneOneNote.y > visibleZone.y+15)){
                        this.tweens.add({
                            targets: perfectTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += perfectCHARGE
                        laneOneNote.destroy()
                    } else if ((laneOneNote.y > visibleZone.y-70 && laneOneNote.y < visibleZone.y + 40)|| (laneOneNote.y < visibleZone.y+70 && laneOneNote.y > visibleZone.y+40)){
                        this.tweens.add({
                            targets: goodTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += goodCHARGE
                        laneOneNote.destroy()
                    } else if ((laneOneNote.y > visibleZone.y-100 && laneOneNote.y < visibleZone.y + 70) || (laneOneNote.y < visibleZone.y+100 && laneOneNote.y > visibleZone.y+70)){
                        this.tweens.add({
                            targets: badTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += badCHARGE
                        laneOneNote.destroy()
                    } else if ((laneOneNote.y > visibleZone.y-150 && laneOneNote.y < visibleZone.y + 100) || laneOneNote.y > visibleZone.y+150){
                        this.tweens.add({
                            targets: missTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += missCHARGE
                        laneOneNote.destroy()
                    } 
                }
            }
            if (Phaser.Input.Keyboard.JustDown(keySECOND)){
                this.clickTween(this.keyTwoCenter, this.keyTwoInner, this.keyTwoOuter)
                var laneTwoNote = Phaser.Actions.GetFirst(this.noteGroup.getChildren(), {x: LANE_TWO} )
                
                if (laneTwoNote != null){
                    if ((laneTwoNote.y > visibleZone.y-15 && laneTwoNote.y < visibleZone.y) || (laneTwoNote.y < visibleZone.y+ 15 && laneTwoNote.y > visibleZone.y)){
                        this.tweens.add({
                            targets: excellentTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += excellentCHARGE
                        laneTwoNote.destroy()
                    } else if ((laneTwoNote.y > visibleZone.y-40 && laneTwoNote.y < visibleZone.y + 15) || (laneTwoNote.y < visibleZone.y+40 && laneTwoNote.y > visibleZone.y+15)){
                        this.tweens.add({
                            targets: perfectTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += perfectCHARGE
                        laneTwoNote.destroy()
                    } else if ((laneTwoNote.y > visibleZone.y-70 && laneTwoNote.y < visibleZone.y + 40)|| (laneTwoNote.y < visibleZone.y+70 && laneTwoNote.y > visibleZone.y+40)){
                        this.tweens.add({
                            targets: goodTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += goodCHARGE
                        laneTwoNote.destroy()
                    } else if ((laneTwoNote.y > visibleZone.y-100 && laneTwoNote.y < visibleZone.y + 70) || (laneTwoNote.y < visibleZone.y+100 && laneTwoNote.y > visibleZone.y+70)){
                        this.tweens.add({
                            targets: badTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += badCHARGE
                        laneTwoNote.destroy()
                    } else if ((laneTwoNote.y > visibleZone.y-150 && laneTwoNote.y < visibleZone.y + 100) || laneTwoNote.y > visibleZone.y+150){
                        this.tweens.add({
                            targets: missTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += missCHARGE
                        laneTwoNote.destroy()
                    } 
                }
            }
            if (Phaser.Input.Keyboard.JustDown(keyTHIRD)){
                this.clickTween(this.keyThreeCenter, this.keyThreeInner, this.keyThreeOuter)
                var laneThreeNote = Phaser.Actions.GetFirst(this.noteGroup.getChildren(), {x: LANE_THREE} )

                if (laneThreeNote != null){
                    if ((laneThreeNote.y > visibleZone.y-15 && laneThreeNote.y < visibleZone.y) || (laneThreeNote.y < visibleZone.y+ 15 && laneThreeNote.y > visibleZone.y)){
                        this.tweens.add({
                            targets: excellentTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += perfectCHARGE
                        laneThreeNote.destroy()
                    } else if ((laneThreeNote.y > visibleZone.y-40 && laneThreeNote.y < visibleZone.y + 15) || (laneThreeNote.y < visibleZone.y+40 && laneThreeNote.y > visibleZone.y+15)){
                        this.tweens.add({
                            targets: perfectTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += perfectCHARGE
                        laneThreeNote.destroy()
                    } else if ((laneThreeNote.y > visibleZone.y-70 && laneThreeNote.y < visibleZone.y + 40)|| (laneThreeNote.y < visibleZone.y+70 && laneThreeNote.y > visibleZone.y+40)){
                        this.tweens.add({
                            targets: goodTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += goodCHARGE
                        laneThreeNote.destroy()
                    } else if ((laneThreeNote.y > visibleZone.y-100 && laneThreeNote.y < visibleZone.y + 70) || (laneThreeNote.y < visibleZone.y+100 && laneThreeNote.y > visibleZone.y+70)){
                        this.tweens.add({
                            targets: badTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += badCHARGE
                        laneThreeNote.destroy()
                    } else if ((laneThreeNote.y > visibleZone.y-150 && laneThreeNote.y < visibleZone.y + 100) || laneThreeNote.y > visibleZone.y+150){
                        this.tweens.add({
                            targets: missTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += missCHARGE
                        laneThreeNote.destroy()
                    } 
                }
                
            }
            if (Phaser.Input.Keyboard.JustDown(keyFOURTH)){
                this.clickTween(this.keyFourCenter, this.keyFourInner, this.keyFourOuter)
                var laneFourNote = Phaser.Actions.GetFirst(this.noteGroup.getChildren(), {x: LANE_FOUR} )

                if (laneFourNote != null){
                    if ((laneFourNote.y > visibleZone.y-15 && laneFourNote.y < visibleZone.y) || (laneFourNote.y < visibleZone.y+ 15 && laneFourNote.y > visibleZone.y)){
                        this.tweens.add({
                            targets: excellentTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += excellentCHARGE
                        laneFourNote.destroy()
                    } else if ((laneFourNote.y > visibleZone.y-40 && laneFourNote.y < visibleZone.y + 15) || (laneFourNote.y < visibleZone.y+40 && laneFourNote.y > visibleZone.y+15)){
                        this.tweens.add({
                            targets: perfectTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += perfectCHARGE
                        laneFourNote.destroy()
                    } else if ((laneFourNote.y > visibleZone.y-70 && laneFourNote.y < visibleZone.y + 40)|| (laneFourNote.y < visibleZone.y+70 && laneFourNote.y > visibleZone.y+40)){
                        this.tweens.add({
                            targets: goodTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += goodCHARGE
                        laneFourNote.destroy()
                    } else if ((laneFourNote.y > visibleZone.y-100 && laneFourNote.y < visibleZone.y + 70) || (laneFourNote.y < visibleZone.y+100 && laneFourNote.y > visibleZone.y+70)){
                        this.tweens.add({
                            targets: badTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += badCHARGE
                        laneFourNote.destroy()
                    } else if ((laneFourNote.y > visibleZone.y-150 && laneFourNote.y < visibleZone.y + 100) || laneFourNote.y > visibleZone.y+150){
                        this.tweens.add({
                            targets: missTEXT,
                            scale: {from: 1, to: 1.2},
                            alpha: { from: 1, to: 0},
                            ease: 'Elastic.InOut',
                            duration: 350,
                            repeat: 0,
                        });
                        charge_level += missCHARGE
                        laneFourNote.destroy()
                    } 
                }
            }
        }
    
    }

    clickTween(center, inner, outer){
        this.tweens.add({
            targets: center,
            alpha: { from: 1, to: 0},
            scale: { from: 0.5, to: 0},
            ease: 'Sine.InOut',
            duration: 250,
            repeat: 0,
        });
        this.tweens.add({
            targets: inner,
            alpha: { from: 1, to: 0},
            scale: { from: 0.5, to: 0.51},
            ease: 'Sine.InOut',
            duration: 800,
            repeat: 0,
        });
        this.tweens.add({
            targets: outer,
            ease: 'Bounce.InOut',
            alpha: { from: 1, to: 0},
            ease: 'Sine.InOut',
            scale: { from: 0.5, to: 0.55},
            duration: 350,
            repeat: 0,
        });
    }
}
