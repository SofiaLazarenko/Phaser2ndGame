var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    
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
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('fire','assets/fire.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}
//фон
var platforms;

function create() {

    this.add.tileSprite(0,0,worldWidth,1080,"sky").setOrigin(0,0);
   
    
    this.add.image(0, 0, 'sky').setOrigin(0,0).setScale(1.5);

    platforms = this.physics.add.staticGroup();
//платформа
for(var x=0; x<worldWidth; x=x+500){
    console.log(x)
    platforms.create(x,1000,'ground').setOrigin(0,0).refreshBody();
}



    //platforms.create(0, 1000, 'ground').setOrigin(0,0).setScale(2).refreshBody();
   // platforms.create(800, 1000, 'ground').setOrigin(0,0).setScale(2).refreshBody();
    //platforms.create(1600, 1000, 'ground').setOrigin(0,0).setScale(2).refreshBody();
    //platforms.create(2400, 1000, 'ground').setOrigin(0,0).setScale(2).refreshBody();
    //platforms.create(3200, 1000, 'ground').setOrigin(0,0).setScale(2).refreshBody();
    

    //platforms.create(600, 400, 'ground');
    //platforms.create(50, 250, 'ground');
   // platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude').setScale(2.5);
   
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
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#b8b814' });

    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
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
    //взаємодія з грошима
}
function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
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

//tileSprite()
//setScale()
//setOrigin()
//Phaser.Math.Between()



//for(var n; n<10 ;n++)