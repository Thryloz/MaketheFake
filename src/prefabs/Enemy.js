class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, texture, frame, hp){
        super(scene, 0, 0, texture, frame, hp)
        scene.add.existing(this)
        this.setRandomPosition(200, 180, 680, 350)
        this.hp = hp
        this.scale = 0.2
        this.setDisplaySize(210, 150)
        this.timeBetweenMoving = Math.random() * (800-500) + 500
        this.time = 0
        this.targeted = false
        this.width = 210
        this.height = 150
        this.depth = 1
    }

    update(){
        this.time++
        if (this.time > this.timeBetweenMoving){
            this.time = 0
            this.scale += 0.1
            this.depth++;
            this.setRandomPosition(150, 140, 780, 430)
        }
        if (reticle.x > this.x - this.width && reticle.x < this.x + this.width && reticle.y > this.y - this.height && reticle.y < this.y + this.height){
            this.targeted = true
            console.log(this.targeted)
        } else {
            this.targeted = false
        }


        if (this.scale > 0.5) {
            gameOver = true
        }
    }
}