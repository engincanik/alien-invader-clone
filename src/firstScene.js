/** @type {import ("../typings/phaser") */


let knight;
let k;
var swords;
var dragons;
let yon;

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
        this.load.image('Iwall','assets/InvisibleWall.png')

        this.load.spritesheet('redFire','assets/redFire.png',{
            frameHeight:30,
            frameWidth:30
        })
        this.load.image('blueFire','assets/blueFire.gif')
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
        this.key_F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)

        this.wall1 = this.physics.add.sprite(-30,10,'Iwall')
        this.wall1.scaleY = 7
        
        this.wall2 = this.physics.add.sprite(830,10,'Iwall')
        this.wall2.scaleY = 7
        
        this.fire = this.physics.add.sprite(100,100,'blueFire')
        

        this.anims.create({
            key:'fire',
            frames: this.anims.generateFrameNumbers('redFire',{start: 0, end:0}),
            frameRate: 10,
            repeat: -1
        })
        
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

        swords = this.physics.add.group({
            classType: Sword,
            maxSize: 10,
            runChildUpdate: true
        })

        dragons = this.physics.add.group({
            maxSize: 18
        })

        for ( var y = 0; y < 3; y++ ) {
            for ( var x = 0; x < 6; x++ ) {
                var dragon = dragons.create( x *80, y * 100, 'dragon' );
                //dragon.setCollideWorldBounds(true)
                dragon.setOrigin( 0.1, 0.1 );
                dragon.setScale(0.5)
                dragon.body.immovable = true

            }
        }

        // Center our collection of aliens.
        Phaser.Actions.IncX( dragons.getChildren(), 20 );
        // Bring them further into the scene vertically.
        Phaser.Actions.IncY( dragons.getChildren(), 50 );
        
        yon=0
        this.physics.add.collider(dragons,this.wall1,this.collisionHandler,null,this)
        this.physics.add.collider(dragons,this.wall2,this.collisionHandler2,null,this)

        this.physics.add.overlap(dragons,swords,this.enemyHit,null,this)

        this.wall1.body.immovable = true
        this.wall2.body.immovable = true
    }
    update(){
        this.bg_1.tilePositionX += 10


        
        if(yon==0){
            Phaser.Actions.Call(dragons.getChildren(), function(go) {
                go.setVelocityX(100)
                })
        }
        
        
        if(yon==1){
            Phaser.Actions.Call(dragons.getChildren(), function(go) {
                go.setVelocityX(-100)
              })
        }



        if(this.key_F.isDown){
            this.fire.setVelocityY(100)
        }

        if(this.key_A.isDown)
        {   
            k = 1
            knight.setVelocityX(-300)
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
        /*this.swords.children.each((b) => {
            if (b.active) {
                if (b.y < 0) {
                    b.setActive(false);
                }
            }
        })*/
    }
    collisionHandler(){
        yon = 0
    }
    collisionHandler2(){
        yon = 1
    }
    enemyHit(dragon,sword){
        if ( sword.active === true ) {
            console.log("Hit!");
    
            sword.setActive(false)
            sword.setVisible(false)
            dragon.body.destroy(true)
            dragon.setVisible(false)
        }
    }
}
