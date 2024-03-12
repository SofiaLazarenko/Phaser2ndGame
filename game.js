var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    pixelArt:true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    
};

//створюєм гру
var score = 0;
var scoreText;
var worldWidth=9600;
 var game = new Phaser.Game(config);
if (gameOver = true) {
    var gameText;
}
//асети
function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('Tile (14)'/'assets/Tile (14).png');
    this.load.image('Tile (15)'/'assets/Tile (15).png');
    this.load.image('Tile (16)'/'assets/Tile (16).png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('tre','assets/Tre.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}
//фон
var platforms;

function create() {
 this.add.image(0, 0, 'sky').setOrigin(0,0).setScale(2.5);

    this.add.tileSprite(0,0,worldWidth,1080,'sky').setOrigin(0,0);
   
    
   

    platforms = this.physics.add.staticGroup();
//платформа
for(var x=0; x<worldWidth; x=x+500){
    console.log(x)
    platforms.create(x,1000,'Tile (15) ').setOrigin(0,0).refreshBody();
}



//платформи 
//for(var x=0; x < worldWidth; x=x+Phaser.Math.FloatBetween(400,500)){
    //var y= Phaser.Math.FloatBetween(100,1000)
    //platforms.create(x,y,'ground');
//}
//додаємо дерево
tre= this.physics.add.staticGroup();
//Додаємо дерева на всю ширину екрану
for(var x = 500; x<worldWidth; x=x+Phaser.Math.FloatBetween(300, 1600)){
    console.log(' x-'+ x)
    tre.create(x, 1080-80,'tre').setOrigin(0,1).setScale(Phaser.Math.FloatBetween(0.5, 1)).refreshBody();
}



    //platforms.create(0, 1000, 'ground').setOrigin(0,0).setScale(2).refreshBody();
   // platforms.create(800, 1000, 'ground').setOrigin(0,0).setScale(2).refreshBody();
    //platforms.create(1600, 1000, 'ground').setOrigin(0,0).setScale(2).refreshBody();
    //platforms.create(2400, 1000, 'ground').setOrigin(0,0).setScale(2).refreshBody();
    //platforms.create(3200, 1000, 'ground').setOrigin(0,0).setScale(2).refreshBody();
    

    //platforms.create(600, 400, 'ground');
    //platforms.create(50, 250, 'ground');
   // platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude').setScale(4);
   
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);

    //камера
    this.cameras.main.setBounds(0,0,worldWidth,window.innerHeight);
    this.physics.world.setBounds(0,0,worldWidth,window.innerHeight);
    this.cameras.main.startFollow(player)


//анімація
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });


    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1




    });
//гроші
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    //намагаємось змусити скор слідууати за гравцем
   
scoreText = this.add.text(100, 100, "score: 0", { fontSize: '40px', fill: '#EACE06' })
.setScrollFactor(0);

for (var x = 0; x < worldWidth; x = x + Phaser.Math.Between(600, 700)) {
     var y = Phaser.Math.FloatBetween(700, 93 * 10) platforms.create(x, y, 'platformStart'); 
     var i;
      for (i = 1; i < Phaser.Math.Between(0, 5); i++) {
         platforms.create(x + 100 * i, y, 'platformOne');
         } platforms.create(x + 100 * i, y, 'platformFinish'); 
        }
   

   
    

    //bombs = this.physics.add.group();

    //this.physics.add.collider(bombs, platforms);

    //this.physics.add.collider(player, bombs, hitBomb, null, this);
}
//?
function update() {
    console.log(player.y)
    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        player.setVelocityX(-200);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(200);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-400);
    }
 
}
function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;



}
function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });
    }
}
