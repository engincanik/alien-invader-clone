/** @type {import ("../typings/phaser") */

 

class deadScene extends Phaser.Scene{
    constructor(){
        super({key: 'deadScene'})
    }
    preload(){
        this.load.image('dieBC','assets/dead.png')
    }
    create(){
        this.bc = this.add.tileSprite(400,320,0,0,'dieBC')

        this.key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }
    update(){
        if (this.key_R.isDown) {
            this.scene.start('firstScene')
            this.scene.launch('firstScene')
            
            this.scene.stop()
        }
    }

}