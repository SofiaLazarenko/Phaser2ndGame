const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Phaser 3 game instance
const game = new Phaser.Game(config);

// Variables to hold player and enemy sprites
let player;
let enemy;

// Preload assets
function preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/enemy.png');
}

// Create the game world
function create() {
    // Add player and enemy sprites to the scene
    player = this.physics.add.sprite(100, 100, 'player');
    enemy = this.physics.add.sprite(700, 300, 'enemy');

    // Add collision detection between player and enemy
    this.physics.add.collider(player, enemy);
}

// Update function called every frame
function update() {
    // Calculate direction vector from enemy to player
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;

    // Normalize the direction vector
    const length = Math.sqrt(dx * dx + dy * dy);
    const directionX = dx / length;
    const directionY = dy / length;

    // Set enemy velocity to move towards the player
    const speed = 100;
    enemy.setVelocity(directionX * speed, directionY * speed);
}