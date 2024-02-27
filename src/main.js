// Jim Lee

'use strict';

let config = {
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade:{
            //debug: true,
            gravity: {
                x:0,
                y:0
            },
        }
    },
    scene: [ Play, Menu, Credits, PauseScreen  ]
}

let game = new Phaser.Game(config);

let width = game.config.width;
let height = game.config.height;
let keyENTER, keySPACE, keyESC
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let scenePaused = false

let visibleZone, excellentZone, perfectZone, goodZone, badZone, missZone