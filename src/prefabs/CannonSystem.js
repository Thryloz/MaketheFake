class CannonSystem extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.charge = 0;
        this.ammo = 0;
    }

    update(){
        if (this.charge >= 100){
            this.charge = 0
            this.ammo += 1 
        }
    }

    increaseCharge(energy){
        charge += energy;
    }
}