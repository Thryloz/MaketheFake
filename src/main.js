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
    pixelArt: true,
    //scene: [ Play, Menu, Credits, ScoreScreen]
    scene: [ Play, Menu, Tutorial, Credits, ScoreScreen]
}

let game = new Phaser.Game(config);

let font = 'gem'

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

let keySHIFT, keySPACE, keyESC, keyTAB, keyFIRST, keySECOND, keyTHIRD, keyFOURTH, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyW, keyD, keyR
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

let combo = 0
let maxCombo = 0
let excellentCOUNT = 0
let perfectCOUNT = 0
let goodCOUNT = 0
let badCOUNT = 0
let missCOUNT = 0

let bulletCount = 0

let noteSpawning
let speedControlPanel
let speed

let xPosition, yPosition
let gameOver = false
let reticle

let score
let amountOfNotes = 0