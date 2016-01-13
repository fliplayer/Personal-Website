Rabbit.Preloader = function(game){
	// define width and height of the game
	Rabbit.GAME_WIDTH = 1280;
	Rabbit.GAME_HEIGHT = 800;
	Rabbit.BACKGROUNDMUSIC = null;
	Rabbit.BEGINNINGMUSIC = null;
	Rabbit.JUMPSOUND = null;
	Rabbit.HITBOXSOUND = null;
	Rabbit.ROCKETSOUND = null;
	Rabbit.CAWSOUND = null;
	Rabbit.HELICOPTERSOUND = null;
	Rabbit.GUNSOUND = null;
	Rabbit.CRYINGSOUND = null;
	Rabbit.LAUNCHSOUND = null;
	Rabbit.ENDINGMUSIC = null;
	Rabbit.GROWSOUND = null;
	Rabbit.EATSOUND = null;
};
Rabbit.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#90ffff';
		this.preloadBar = this.add.sprite((Rabbit.GAME_WIDTH/2)-311, (Rabbit.GAME_HEIGHT/2)- 27, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// load images
    	this.load.image('ground', 'assets/platform.png');
    	this.load.image('playerdead', 'assets/playerdead.png');
    	this.load.image('invisibleBlock', 'assets/invisibleblock.png');
    	this.load.image('emptyBlock', 'assets/emptyblock.png');
    	this.load.image('carrotBlock', 'assets/carrotbox.png');
    	this.load.image('rottenCarrot', 'assets/rottencarrot.png');
    	this.load.image('house', 'assets/house.png');
    	this.load.image('strawberry', 'assets/strawberry.png');
    	this.load.image('happy', 'assets/happy.png');
    	
		// load spritesheets
		this.load.spritesheet('player', 'assets/player.png', 17, 32);
    	this.load.spritesheet('carrot', 'assets/carrot.png', 32, 32);
    	this.load.spritesheet('block', 'assets/block.png', 32, 64);
    	this.load.spritesheet('rocket1', 'assets/rocket1.png', 20, 40);
    	this.load.spritesheet('rocket2', 'assets/rocket2.png', 40, 20);
    	this.load.spritesheet('bird', 'assets/bird.png', 32, 20);
    	this.load.spritesheet('longears', 'assets/longears.png', 60, 32);
    	this.load.spritesheet('gun', 'assets/gun.png', 60, 32);
    	this.load.spritesheet('transform1', 'assets/transform1.png', 50, 32);
    	this.load.spritesheet('transform2', 'assets/transform2.png', 50, 32);
    	this.load.spritesheet('windows', 'assets/windows.png', 32, 32);
		
		// Load sounds
		this.load.audio('backgroundMusic', 'assets/backgroundmusic.mp3');
		this.load.audio('beginning', 'assets/beginning.mp3');
		this.load.audio('jump', 'assets/jump.mp3');
		this.load.audio('hitsound', 'assets/hitblock.ogg');
		this.load.audio('caw', 'assets/caw.mp3');
		this.load.audio('rocket', 'assets/rocket.mp3');
		this.load.audio('helicopter', 'assets/helicopter.mp3');
		this.load.audio('gun', 'assets/gun.mp3');
		this.load.audio('cry', 'assets/cry.mp3');
		this.load.audio('launch', 'assets/launch.mp3');
		this.load.audio('ending', 'assets/ending.mp3');
		this.load.audio('grow', 'assets/grow.mp3');
		this.load.audio('eat', 'assets/eat.mp3');

		Rabbit.BEGINNINGMUSIC = this.add.audio('beginning',1,true,true);
		Rabbit.BEGINNINGMUSIC.loop = true;
		Rabbit.BACKGROUNDMUSIC = this.add.audio('backgroundMusic',1,true,true);
		Rabbit.BACKGROUNDMUSIC.loop = true;
		Rabbit.JUMPSOUND = this.add.audio('jump');
		Rabbit.HITBOXSOUND = this.add.audio('hitsound');
		Rabbit.ROCKETSOUND = this.add.audio('rocket');
		Rabbit.ROCKETSOUND.loop = true;
		Rabbit.CAWSOUND = this.add.audio('caw');
		Rabbit.HELICOPTERSOUND = this.add.audio('helicopter');
		Rabbit.HELICOPTERSOUND.loop = true;
		Rabbit.GUNSOUND = this.add.audio('gun');
		Rabbit.CRYINGSOUND = this.add.audio('cry',4, false, true);
		Rabbit.LAUNCHSOUND = this.add.audio('launch');
		Rabbit.LAUNCHSOUND.loop = true;
		Rabbit.ENDINGMUSIC = this.add.audio('ending');
		Rabbit.ENDINGMUSIC.loop = true;
		Rabbit.GROWSOUND = this.add.audio('grow');
		Rabbit.EATSOUND = this.add.audio('eat',7, false, true);
		this.sound.setDecodedCallback([ Rabbit.BACKGROUNDMUSIC, Rabbit.BEGINNINGMUSIC, Rabbit.JUMPSOUND, Rabbit.HITBOXSOUND, Rabbit.ROCKETSOUND, Rabbit.CAWSOUND, Rabbit.HELICOPTERSOUND, Rabbit.GUNSOUND, Rabbit.CRYINGSOUND, Rabbit.LAUNCHSOUND, Rabbit.ENDINGMUSIC, Rabbit.GROWSOUND, Rabbit.EATSOUND ], this.startGame, this);
	},
	create: function(){
		// start the MainMenu state
		
	},
	startGame: function() {
		this.state.start('MainMenu');
	}
};