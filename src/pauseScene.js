/** @type {import ("../typings/phaser") */

class pauseScene extends Phaser.Scene{
    constructor(){
        super({key: 'pauseScene'})
    }
    preload(){
        this.load.image('pauseBC','assets/paused.png')
    }
    create(){
        this.bc = this.add.tileSprite(400,320,0,0,'pauseBC')

        this.key_P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    }
    update(){
        if (this.key_P.isDown) {
            this.scene.resume('firstScene')
            this.scene.stop()
        }
    }

}