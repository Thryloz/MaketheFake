// Jim Lee

'use strict';

let config = {
    type: Phaser.AUTO,
    height: 720,
    width: 1080,
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
    scene: [ Play, Menu, Credits, ]
}

let game = new Phaser.Game(config);

let width = game.config.width;
let height = game.config.height;
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let scenePaused = false

let keyENTER, keySPACE, keyESC, keyFIRST, keySECOND, keyTHIRD, keyFOURTH
let visibleZone, excellentZone, perfectZone, goodZone, badZone, missZone
let keyOne, keyTwo, keyThree, keyFour
let clickableState
let timeBetweenNotes