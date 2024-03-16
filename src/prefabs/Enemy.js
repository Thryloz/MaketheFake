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


    }

    update(){
        this.time++
        if (this.time > this.timeBetweenMoving){
            this.anims.play('phase_out', true)
            this.time = 0
            this.scale += 0.1
            this.depth++; 
            this.scene.time.delayedCall(300, () => {
                this.setRandomPosition(150, 140, 780, 430)  
            }, null, this)
            this.scene.time.delayedCall(350, () => {
                this.anims.play('phase_in', true)
            }, null, this)
            this.scene.time.delayedCall(600, () => {
                this.anims.play('idle', true)
            }, null, this)
        }
        if (reticle.x > this.x - (this.width * this.scale)/2 && reticle.x < this.x + (this.width * this.scale)/2 && reticle.y > this.y - (this.height * this.scale)/2 && reticle.y < this.y + (this.height * this.scale)/2){
            this.targeted = true
        } else {
            this.targeted = false
        }


        if (this.scale > 0.4) {
            gameOverFail = true
        }
    }
}