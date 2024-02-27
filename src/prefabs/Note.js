class Note extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y){
        let spawnLanePosition = [405, 455, 505, 555];
        let spawnLane = Math.floor(Math.random() * 4);
        // scene, x, y, sprite name
        super(scene, spawnLanePosition[spawnLane], y, 'barrier');
    
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setImmovable();
        this.setVelocityY(300)
        this.Note = true;
        this.setScale(1)
    }

    update(){

        if (this.Note && this.y > 300){
            this.scene.addNote();
            this.Note = false;
        }

        if(this.y > game.config.height) {
            console.log('destroyed')
            this.destroy();
        }

    }





}