var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var score = 0;
var scoreText;
if(gameOver = true)
{
    var gameText;
}

function preload ()
{
    this.load.image('sky', 'assets/sky.jpg');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('flower', 'assets/flower.png');
    this.load.image('flower2', 'assets/flower2.png');
    this.load.spritesheet('mavka', 
        'assets/mavka.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

var ground;

function create ()
{
    this.add.image(400, 300, 'sky');
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    this.add.image(400, 300, 'flower');

    player = this.physics.add.sprite(100, 450, 'mavka');

player.setBounce(0.2);
player.setCollideWorldBounds(true);

this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('mavka', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'mavka', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('mavka', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
    
    
  

});

stars = this.physics.add.group({
    key: 'flower',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
});

stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});

this.physics.add.collider(player, platforms);
this.physics.add.collider(flowers, platforms);
this.physics.add.overlap(player, flowers, collectStar, null, this);
scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
flower2s = this.physics.add.group();

this.physics.add.collider(flower2s, platforms);

this.physics.add.collider(player, flower2s, hitBomb, null, this);
}

function update ()
{
    cursors = this.input.keyboard.createCursorKeys();
    
    if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
}
function collectStar (player, flower)
{
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}
function hitBomb (player, flower2)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');
   
    gameOver = true;
    
    
    

    
}
function collectStar (player, flower)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (flower.countActive(true) === 0)
    {
        flower.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var flower2 = flower2.create(x, 16, 'flower2');
        flower2.setBounce(1);
        flower2.setCollideWorldBounds(true);
        flower2.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}
