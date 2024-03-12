class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, texture, frame, hp){
        super(scene, 0, 0, texture, frame, hp)
        scene.add.existing(this)
        this.setRandomPosition(200, 180, 680, 350)
        this.hp = hp
        this.scale = 2
        this.setScale(this.scale)
        this.timeBetweenMoving = Math.random() * (800-500) + 500
        this.time = 0
        this.targeted = false
    }

    update(){
        this.time++
        if (this.time > this.timeBetweenMoving){
            this.time = 0
            this.scale++
            this.setRandomPosition(150, 140, 780, 430)
            this.setScale(this.scale)
        }
        if (reticle.x > this.x - this.width*this.scale && reticle.x < this.x + this.width*this.scale && reticle.y > this.y - this.height * this.scale && reticle.y < this.y + this.height * this.scale){
            this.targeted = true
        } else {
            this.targeted = false
        }


        if (this.scale > 4) {
            gameOver = true
        }
    }
}