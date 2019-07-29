/** @type {import ("../typings/phaser") */


let knight;
let k;
var swords;
var dragons;


var Sword = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize:
    function Sword (scene)
    {
        Phaser.GameObjects.Image.call(this,scene,0,0,'shinySword')
        this.speed = Phaser.Math.GetSpeed(300,1)
    },
    fire: function(x,y)
    {
        this.setPosition(x,y-50)
        this.setActive(true)
        this.setVisible(true)
    },
    update: function (time,delta)
    {
        this.y -= this.speed * delta
        if(this.y < 20)
        {
            this.setActive(false)
            this.setVisible(false)
        }
    }
})


class firstScene extends Phaser.Scene {
    constructor(){
        super({key: "firstScene"});
    }

    /*createDragons() {

        // We want 3 rows of 10 aliens each.
        for ( var y = 0; y < 3; y++ ) {
            for ( var x = 0; x < 10; x++ ) {
                var dragon = dragons.create( x *5, y * 4, 'dragon' );
                dragon.setOrigin( 0.5, 0.5 );
                //dragon.lastFired = 0;
                
            }
        }
    
        // Center our collection of aliens.
        Phaser.Actions.IncX( dragons.getChildren(), 60 );
    
        // Bring them further into the scene vertically.
        Phaser.Actions.IncY( dragons.getChildren(), 75 );
    }*/

    preload() {
        this.load.image("bg_1",'assets/fencesky.png')
        this.load.spritesheet("kRight",'assets/kWalk.png',{
            frameHeight: 42,
            frameWidth: 42
        })
        this.load.spritesheet('kIdle','assets/kIdle.png',{
            frameHeight: 42,
            frameWidth: 42
        })
        this.load.spritesheet('kLeft',"assets/kLeft.png",{
            frameHeight: 42,
            frameWidth: 42
        })
        this.load.spritesheet('kIdleLeft',"assets/kIdleLeft.png",{
            frameHeight: 42,
            frameWidth: 42
        })
        
        this.load.image("shinySword",'assets/shinySword.png')
        this.load.image('dragon' , 'assets/dragon.png')
        
    }

    create() {
        this.bg_1 =this.add.tileSprite(0,0,0,0,'bg_1')
        this.bg_1.displayHeight = this.sys.game.config.height
        this.bg_1.displayWidth = this.sys.game.config.width
        this.bg_1.setOrigin(0,0)
        this.bg_1.setScrollFactor(0)
        
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.key_Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        knight = this.physics.add.sprite(200,485,'kIdle')
        knight.setScale(2)
        knight.setCollideWorldBounds(true)

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('kRight', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers('kLeft',{start:0 ,end:7}),
            repeat: -1,
            frameRate: 10,
        })
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('kIdle',{start:0 ,end:7}),
            repeat: -1,
            frameRate: 10
        })
        this.anims.create({
            key: "idleLeft",
            frames: this.anims.generateFrameNumbers('kIdleLeft',{start:0, end:7}),
            frameRate: 10,
            repeat: -1
        })

        swords = this.add.group({
            classType: Sword,
            maxSize: 10,
            runChildUpdate: true
        })

        dragons = this.physics.add.group({
            key:'dragon',
            frameQuantity:20,
            collideWorldBounds:'true',
        })

    
        /*Phaser.Actions.GridAlign(group.getChildren(), {
            width: 10,
            height: 10,
            cellWidth: 32,
            cellHeight: 32,
            x: 100,
            y: 100
        });*/



    }
    update(){
        this.bg_1.tilePositionX += 10
        
        if(this.key_A.isDown)
        {   
            k = 1
            knight.setVelocityX(-250)
            knight.anims.playReverse("left",true)
        }
        else if(this.key_D.isDown)
        {
            k = 0
            knight.setVelocityX(250)
            knight.anims.play("right",true)
        }
        else if(this.key_D.isUp && this.key_A.isUp){
            knight.setVelocityX(0);
            if (k===1) {
                knight.anims.play("idleLeft",true)    
            }else{
                knight.anims.play("idle",true)        
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.key_Space)) {
            var sword = swords.get()
            if(sword)
            {
                sword.fire(knight.x,knight.y)
            }
        }
    }
}
