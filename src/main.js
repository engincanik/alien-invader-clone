/** @type {import ("../typings/phaser") */



let game = new Phaser.Game({
    width:800,
    height:600,
    scene: [firstScene],
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: {y: 10}
        }
    },
    render:{
        pixelArt: true
    }
})