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
        this.load.image('bullet_active', './assets/bullet_active.png')
        this.load.image('bullet_inactive', './assets/bullet_inactive.png')

        this.load.audio('noteClick', ['./assets/back-button-hover.wav']);
    }

    create(){
        speed = 5
        maxCombo = 0
        excellentCOUNT = 0
        perfectCOUNT = 0
        goodCOUNT = 0
        badCOUNT = 0
        missCOUNT = 0
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)
        keyFIRST = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keySECOND = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyTHIRD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEMICOLON)
        keyFOURTH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.QUOTES)
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)


        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        this.background = this.add.image(width/2, height/2, 'background')

        this.leftRect = this.add.rectangle(150, height/2, 2, game.config.height, 0xFF0000, 0.5)
        this.rightRect = this.add.rectangle(930, height/2, 2, game.config.height, 0xFF0000, 0.5)

        visibleZone = this.add.rectangle(game.config.width/2, game.config.height-150, game.config.width, 2, 0xFF0000, 0.5)
        excellentZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 15, 0x4169E1, 0)
        perfectZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 40, 0xA020F0, 0)
        goodZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 70, 0xA02AF0, 0)
        badZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 100, 0xAAAAF0, 0)
        missZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 150, 0xAAAAF0, 0)

        excellentTEXT = this.add.bitmapText(width/2, visibleZone.y-150, 'gem', 'EXCELLENT', 50).setOrigin(0.5).setTint(0xFFFFFF).setAlpha(0).setDepth(5);
        perfectTEXT = this.add.bitmapText(width/2, visibleZone.y-150, 'gem', 'PERFECT', 50).setOrigin(0.5).setTint(0xFFFFFF).setAlpha(0).setDepth(5);
        goodTEXT = this.add.bitmapText(width/2, visibleZone.y-150, 'gem', 'GOOD', 50).setOrigin(0.5).setTint(0xFFFFFF).setAlpha(0).setDepth(5);
        badTEXT = this.add.bitmapText(width/2, visibleZone.y-150, 'gem', 'BAD', 50).setOrigin(0.5).setTint(0xFFFFFF).setAlpha(0).setDepth(5);
        missTEXT = this.add.bitmapText(width/2, visibleZone.y-150, 'gem', 'MISS', 50).setOrigin(0.5).setTint(0xFFFFFF).setAlpha(0).setDepth(5);

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

        this.noteClick = this.sound.add('noteClick', { 
            volume: 1,
            rate: 1,
            loop: false 
        });

        // speed control panel
        this.speedControlPanel = this.add.rectangle(width/2, height/2, width/2, height/2, 0x301934, 1).setStrokeStyle(2, 0xA020F0, 1).setScale(0)
        this.speedControlPanel.setDepth(3)
        this.speedTEXTbackground = this.add.rectangle(width/2, height/2 - 40, 50, 65, 0x887191, 1).setStrokeStyle(2, 0xA020F0, 1).setScale(0)
        this.speedTEXTbackground.setDepth(4)
        this.speedTEXT = this.add.bitmapText(width/2, height/2 - 40, 'gem', speed, 50).setOrigin(0.5).setTint(0xFFFFFF).setScale(0)
        this.speedTEXT.setDepth(5)

        // https://newdocs.phaser.io/docs/3.60.0/Phaser.GameObjects.NineSlice#setSize
        chargeUI = this.add.nineslice(game.config.width-70, game.config.height/2 - 50, 'charge_level_ui', 0, 50)
        fill_bar = this.add.nineslice(game.config.width-70, 425, 'fill_bar', 0, 40, 0, 6, 6, 6, 6).setOrigin(0.5, 0).setRotation(Math.PI)
        charge_level = 0;

        // bullet handling
        bulletCount = 0
        this.bullet3_inactive = this.add.image(70, 275, 'bullet_inactive', 0).setScale(0.5)
        this.bullet2_inactive = this.add.image(70, 350, 'bullet_inactive', 0).setScale(0.5)
        this.bullet1_inactive = this.add.image(70, 425, 'bullet_inactive', 0).setScale(0.5)
        
        this.bullet3_active = this.add.image(70, 275, 'bullet_active', 0).setScale(0.5).setVisible(false)
        this.bullet2_active = this.add.image(70, 350, 'bullet_active', 0).setScale(0.5).setVisible(false)
        this.bullet1_active = this.add.image(70, 425, 'bullet_active', 0).setScale(0.5).setVisible(false)

        //reticle
        reticle = this.add.image(width/2, height/2, 'reticle').setDepth(5)

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

        this.enemyGroup = this.add.group({
            runChildUpdate: true
        })

        this.enemySpawning = this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.addEnemy()
            },
            loop: true
        })

        this.gameTimer = 60000
        this.timeInSeconds = this.gameTimer/1000;
        this.timer = this.add.bitmapText(width/2, 50, 'gem', this.timeInSeconds, 50).setOrigin(0.5)
        this.clock = this.time.delayedCall(this.gameTimer, () => {
            gameOver = true;
        }, null, this)
        
    }

    addEnemy(){
        let enemy = new Enemy(this, 'enemy', 0, 1)
        this.enemyGroup.add(enemy)
    }

    addNote() {
        let note = new Note(this, 0, speed);
        this.noteGroup.add(note)
    }

    // click animation
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
        this.noteClick.play()
    }

    // manages note timing
    noteJudgement(note){
        if ((note.y > visibleZone.y-15 && note.y < visibleZone.y) || (note.y < visibleZone.y+ 15 && note.y > visibleZone.y)){
            this.tweens.add({
                targets: excellentTEXT,
                scale: {from: 1, to: 1.2},
                alpha: { from: 1, to: 0},
                ease: 'Elastic.InOut',
                duration: 350,
                repeat: 0,
            });
            charge_level += excellentCHARGE
            combo++
            excellentCOUNT++
            note.destroy()
        } else if ((note.y > visibleZone.y-40 && note.y < visibleZone.y + 15) || (note.y < visibleZone.y+40 && note.y > visibleZone.y+15)){
            this.tweens.add({
                targets: perfectTEXT,
                scale: {from: 1, to: 1.2},
                alpha: { from: 1, to: 0},
                ease: 'Elastic.InOut',
                duration: 350,
                repeat: 0,
            });
            charge_level += perfectCHARGE
            combo++
            perfectCOUNT++
            note.destroy()
        } else if ((note.y > visibleZone.y-70 && note.y < visibleZone.y + 40)|| (note.y < visibleZone.y+70 && note.y > visibleZone.y+40)){
            this.tweens.add({
                targets: goodTEXT,
                scale: {from: 1, to: 1.2},
                alpha: { from: 1, to: 0},
                ease: 'Elastic.InOut',
                duration: 350,
                repeat: 0,
            });
            charge_level += goodCHARGE
            combo++
            goodCOUNT++
            note.destroy()
        } else if ((note.y > visibleZone.y-100 && note.y < visibleZone.y + 70) || (note.y < visibleZone.y+100 && note.y > visibleZone.y+70)){
            this.tweens.add({
                targets: badTEXT,
                scale: {from: 1, to: 1.2},
                alpha: { from: 1, to: 0},
                ease: 'Elastic.InOut',
                duration: 350,
                repeat: 0,
            });
            charge_level += badCHARGE
            combo = 0
            badCOUNT++
            note.destroy()
        } else if ((note.y > visibleZone.y-150 && note.y < visibleZone.y + 100) || note.y > visibleZone.y+150){
            this.tweens.add({
                targets: missTEXT,
                scale: {from: 1, to: 1.2},
                alpha: { from: 1, to: 0},
                ease: 'Elastic.InOut',
                duration: 350,
                repeat: 0,
            });
            charge_level += missCHARGE
            combo = 0
            missCOUNT++ 
            note.destroy()
        } 
        if (combo > maxCombo){
            maxCombo = combo
        }
    }

    update(){
        // 15 40 70 100 150
        this.timer.setText(Math.floor((this.gameTimer - this.clock.getElapsed())/1000))

        // speed control panel
        if (Phaser.Input.Keyboard.JustDown(keyTAB)){
            if (!scenePaused){
                this.noteSpawning.paused = true
                this.add.tween({
                    targets: [this.speedControlPanel, this.speedTEXT, this.speedTEXTbackground],
                    scale: {from: 0, to: 1},
                    duration: 100,
                    ease: 'linear'
                })
                scenePaused = true;
            } else {
                if (!aimMode){
                    this.noteSpawning.paused = false
                }
                this.add.tween({
                    targets: [this.speedControlPanel, this.speedTEXT, this.speedTEXTbackground],
                    scale: {from: 1, to: 0},
                    duration: 100,
                    ease: 'linear'
                })
                scenePaused = false;
            }
        }

        // aim mode
        if (Phaser.Input.Keyboard.JustDown(keySHIFT) && bulletCount > 0){
            if (!aimMode){
                this.noteSpawning.paused = true
                aimMode = true
            } else {
                this.noteSpawning.paused = false
                aimMode = false
            }
        }

        // handling charging
        if (charge_level > 0 && (charge_level < 120)){
            fill_bar.height = charge_level * 2
        }

        if (charge_level > 100){
            if (bulletCount == 3){
                charge_level = 116
            } else {
                bulletCount++;
                charge_level = 0
                fill_bar.height = charge_level
                switch(bulletCount){
                    case 3:
                        this.bullet3_active.setVisible(true)
                        this.bullet3_inactive.setVisible(false)
                    case 2:
                        this.bullet2_active.setVisible(true)
                        this.bullet2_inactive.setVisible(false)
                    case 1:
                        this.bullet1_active.setVisible(true)
                        this.bullet1_inactive.setVisible(false)
                }
            }
        } else if (charge_level < 0){
            charge_level = 0
        }

        if(scenePaused){
            Phaser.Actions.Call(this.noteGroup.getChildren(), (note) => note.speed = 0.1)
            if (Phaser.Input.Keyboard.JustDown(keyFIRST) && speed > 1){
                speed--;
            } else if (Phaser.Input.Keyboard.JustDown(keyFOURTH) && speed < 10){
                speed++;
            }
            this.noteSpawning.delay = -369.1503 * Math.log(0.0666085*speed)
            this.speedTEXT.setText(speed)
        } else if(aimMode){
            Phaser.Actions.Call(this.noteGroup.getChildren(), (note) => note.speed = 0.1)

            if (keyW.isDown || keyUP.isDown){
                reticle.y -= 5
            }

            if (keySECOND.isDown || keyDOWN.isDown){
                reticle.y += 5
            }

            if (keyFIRST.isDown || keyLEFT.isDown){
                reticle.x -= 5
            }

            if (keyD.isDown || keyRIGHT.isDown){
                reticle.x += 5
            }


            if (Phaser.Input.Keyboard.JustDown(keySPACE)){
                bulletCount--;
                aimMode = false
                this.noteSpawning.paused = false
                switch(bulletCount) {
                    case 2:
                        this.bullet3_active.setVisible(false)
                        this.bullet3_inactive.setVisible(true)
                        break
                    case 1:
                        this.bullet2_active.setVisible(false)
                        this.bullet2_inactive.setVisible(true)
                        break
                    case 0:
                        this.bullet1_active.setVisible(false)
                        this.bullet1_inactive.setVisible(true)
                        break
                }
                
                
            }
        } else {
            Phaser.Actions.Call(this.noteGroup.getChildren(), (note) => note.speed = speed*2)
            if (Phaser.Input.Keyboard.JustDown(keyFIRST)){
                this.clickTween(this.keyOneCenter, this.keyOneInner, this.keyOneOuter)
                var laneOneNote = Phaser.Actions.GetFirst(this.noteGroup.getChildren(), {x: LANE_ONE} )
                if (laneOneNote != null){
                    this.noteJudgement(laneOneNote)
                }
            }
            if (Phaser.Input.Keyboard.JustDown(keySECOND)){
                this.clickTween(this.keyTwoCenter, this.keyTwoInner, this.keyTwoOuter)
                var laneTwoNote = Phaser.Actions.GetFirst(this.noteGroup.getChildren(), {x: LANE_TWO} )
                if (laneTwoNote != null){
                    this.noteJudgement(laneTwoNote)
                }
            }
            if (Phaser.Input.Keyboard.JustDown(keyTHIRD)){
                this.clickTween(this.keyThreeCenter, this.keyThreeInner, this.keyThreeOuter)
                var laneThreeNote = Phaser.Actions.GetFirst(this.noteGroup.getChildren(), {x: LANE_THREE} )
                if (laneThreeNote != null){
                    this.noteJudgement(laneThreeNote)
                }
            }
            if (Phaser.Input.Keyboard.JustDown(keyFOURTH)){
                this.clickTween(this.keyFourCenter, this.keyFourInner, this.keyFourOuter)
                var laneFourNote = Phaser.Actions.GetFirst(this.noteGroup.getChildren(), {x: LANE_FOUR} )
                if (laneFourNote != null){
                    this.noteJudgement(laneFourNote)
                }
            }
        }

        if (gameOver){
            this.scene.start('scoreScreenScene')
        }
    }
}
