class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
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

        keyOne = this.add.image(game.config.width/4, game.config.height-100, "tap").setAlpha(0).setScale(3);
        keyTwo =  this.add.image(game.config.width/4 + ((game.config.width - (game.config.width/4))-width/4)/3, game.config.height-100, "tap").setAlpha(0).setScale(3);
        keyThree = this.add.image(game.config.width/4 + ((game.config.width - (game.config.width/4))-width/4)/3 * 2, game.config.height-100, "tap").setAlpha(0).setScale(3);
        keyFour = this.add.image(game.config.width - (game.config.width/4), game.config.height-100, "tap").setAlpha(0).setScale(3);


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
        let firstNote = this.noteGroup.getFirst(clickableState = true); // gets the first note in the group

        if (Phaser.Input.Keyboard.JustDown(keyFIRST)){
            this.tweens.add({
                targets: keyOne,
                alpha: { from: 1, to: 0},
                ease: 'Sine.InOut',
                duration: 450,
                repeat: 0,
            });
    
        }
        if (Phaser.Input.Keyboard.JustDown(keySECOND)){
            this.tweens.add({
                targets: keyTwo,
                alpha: { from: 1, to: 0},
                ease: 'Sine.InOut',
                duration: 450,
                repeat: 0,
            });
    
        }
        if (Phaser.Input.Keyboard.JustDown(keyTHIRD)){
            this.tweens.add({
                targets: keyThree,
                alpha: { from: 1, to: 0},
                ease: 'Sine.InOut',
                duration: 450,
                repeat: 0,
            });
            
        }
        if (Phaser.Input.Keyboard.JustDown(keyFOURTH)){
            this.tweens.add({
                targets: keyFour,
                alpha: { from: 1, to: 0},
                ease: 'Sine.InOut',
                duration: 450,
                repeat: 0,
            });
        
        }

    }
}