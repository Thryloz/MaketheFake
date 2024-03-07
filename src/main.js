// Jim Lee

'use strict';

let config = {
    type: Phaser.AUTO,
    height: 720,
    width: 1080,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    fps: {
        forceSetTimeOut: true,
        target: 60
    },
    scene: [ Play, Menu, Credits, ]
}

let game = new Phaser.Game(config);

let width = game.config.width;
let height = game.config.height;
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let LANE_ONE = game.config.width/4
let LANE_TWO = game.config.width/4 + ((game.config.width - (game.config.width/4))-width/4)/3
let LANE_THREE = game.config.width/4 + ((game.config.width - (game.config.width/4))-width/4)/3 * 2
let LANE_FOUR = game.config.width - (game.config.width/4)

let scenePaused = false
let aimMode = false

let keySHIFT, keySPACE, keyESC, keyTAB, keyFIRST, keySECOND, keyTHIRD, keyFOURTH
let visibleZone, excellentZone, perfectZone, goodZone, badZone, missZone
let excellentTEXT, perfectTEXT, goodTEXT, badTEXT, missTEXT
let keyOne, keyTwo, keyThree, keyFour
let timeBetweenNotes

let chargeUI, fill_bar
let charge_level

let excellentCHARGE = 15
let perfectCHARGE = 10
let goodCHARGE = 5
let badCHARGE = -2
let missCHARGE = -5

let bulletCount = 0

let noteSpawning
let speedControlPanel
let speed