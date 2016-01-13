Rabbit.home = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	VELOCITY = 300;
	this._spaceKey = null;
};
Rabbit.home.prototype = {
	create: function(){
		Rabbit.BACKGROUNDMUSIC.stop();
		Rabbit.ENDINGMUSIC.play();
		this.stage.backgroundColor = '#945d03';
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		var window1 = this.add.sprite(100, this.world.height/2, 'windows');
		window1.scale.setTo(2,2);
		window1.animations.add('shine', [0,1,2,3,4,5,6,7], 12, true);
		window1.animations.play('shine');

		var window2 = this.add.sprite(this.world.width/2 + 100, this.world.height/2, 'windows');
		window2.scale.setTo(2,2);
		window2.animations.add('shine', [0,1,2,3,4,5,6,7], 12, true);
		window2.animations.play('shine');

		var strawberry = this.add.sprite(this.world.width/2, this.world.height- 130, 'strawberry');
		strawberry.scale.setTo(2,2);

		var strawberryBob = this.add.tween(strawberry).to({y: this.world.height - 140}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height- 130}, 1000, Phaser.Easing.Linear.None)
						.loop()
						.start();

		this.add.text(150, 100, "The rabbit safely arrived home \nand happily ate a fresh strawberry. \nPress space to restart the game.", instFont);

		// set fontstyle
		this._fontStyle = { font: "50px Arial", fill: "#FFF", stroke: "#333", strokeThickness: 5, align: "center" };
		this.add.text(270, 300, "The End.", this._fontStyle);
		// display images
		this._player = this.add.sprite(this.world.width/2 - 17, this.world.height-100, 'happy');
		this._player.scale.setTo(2,2);
		this.physics.arcade.enable(this._player);

		// set player attributes
		this._player.body.gravity.y = 1000;
	    this._player.body.collideWorldBounds = true;
	
		this._spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	resetGame: function() {
		this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		Rabbit.ENDINGMUSIC.stop();
		Rabbit.BEGINNINGMUSIC.play();
		// start the Game state
		this.state.start('MainMenu');
	},
	update: function() {
		this.physics.arcade.collide(this._player, this._platforms);

		this._player.body.velocity.x = 0;

	    this._spaceKey.onDown.add(this.resetGame, this);
	}
};