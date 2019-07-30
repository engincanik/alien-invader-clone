/** @type {import ("../typings/phaser") */

 

class winScene extends Phaser.Scene{
    constructor(){
        super({key: 'winScene'})
    }
    preload(){
        this.load.image('wonBC','assets/win.png')
    }
    create(){
        this.bc = this.add.tileSprite(400,320,0,0,'wonBC')

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