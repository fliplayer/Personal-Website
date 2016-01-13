Rabbit.MainMenu = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	instFont = { font: "30px Arial", fill: "#000", align: "center" };
	this._enterKey = null;
};
Rabbit.MainMenu.prototype = {
	create: function(){
		Rabbit.BEGINNINGMUSIC.play();
		this.stage.backgroundColor = '#90ffff';
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		var platform = this._platforms.create(this.world.width-100, this.world.height-250, 'ground');
		platform.body.immovable = true;
		// set fontstyle
		this._fontStyle = { font: "40px Arial", fill: "#FFF", stroke: "#333", strokeThickness: 5, align: "center" };
		
		// display images
		this._player = this.add.sprite(this.world.width/2 - 32, this.world.height-200, 'player');
		this._player.scale.setTo(2,2);
		this.physics.arcade.enable(this._player);

		// set player attributes
		this._player.body.gravity.y = 1000;
	    this._player.body.collideWorldBounds = true;

	    this._player.animations.add('stand', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
		this._player.animations.play('stand');

		this._enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this._enterKey.onDown.add(this.startInstruction, this);

		var titleText = this.add.text(this.world.width/2 - 170, 250, "The Hungry Rabbit", this._fontStyle);
		var instructionText = this.add.text(this.world.width/2 - 200, 350, "Press Enter to start your quest!", instFont);
	},
	startInstruction: function() {
		this.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
		// start the Game state
		this.state.start('Instruction');
	},
	update: function() {
		this.physics.arcade.collide(this._player, this._platforms);
 
   		
	}
};