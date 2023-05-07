// Rocket prefab

//// NOTES ///////////

//////////////////////

class Rocket extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {

        console.log("from Rocket.js: constructing...");

        super(scene, x, y, texture, frame);     // inherit or somethin'
        this.parentScene = scene;               // save scene

        // set up physics sprite

            this.parentScene.add.existing(this);            // first add to scene
            this.parentScene.physics.add.existing(this);    // then add to PHYSICS scene

            this.setActive(true);

            this.setCollideWorldBounds(true);               // cannot pass world limits
            this.setBounceX(0.5);                            // bounce on collision
            this.setMaxVelocity(300, 1000);                  // x, y
            this.setDragX(600);                             // rate for slow-down x
            //this.setImmovable();                          // eliminate agency
            
        // default variables

            this.velocity = 50;     // own custom rate
            this.jumpPower = 250;
            this.jumped = false;

        // misc

            this.sfxRocket = scene.sound.add('sfx_rocket');     // for simple sound effect

    }

    update() {      // update method

        if (keyLEFT.isDown && this.x >= borderUISize + this.width) {

            this.body.velocity.x -= this.velocity;


        } else if (keyRIGHT.isDown && this.x <= game.config.width -
        borderUISize - this.width) {

            this.body.velocity.x += this.velocity;

        }

        if (Phaser.Input.Keyboard.JustDown(keyF)) {               //  Allow the player to jump if they are touching the ground.        
                
            this.jump(this.jumpPower);      

        }

    }

    jump(power)
    {
        console.log("jumping!!");
        this.body.velocity.y -= power;
    }

}