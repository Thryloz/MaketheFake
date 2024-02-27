class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    create(){
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        visibleZone = this.add.rectangle(game.config.width/2, game.config.height-150, game.config.width, 2, 0xFF0000, 0.5)
        excellentZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 15, 0x4169E1, 0)
        perfectZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 40, 0xA020F0, 0)
        goodZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 70, 0xA02AF0, 0.5)
        badZone = this.add.rectangle(visibleZone.x, visibleZone.y, game.config.width, 100, 0xAAAAF0, 0.5)

        this.noteGroup = this.add.group({
            runChildUpdate: true    
        });

        

        this.addNote()
    }

    addNote() {
        let note = new Note(this, 0);
        this.noteGroup.add(note)
    }

    update(){

        if (keyESC.isDown && !scenePaused){
            this.game.scene.pause();
            scenePaused = true;
        }

        if (keyESC.isDown && scenePaused){
            this.scene.resume();
        }

        
    }
}