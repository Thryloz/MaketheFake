class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, texture, frame, hp){
        super(scene, 0, 0, texture, frame, hp)
        scene.add.existing(this)
        this.setRandomPosition(200, 180, 680, 350)
        this.hp = hp
        this.scale = 0.2
        this.timeBetweenMoving = Math.random() * (800-500) + 500
        this.time = 0
        this.targeted = false
        this.width = 210
        this.height = 150
        this.depth = 1

        this.anims.play('phase_in', true)
        this.scene.time.delayedCall(300, () => {
            this.anims.play('idle', true)
        }, null, this)
        this.setScale(this.scale)


        this.debugRectangle = this.scene.add.rectangle(this.x, this.y, this.width * this.scale, this.height * this.scale, 0xFF0000, 0.5)
    }

    update(){
        this.time++
        if (this.time > this.timeBetweenMoving){
            this.anims.play('phase_out', true)
            this.time = 0
            this.scale += 0.1
            this.depth++;
            this.setRandomPosition(150, 140, 780, 430)  
            this.anims.play('phase_in', true)
            this.anims.play('idle', true)
            this.debugRectangle.destroy()
            //console.log(this.scale)
            //this.debugRectangle = this.scene.add.rectangle(this.x, this.y, this.width * this.scale, this.height * this.scale, 0xFF0000, 0.5)
        }
        if (reticle.x > this.x - (this.width * this.scale)/2 && reticle.x < this.x + (this.width * this.scale)/2 && reticle.y > this.y - (this.height * this.scale)/2 && reticle.y < this.y + (this.height * this.scale)/2){
            this.targeted = true
            console.log(this.targeted)
        } else {
            this.targeted = false
        }


        if (this.scale > 0.4) {
            gameOver = true
        }
    }
}