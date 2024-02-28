class Note extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y){
        let spawnLanePosition = [game.config.width/4, 
                                 game.config.width/4 + ((game.config.width - (game.config.width/4))-width/4)/3, 
                                 game.config.width/4 + ((game.config.width - (game.config.width/4))-width/4)/3 * 2, 
                                 game.config.width - (game.config.width/4)];
        let spawnLane = Math.floor(Math.random() * 4);
        console.log(spawnLane)
        // scene, x, y, sprite name
        super(scene, spawnLanePosition[spawnLane], y, 'barrier');
    
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setImmovable();
        this.setVelocityY(800)
        this.Note = true;
        this.clickableState = true;
        this.setScale(1)
    }

    update(){

        

        if(this.y > game.config.height) {
            this.destroy();
        }

    }





}