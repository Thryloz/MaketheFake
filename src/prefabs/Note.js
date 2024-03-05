class Note extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y, speed){
        let spawnLanePosition = [LANE_ONE, LANE_TWO, LANE_THREE, LANE_FOUR];
        let spawnLane = Math.floor(Math.random() * 4);
        // scene, x, y, sprite name
        super(scene, spawnLanePosition[spawnLane], y, 'barrier');
        this.scene.add.existing(this);
        this.speed = speed
        this.setScale(1)
    }

    update(){

        this.y += this.speed

        if(this.y > game.config.height) {
            this.destroy();
        }

    }





}