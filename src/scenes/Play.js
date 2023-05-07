// Gameplay scene

//// NOTES ///////////



//////////////////////

class Play extends Phaser.Scene {

    constructor() {

        super('playScene');

    }

    preload() {     // assets to use

        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('swordfish', './assets/swordfish.png');
        this.load.image('platform', './assets/button.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, 
            startFrame: 0, endFrame: 9});

    }

    create() {      // happens exactly once at beginning

    // the set-up

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    
        // UI - score
        let scoreConfig = {

            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {

                top: 5,
                bottom: 5,

            },
            fixedWidth: 100

        }
        this.config2 = scoreConfig
    // the player

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // define keys for controls

        keyF = 
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = 
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = 
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = 
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = 
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.mouseActive = false;

    // the enemy

        //this.swordfish = new smallBoy(this, game.config.width, borderUISize*6 + borderPadding*3, 'swordfish', 0, 60).setOrigin(0, 0);

        //this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        
        // animation config for explosion
        this.anims.create({

            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30

        });

    // time up!
        
        this.secondsElapsed = 0;
        this.secondsElapsedText = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.secondsElapsed, this.config2);

        var timeUp = this.time.addEvent({
            delay: 30000,                // ms
            callback: this.timeUp,
            //args: [],
            callbackScope: this,
            loop: true
        });

        console.log("no bug here");

    // exit
        this.gameOverText = this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER, LOSER').setOrigin(0.5);
            this.gameOverText.alpha = 0;
        this.gameOverOptions = this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Try Again or <- for Menu!').setOrigin(0.5);
            this.gameOverOptions.alpha = 0;

    }

    update() {      // does once every frame

    // restart check

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.gameOver = false;
            this.scene.restart();
        }

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.gameOverText.alpha = 1;
            this.gameOverOptions.alpha = 1;
            this.gameOver = true;
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    
    // just the environment
        this.starfield.tilePositionX -= 4;

    // sprite movements
        if (!this.gameOver) {       // if game's still goin

            this.p1Rocket.update();

        }

    }

    timeUp() {

        this.secondsElapsed += 30;
        this.secondsElapsedText.text = this.secondsElapsed;

    }

}