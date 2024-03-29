var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    //pixelArt:true,
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
//var bomb;
var   life=5;
 var game = new Phaser.Game(config);
if (gameOver = true) {
    var gameText;
    player.setTint(0xff0000);

}
//асети
function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('platformStart','assets/platformStart.png');
    this.load.image('platformOne','assets/platformOne.png');
    this.load.image('platformFinish','assets/platformFinish.png');
    //this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('enemy', 'assets/enemy.png');
    
    this.load.image('tre','assets/Tre.png');
    this.load.image('ArrowSign','assets/ArrowSign.png');
    this.load.image('Bush','assets/Bush (2).png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}
//фон
var platforms;

function create() {
 this.add.image(0, 0, 'sky').setOrigin(0,0).setScale(60);

    this.add.tileSprite(0,0,worldWidth,1080,'sky').setOrigin(0,0);
   
    
   

    platforms = this.physics.add.staticGroup();
//платформа
for(var x=0; x<worldWidth; x=x+100){
    console.log(x)
    platforms.create(x,1000,'platformOne').setOrigin(0,0).refreshBody();
}


 



//додаємо дерево
tre= this.physics.add.staticGroup();
//Додаємо дерева на всю ширину екрану
for(var x = 500; x<worldWidth; x=x+Phaser.Math.FloatBetween(300, 1600)){
    console.log(' x-'+ x)
    tre.create(x, 1080-80,'tre').setOrigin(0,1).setScale(Phaser.Math.FloatBetween(0.5, 1)).refreshBody();
}
//додаємо знак
ArrowSign=this.physics.add.staticGroup();
//Додаємо знаки на всю ширину екрану
for(var x = 500; x<worldWidth; x=x+Phaser.Math.FloatBetween(300, 1600)){
    console.log(' x-'+ x)
    ArrowSign.create(x, 1080-80,'ArrowSign').setOrigin(0,1).setScale(Phaser.Math.FloatBetween(0.5, 1)).refreshBody();
}

Bush= this.physics.add.staticGroup();
//Додаємо дерева на всю ширину екрану
for(var x = 1000; x<worldWidth; x=x+Phaser.Math.FloatBetween(300, 1600)){
    console.log(' x-'+ x)
    Bush.create(x, 1080-80,'Bush').setOrigin(0,1).setScale(Phaser.Math.FloatBetween(0.5, 1)).refreshBody();
}



    player = this.physics.add.sprite(100, 450, 'dude').setScale(2);
  
       
      

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
        repeat: 1200,
        setXY: { x: 12, y: 0, stepX: 120 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    //намагаємось змусити скор слідууати за гравцем
   
scoreText = this.add.text(100, 100, "score: 0", { fontSize: '40px', fill: '#8FBC8F' })
.setScrollFactor(0);
//життя
lifeText= this.add.text(1500,100,showLife(), { fontSize: '30px', fill:'#8FBC8F'})
.setOrigin(0,0)
.setScrollFactor(0);
//bombs = this.physics.add.group();
//this.physics.add(bombs,platformOne);
//this.physics.add.collider(player,bombs,hitBomb,null,this);

//рандомні платформи
for (var x = 0; x < worldWidth; x = x + Phaser.Math.Between(600, 700)) {
     var y = Phaser.Math.FloatBetween(700, 93 * 10)
      platforms.create(x, y, 'platformStart'); 
      for (var i = 1; i < Phaser.Math.Between(0, 5); i++) {
         platforms.create(x + 100 * i, y, 'platformOne');
         } platforms.create(x + 100 * i, y, 'platformFinish');
        }
   function createBombs(){


   }
//смуга життя
function showLife() {
    var lifeLine = "Життя:" 
    for ( var i=0; i< life ; i++){
        lifeLine += '💚'
    }
    return lifeLine
}
   
function hitBomb(player, bomb) {
    
  bomb.disableBody(true,true);
   
    life -= 1;
    lifeText.setText(showLife())
  console.log('boom')
    //player.anims.play('turn');

    if(life== 0){
        this.physics.pause();
    } gameOver=true;
 

}


   
  
  
  
    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null,this);

    const enemies = this.physics.add.group();
    enemies.create(320, 10, 'enemy');  
  
   
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

function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
              var bomb = bombs.create(x,16,'bomb');
             bomb.setBounce(1);
                 bomb.setCollideWorldBounds(true);
             bomb.setVelocity(Phaser.Math.Between(-200,200),20);

    }
//}
//var x = (player.x<800) P
 //
