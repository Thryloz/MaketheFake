
class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }
    preload(){
        this.load.bitmapFont('gem', './assets/gem.png', './assets/gem.xml'); // yoinked from example
        this.load.image('logo', './assets/logo.png');

        this.load.atlas('tutorial', './assets/tutorial/tutorial_sheet.png', './assets/tutorial/tutorial_sheet.json')
        this.load.atlas('silverwolf_gif', './assets/silverwolf_gif.png', './assets/silverwolf_gif.json')
    }

    create(){

        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.logo = this.add.image(width/2, 220, 'logo').setScale(1)


        this.PLAY = this.add.bitmapText(width/2, 400, 'gem', 'PLAY', 64).setOrigin(0.5).setTint(0xFFFFFF).setScale(1.2);
        this.TUTORIAL = this.add.bitmapText(width/2, 500, 'gem', 'TUTORIAL', 64).setOrigin(0.5).setTint(0xA020F0);
        this.CREDITS = this.add.bitmapText(width/2, 600, 'gem', 'CREDITS', 64).setOrigin(0.5).setTint(0xA020F0);

        this.instructions = this.add.bitmapText(width/2, 680, 'gem', 'Press SPACE to select and arrow keys to move', 30).setTint(0xffffff).setOrigin(0.5);


        this.cursor = 400

        this.animation_playing = false
        this.play_tween = this.tweens.add({
            targets: this.PLAY,
            duration: 800,
            alpha: { from: 1, to: 0},
            yoyo: true,
            repeat: -1,
        });
        this.tutorial_tween = this.tweens.add({
            targets: this.TUTORIAL,
            duration: 800,
            alpha: { from: 1, to: 0},
            yoyo: true,
            repeat: -1,
        });
        this.credits_tween = this.tweens.add({
            targets: this.CREDITS,
            duration: 800,
            alpha: { from: 1, to: 0},
            yoyo: true,
            repeat: -1,
        });

        this.tutorial_tween.pause()
        this.credits_tween.pause()
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyDOWN)){
            if (this.cursor == 400){
                this.cursor += 100
                this.PLAY.setScale(1)
                this.PLAY.setAlpha(1)
                this.TUTORIAL.setScale(1.2)
                this.PLAY.setTint(0xA020F0)
                this.TUTORIAL.setTint(0xFFFFFF)
                this.play_tween.reset()
                this.play_tween.pause()
                this.tutorial_tween.resume()
            } else if (this.cursor == 500){
                this.cursor += 100
                this.TUTORIAL.setScale(1)
                this.TUTORIAL.setAlpha(1)
                this.TUTORIAL.setTint(0xA020F0)
                this.CREDITS.setScale(1.2)
                this.CREDITS.setTint(0xFFFFFF)
                this.tutorial_tween.reset()
                this.tutorial_tween.pause()
                this.credits_tween.resume()
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyUP)){
            if (this.cursor == 600){
                this.cursor -= 100
                this.CREDITS.setScale(1)
                this.CREDITS.setAlpha(1)
                this.CREDITS.setTint(0xA020F0)
                this.TUTORIAL.setScale(1.2)
                this.TUTORIAL.setTint(0xffffff)
                this.credits_tween.reset()
                this.credits_tween.pause()
                this.tutorial_tween.resume()
            } else if (this.cursor == 500){
                this.cursor -= 100
                this.TUTORIAL.setScale(1)
                this.TUTORIAL.setAlpha(1)
                this.TUTORIAL.setTint(0xA020F0)
                this.PLAY.setScale(1.2)
                this.PLAY.setTint(0xffffff)
                this.tutorial_tween.reset()
                this.tutorial_tween.pause()
                this.play_tween.resume()
            } 
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            switch(this.cursor){
                case (400):
                    if (!this.animation_playing)
                    this.tweens.add({
                        targets: this.logo,
                        duration: 1500,
                        scale: { from: 1, to: 15 },
                        alpha: { from: 1, to: 0},
                        repeat: 0,
                    });
                    this.animation_playing = true
                    this.play_tween.pause()
                    this.PLAY.setAlpha(0)
                    this.TUTORIAL.setAlpha(0)
                    this.CREDITS.setAlpha(0)
                    this.instructions.setAlpha(0)
                    this.time.delayedCall(1500, () => {
                        this.scene.start('playScene');
                    }, null, this)
                    
                    break;
                case (500):
                    this.scene.start('tutorialScene')
                    break;
                case (600):
                    this.scene.start('creditsScene')
                    break;
                default:
                    break;
            }
        }

    }

}