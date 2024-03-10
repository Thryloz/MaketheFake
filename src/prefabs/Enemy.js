class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, texture, frame, hp){
        xPosition = Math.random() * (880-200) + 200 
        yPosition = Math.random() * (height-200-50) + 50 
        super(scene, xPosition, yPosition, texture, frame, hp)
        scene.add.existing(this)
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
            this.setX(Math.random() * (880-200) + 200 )
            this.setY(Math.random() * (height-200-50) + 50) 
            this.setScale(this.scale)
        }
        if (reticle.x > this.x - this.width && reticle.x < this.x + this.width && reticle.y > this.y - this.height && reticle.y < this.y + this.height){
            this.targeted = true
            console.log(this.targeted)
        } else {
            this.targeted = false
        }


        if (this.scale > 5) {
            gameOver = true
        }
    }
}