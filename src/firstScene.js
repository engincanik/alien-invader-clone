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


var Enemy = new Phaser.Class({
    Extends: Phaser.Physics.Arcade.Sprite,
    initialize:
    
    function Enemy (scene)
    {
        Phaser.Physics.Arcade.Sprite.call(this,scene,0,0,'dragon')
        this.setDepth(1)
        this.speed = 100
    },
    launch: () =>
    {
        this.checkOutOfBounds() = false
        this.setActive(true)
        this.setVisible(true)
        dragons.x = 100
        dragons.y = 50

        //var tween = this.physics.add.tween(dragons).to({x:200},
          //  2000,Phaser.Easing.Lineer.None,true,1000,true)   
        //tween.onLoop.add(descend,this )

    }
})

class firstScene extends Phaser.Scene {
    constructor(){
        super({key: "firstScene"});
    }

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
        this.load.image('dragon',"assets/dragon.png")
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

        dragons = this.add.group({
            classType: Enemy,
            runChildUpdate: true
        })

    }
    update(){
        //this.bg_1.tilePositionX += 10
        
        /*if(this.key_A.isDown){
            for(let y = 0; y<4; y++){
                for (let x = 0; x < 10; x++) {
                    let dragon = dragons.get()        
                    if (dragon) {
                        dragon.setOrigin(0+x,0+y)
                    }
                }
            } 
        }*/
        
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