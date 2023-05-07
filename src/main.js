console.log("what is happening")

let config = {

    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [Menu, Play]

}

let game = new Phaser.Game(config);

// reserve keyboard vars

let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, clickLeft;

// set UI

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// a few global/reserved variables
let centerX = game.config.width/2;
let widthSpacer = game.config.width/5;
let halfHeight = game.config.height/2;
let swap = null;
let cursors = null;
