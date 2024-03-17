class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    preload(){
        this.load.image('enemy1', './assets/enemy sprites/enemy_frame1.png')
        this.load.atlas('enemy_spritesheet', './assets/enemy_spritesheet.png', './assets/enemy_spritesheet.json')
    }

    create(){
        speed = 1
        score = 0 
        maxCombo = 0
        combo = 0
        amountOfNotes = 0
        excellentCOUNT = 0
        perfectCOUNT = 0
        goodCOUNT = 0
        badCOUNT = 0
        missCOUNT = 0
        aimMode = false
        scenePaused = false
        gameOverPass = false
        gameOverFail = false
        this.speedAltered = false

        // bgm
        if (!this.bgm){
            this.bgm = this.sound.add('bgm', { 
                mute: false,
                volume: 0.5,
                rate: 1,
                loop: true 
            });
        }
        if (!this.slow_mode){
            this.slow_mode = this.sound.add('slow_mode', { 
                mute: false,
                volume: 1,
                rate: 1,
                loop: true 
            });
        }
        this.bgm.play();

        
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)
        keyFIRST = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keySECOND = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyTHIRD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
        keyFOURTH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)


        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //BACKGROUND AND UI
        this.background = this.add.image(width/2, height/2, 'asset_atlas', 'makethefakebackground')
        this.UI = this.add.image(width/2, height/2, 'asset_atlas', 'ui').setDepth(10)
        this.pauseButton = this.add.image(120, 120, 'asset_atlas', 'pausebutton').setScale(2).setDepth(10)

        //this.leftRect = this.add.rectangle(150, height/2, 2, game.config.height, 0xFF0000, 0.5)
        //this.rightRect = this.add.rectangle(930, height/2, 2, game.config.height, 0xFF0000, 0.5)
        //this.up = this.add.rectangle(width/2, 140, width, 2, 0xFF0000, 0.5)
        //this.point = this.add.image(200,180, 'none')

        visibleZone = this.add.rectangle(game.config.width/2, game.config.height-155, game.config.width, 5, 0xFF0000, 0.5).setDepth(10)
        /* excellentZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 15, 0x4169E1, 0)
        perfectZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 40, 0xA020F0, 0)
        goodZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 70, 0xA02AF0, 0)
        badZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 100, 0xAAAAF0, 0)
        missZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 150, 0xAAAAF0, 0) */

        excellentTEXT = this.add.bitmapText(width/2, visibleZone.y-150, font, 'EXCELLENT', 50).setOrigin(0.5).setTint(0xffffff).setAlpha(0).setDepth(10);
        perfectTEXT = this.add.bitmapText(width/2, visibleZone.y-150, font, 'PERFECT', 50).setOrigin(0.5).setTint(0xffffff).setAlpha(0).setDepth(10);
        goodTEXT = this.add.bitmapText(width/2, visibleZone.y-150, font, 'GOOD', 50).setOrigin(0.5).setTint(0xffffff).setAlpha(0).setDepth(10);
        badTEXT = this.add.bitmapText(width/2, visibleZone.y-150, font, 'BAD', 50).setOrigin(0.5).setTint(0xffffff).setAlpha(0).setDepth(10);
        missTEXT = this.add.bitmapText(width/2, visibleZone.y-150, font, 'MISS', 50).setOrigin(0.5).setTint(0xffffff).setAlpha(0).setDepth(10);
        this.scoreTEXT = this.add.bitmapText(230, 100, font, 'SCORE', 35).setOrigin(0.5).setTint(0xc1c6fc).setDepth(10).setRotation(0.07);
        this.scoreNUMBER = this.add.bitmapText(350, 110, font, score, 30).setOrigin(0.5).setTint(0xc1c6fc).setDepth(10).setRotation(0.07);
        this.comboTEXT = this.add.bitmapText(770, 110, font, 'COMBO', 35).setOrigin(0.5).setTint(0xc1c6fc).setDepth(10).setRotation(-0.07);
        this.comboNUMBER = this.add.bitmapText(850, 100, font, combo, 35).setOrigin(0.5).setTint(0xc1c6fc).setDepth(10).setRotation(-0.07);

        this.keyOneCenter = this.add.image(LANE_ONE, game.config.height-80, 'asset_atlas', "bluenoteclick_center").setAlpha(0).setScale(0.5)
        this.keyOneInner = this.add.image(LANE_ONE, game.config.height-80, 'asset_atlas', "bluenoteclick_inner").setAlpha(0).setScale(0.5)
        this.keyOneOuter = this.add.image(LANE_ONE, game.config.height-80, 'asset_atlas', "bluenoteclick_outer").setAlpha(0).setScale(0.5)
        this.keyTwoCenter = this.add.image(LANE_TWO, game.config.height-80, 'asset_atlas', "bluenoteclick_center").setAlpha(0).setScale(0.5)
        this.keyTwoInner = this.add.image(LANE_TWO, game.config.height-80, 'asset_atlas', "bluenoteclick_inner").setAlpha(0).setScale(0.5)
        this.keyTwoOuter = this.add.image(LANE_TWO, game.config.height-80, 'asset_atlas', "bluenoteclick_outer").setAlpha(0).setScale(0.5)
        this.keyThreeCenter = this.add.image(LANE_THREE, game.config.height-80, 'asset_atlas', "bluenoteclick_center").setAlpha(0).setScale(0.5)
        this.keyThreeInner = this.add.image(LANE_THREE, game.config.height-80, 'asset_atlas', "bluenoteclick_inner").setAlpha(0).setScale(0.5)
        this.keyThreeOuter = this.add.image(LANE_THREE, game.config.height-80, 'asset_atlas', "bluenoteclick_outer").setAlpha(0).setScale(0.5)
        this.keyFourCenter = this.add.image(LANE_FOUR, game.config.height-80, 'asset_atlas', "bluenoteclick_center").setAlpha(0).setScale(0.5)
        this.keyFourInner = this.add.image(LANE_FOUR, game.config.height-80, 'asset_atlas', "bluenoteclick_inner").setAlpha(0).setScale(0.5)
        this.keyFourOuter = this.add.image(LANE_FOUR, game.config.height-80, 'asset_atlas', "bluenoteclick_outer").setAlpha(0).setScale(0.5)

        this.keyOneInner_ghost = this.add.image(LANE_ONE, game.config.height-80, 'asset_atlas', "bluenoteclick_inner").setAlpha(0.3).setScale(0.5)
        this.keyOneOuter_ghost = this.add.image(LANE_ONE, game.config.height-80, 'asset_atlas', "bluenoteclick_outer").setAlpha(0.3).setScale(0.5)
        this.keyTwoInner_ghost = this.add.image(LANE_TWO, game.config.height-80, 'asset_atlas', "bluenoteclick_inner").setAlpha(0.3).setScale(0.5)
        this.keyTwoOuter_ghost = this.add.image(LANE_TWO, game.config.height-80, 'asset_atlas', "bluenoteclick_outer").setAlpha(0.3).setScale(0.5)
        this.keyThreeInner_ghost = this.add.image(LANE_THREE, game.config.height-80, 'asset_atlas', "bluenoteclick_inner").setAlpha(0.3).setScale(0.5)
        this.keyThreeOuter_ghost = this.add.image(LANE_THREE, game.config.height-80, 'asset_atlas', "bluenoteclick_outer").setAlpha(0.3).setScale(0.5)
        this.keyFourInner_ghost = this.add.image(LANE_FOUR, game.config.height-80, 'asset_atlas', "bluenoteclick_inner").setAlpha(0.3).setScale(0.5)
        this.keyFourOuter_ghost = this.add.image(LANE_FOUR, game.config.height-80, 'asset_atlas', "bluenoteclick_outer").setAlpha(0.3).setScale(0.5)

        this.lane_A = this.add.bitmapText(LANE_ONE, height-80, font, 'D', 35).setOrigin(0.5).setTint(0xFFFFFF).setDepth(10)
        this.lane_S = this.add.bitmapText(LANE_TWO, height-80, font, 'F', 35).setOrigin(0.5).setTint(0xFFFFFF).setDepth(10)
        this.lane_SEMICOLON = this.add.bitmapText(LANE_THREE, height-80, font, 'J', 35).setOrigin(0.5).setTint(0xFFFFFF).setDepth(10)
        this.lane_COLON = this.add.bitmapText(LANE_FOUR, height-80, font, 'K', 35).setOrigin(0.5).setTint(0xFFFFFF).setDepth(10)

        this.noteClick = this.sound.add('noteClick', { 
            volume: .2, 
            rate: 1,
            loop: false 
        });
        this.shoot_sound = this.sound.add('shoot_sound', { 
            volume: .2, 
            rate: 1,
            loop: false 
        });
        this.enemy_death_sound = this.sound.add('enemy_death_sound', { 
            volume: .2, 
            rate: 1,
            loop: false 
        });

        // speed control panel
        this.speedControlPanel = this.add.rectangle(width/2, height/2, width/2, height/2, 0x301934, 1).setStrokeStyle(2, 0xA020F0, 1).setScale(0)
        this.speedControlPanel.setDepth(8)
        this.speedTEXTbackground = this.add.rectangle(width/2, height/2 - 80, 80, 65, 0x887191, 1).setStrokeStyle(2, 0xA020F0, 1).setScale(0)
        this.speedTEXTbackground.setDepth(9)
        this.speedTEXT = this.add.bitmapText(width/2, height/2 - 80, font, speed, 50).setOrigin(0.5).setTint(0xFFFFFF).setScale(0)
        this.speedTEXT.setDepth(10)
        this.closeSpeedControl = this.add.bitmapText(width/2, height/2 - 150, font, 'TAB to close panel', 50).setOrigin(0.5).setTint(0xFFFFFF).setScale(0)
        this.AtoDecrease = this.add.bitmapText(width/2, height/2, font, 'A to decrease speed', 50).setOrigin(0.5).setTint(0xFFFFFF).setScale(0)
        this.quotetoIncrease = this.add.bitmapText(width/2, height/2 + 50, font, '\' to increase speed', 50).setOrigin(0.5).setTint(0xFFFFFF).setScale(0)
        this.RtoRestart = this.add.bitmapText(width/2, height/2 + 100, font, 'R to restart', 50).setOrigin(0.5).setTint(0xFFFFFF).setScale(0)
        this.goBacktoMenu = this.add.bitmapText(width/2, height/2 + 150, font, 'SPACE to go back to menu', 40).setOrigin(0.5).setTint(0xFFFFFF).setScale(0)
        this.AtoDecrease.setDepth(10)
        this.closeSpeedControl.setDepth(10)
        this.quotetoIncrease.setDepth(10)
        this.RtoRestart.setDepth(10)
        this.goBacktoMenu.setDepth(10)

        // https://newdocs.phaser.io/docs/3.60.0/Phaser.GameObjects.NineSlice#setSize
        chargeUI = this.add.nineslice(game.config.width-70, game.config.height/2 - 50, 'charge_level_ui', 0, 50)
        fill_bar = this.add.nineslice(game.config.width-70, 425, 'fill_bar', 0, 40, 0, 6, 6, 6, 6).setOrigin(0.5, 0).setRotation(Math.PI)
        charge_level = 0;

        // bullet handling
        bulletCount = 0
        this.bullet3_inactive = this.add.image(80, 255, 'asset_atlas', 'bullet_inactive', 0).setScale(0.5)
        this.bullet2_inactive = this.add.image(80, 330, 'asset_atlas', 'bullet_inactive', 0).setScale(0.5)
        this.bullet1_inactive = this.add.image(80, 405, 'asset_atlas', 'bullet_inactive', 0).setScale(0.5)
        
        this.bullet3_active = this.add.image(80, 255, 'asset_atlas', 'bullet_active', 0).setScale(0.5).setVisible(false)
        this.bullet2_active = this.add.image(80, 330, 'asset_atlas', 'bullet_active', 0).setScale(0.5).setVisible(false)
        this.bullet1_active = this.add.image(80, 405, 'asset_atlas', 'bullet_active', 0).setScale(0.5).setVisible(false)

        //reticle
        reticle = this.add.image(width/2, height/2, 'asset_atlas', 'reticle').setScale(1.5).setDepth(10).setVisible(false)
        reticle.postFX.addGlow(0xffffff, 1.5, 0)

        this.noteGroup = this.add.group({
            runChildUpdate: true    
        });

        let asset_list = ['blue_note', 'cyan_note', 'green_note', 'orange_note', 'pink_note']
        this.noteSpawning = this.time.addEvent({
            delay: -369.1503 * Math.log(0.0666085*speed),
            callback: () => {
                this.addNote(asset_list)
            },
            loop: true
        })

        this.enemyGroup = this.add.group({
            runChildUpdate: true
        })

        this.enemySpawning = this.time.addEvent({
            delay: 4000,
            callback: () => {
                this.addEnemy()
            },
            loop: true
        }) 

        this.gameTimer = 120000
        this.timeInSeconds = this.gameTimer/1000;
        this.timer = this.add.bitmapText(width/2, 50, font, this.timeInSeconds, 50).setOrigin(0.5).setDepth(10)
        this.clock = this.time.delayedCall(this.gameTimer, () => {
            gameOverPass = true;
        }, null, this)
        

        if (!this.idle_animation){
            this.idle_animation = this.anims.create({
                key: 'idle',
                frameRate: 8,
                repeat: -1,
                frames: this.anims.generateFrameNames('enemy_spritesheet', {
                    prefix: 'enemy_frame',
                    start: 1,
                    end: 4
                }),
            })
        }
        if (!this.phase_out){
            this.phase_out = this.anims.create({
                key: 'phase_out',
                frameRate: 12,
                repeat: 0,
                frames: this.anims.generateFrameNames('enemy_spritesheet', {
                    prefix: 'enemy_teleport_',
                    end: 3
                }),
            })
        }
        if (!this.phase_in){
            this.phase_in = this.anims.create({
                key: 'phase_in',
                frameRate: 12,
                repeat: 0,
                frames: this.anims.generateFrameNames('enemy_spritesheet', {
                    prefix: 'enemy_teleport_',
                    start: 3,
                    end: 0
                }),
            })
        }
        if (!this.enemy_death){
            this.enemy_death = this.anims.create({
                key: 'enemy_death',
                frameRate: 40,
                repeat: 0,
                frames: this.anims.generateFrameNames('enemy_spritesheet', {
                    prefix: 'enemy_death_',
                    start: 0,
                    end: 7
                }),
            })
        }
        this.spawn_once = false;

    }

    addEnemy(){
        let enemy = new Enemy(this, 'enemy1', 0, 1)
        this.enemyGroup.add(enemy)
    }

    addNote(asset_list) {
        let num = Math.floor(Math.random() * 5);
        let note = new Note(this, asset_list[num], 0, speed);
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
            score += 50
            charge_level += excellentCHARGE
            combo++
            excellentCOUNT++
            this.flash = this.add.image(note.x, note.y, 'asset_atlas', 'clickflash', 0).setDepth(10)
            this.flash.scaleX = 3
            this.flash.postFX.addGlow(0xFFFFFF, 3, 0)
            this.flash.postFX.addGlow(0xFFD700, 0, 3)
            this.add.tween({
                targets: this.flash,
                scale: {from: 3, to: 0},
                alpha: {from: 1, to: 0},
                duration: 100,
                ease: 'linear'
            })
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.flash.destroy()
                },
            })
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
            score += 10
            charge_level += perfectCHARGE
            combo++
            perfectCOUNT++
            this.flash = this.add.image(note.x, note.y, 'asset_atlas', 'clickflash', 0).setDepth(10)
            this.flash.scaleX = 3
            this.flash.postFX.addGlow(0xFFFFFF, 3, 0)
            this.flash.postFX.addGlow(0xFFD700, 0, 3)
            this.add.tween({
                targets: this.flash,
                scale: {from: 3, to: 0},
                alpha: {from: 1, to: 0},
                duration: 100,
                ease: 'linear'
            })
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.flash.destroy()
                },
            })
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
            score += 5
            charge_level += goodCHARGE
            combo++
            goodCOUNT++
            this.flash = this.add.image(note.x, note.y, 'asset_atlas', 'clickflash', 0).setDepth(10)
            this.flash.scaleX = 3
            this.flash.postFX.addGlow(0xFFFFFF, 3, 0)
            this.flash.postFX.addGlow(0xFFD700, 0, 3)
            this.add.tween({
                targets: this.flash,
                scale: {from: 3, to: 0},
                alpha: {from: 1, to: 0},
                duration: 100,
                ease: 'linear'
            })
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.flash.destroy()
                },
            })
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
            this.flash = this.add.image(note.x, note.y, 'asset_atlas', 'clickflash', 0).setDepth(10)
            this.flash.scaleX = 3
            this.flash.postFX.addGlow(0xFFFFFF, 3, 0)
            this.flash.postFX.addGlow(0xFFD700, 0, 3)
            this.add.tween({
                targets: this.flash,
                scale: {from: 3, to: 0},
                alpha: {from: 1, to: 0},
                duration: 100,
                ease: 'linear'
            })
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.flash.destroy()
                },
            })
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
            this.flash = this.add.image(note.x, note.y, 'asset_atlas', 'clickflash', 0).setDepth(10)
            this.flash.scaleX = 3
            this.flash.postFX.addGlow(0xFFFFFF, 3, 0)
            this.flash.postFX.addGlow(0xFFD700, 0, 3)
            this.add.tween({
                targets: this.flash,
                scale: {from: 3, to: 0},
                alpha: {from: 1, to: 0},
                duration: 100,
                ease: 'linear'
            })
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.flash.destroy()
                },
            })
            note.destroy()
        } 
        
        
        
        if (combo > maxCombo){
            maxCombo = combo
        }
    }

    update(){
        // 15 40 70 100 150
        this.timer.setText(Math.floor((this.gameTimer - this.clock.getElapsed())/1000))
        this.scoreNUMBER.setText(score)
        this.comboNUMBER.setText(combo)
        // speed control panel
        if (Phaser.Input.Keyboard.JustDown(keyTAB)){
            if (!scenePaused){
                this.noteSpawning.paused = true
                this.add.tween({
                    targets: [this.closeSpeedControl, this.speedControlPanel, this.speedTEXT, this.speedTEXTbackground, this.AtoDecrease, this.quotetoIncrease, this.RtoRestart, this.goBacktoMenu],
                    scale: {from: 0, to: 1},
                    duration: 100,
                    ease: 'linear'
                })
                this.bgm.setVolume(0.1)
                this.slow_mode.play()
                scenePaused = true;
            } else {
                if (!aimMode){
                    this.noteSpawning.paused = false
                }
                this.add.tween({
                    targets: [this.closeSpeedControl, this.speedControlPanel, this.speedTEXT, this.speedTEXTbackground, this.AtoDecrease, this.quotetoIncrease, this.RtoRestart, this.goBacktoMenu],
                    scale: {from: 1, to: 0},
                    duration: 100,
                    ease: 'linear'
                })
                this.bgm.setVolume(0.5)
                this.slow_mode.stop()
                scenePaused = false;
            }
        }

        // reticle
        if (Phaser.Input.Keyboard.JustDown(keySHIFT) && bulletCount > 0){
            if (!aimMode){
                this.noteSpawning.paused = true
                aimMode = true
                this.bgm.setVolume(0.1)
                this.slow_mode.play()
            } else {
                this.noteSpawning.paused = false
                reticle.setVisible(false)
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

        // speed control panel
        if(scenePaused){
            Phaser.Actions.Call(this.noteGroup.getChildren(), (note) => note.speed = 0.1)
            if (Phaser.Input.Keyboard.JustDown(keyFIRST) && speed > 1){
                speed--;
                this.speedAltered = true
            } else if (Phaser.Input.Keyboard.JustDown(keyFOURTH) && speed < 10){
                speed++;
                this.speedAltered = true
            } else if (Phaser.Input.Keyboard.JustDown(keyR)){
                aimMode = false
                scenePaused = false
                this.scene.restart()
            } else if (Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.bgm.stop()
                this.scene.start('menuScene')
            }
            this.noteSpawning.delay = -369.1503 * Math.log(0.0666085*speed)
            this.speedTEXT.setText(speed)
        // aim mode
        } else if(aimMode){
            reticle.setVisible(true)
            Phaser.Actions.Call(this.noteGroup.getChildren(), (note) => note.speed = 0.1)
            var targeted_enemy = Phaser.Actions.GetFirst(this.enemyGroup.getChildren(), {targeted: true} )

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
                this.shoot_sound.play()
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
                if (targeted_enemy != null ){
                    score += 500
                    this.enemy_death_sound.play()
                    targeted_enemy.anims.play('enemy_death')
                    this.time.addEvent({
                        delay: 200,
                        callback: () => {
                            targeted_enemy.destroy()
                        },
                    })
                }
                reticle.setVisible(false)
                this.bgm.setVolume(0.5)
                this.slow_mode.stop()
            }
        } else {
            if (!this.speedAltered){
                speed = (1/5)*combo + 1
            }
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

        if (gameOverPass){
            this.bgm.stop()
            aimMode = false
            scenePaused = false
            this.scene.start('scoreScreenScene')
        }

        if (gameOverFail){
            this.bgm.stop()
            if (!this.spawn_once) {
                aimMode = false
                scenePaused = false
                let failScreen = new Enemy(this, 'enemy1', 0, 1)
                failScreen.setPosition(width/2, height/2)
                failScreen.setDepth(11)
                failScreen.setScale(3)
                if (!this.fail_screen_idle_animation){
                    this.fail_screen_idle_animation = this.anims.create({
                        key: 'fail_idle',
                        frameRate: 48,
                        repeat: -1,
                        frames: this.anims.generateFrameNames('enemy_spritesheet', {
                            prefix: 'enemy_frame',
                            start: 1,
                            end: 4
                        }),
                    })
                }
                failScreen.anims.play('fail_idle')
                this.spawn_once = true

                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.scene.start('scoreScreenScene')
                    },
                })
            }
        }
    }
}
