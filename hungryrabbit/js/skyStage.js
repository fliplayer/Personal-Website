Rabbit.sky = function(game){
	this._fontStyle = null;
	this._plane = null;
	VELOCITY = 300;
	this._spaceKey = null;
	this._text = null;
};
Rabbit.sky.prototype = {
	create: function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		// set fontstyle
		this._fontStyle = { font: "40px Arial", fill: "#FFF", stroke: "#333", strokeThickness: 5, align: "center" };
		
		// display images
		this._plane = this.add.sprite(this.world.width/2 - 50, this.world.height-100, 'transform1');
		this._plane.scale.setTo(2,2);
		this.physics.arcade.enable(this._plane);

		// set player attributes
		this._plane.body.moves = false;
	    this._plane.body.collideWorldBounds = true;

	    this._plane.animations.add('fly', [14,15,16,17,18], 12, true);
		this._plane.animations.play('fly');
	
		this._spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.add.tween(this._plane).to({y: this.world.width/2 - 300}, 3000, Phaser.Easing.Linear.None).start();
		this.time.events.add(Phaser.Timer.SECOND * 3, this.transform,this);
	},
	transform: function() {
		this._plane.kill();
		var cloud = this.add.sprite(this._plane.x, this._plane.y, 'transform2');
		cloud.scale.setTo(2,2);
		cloud.animations.add('transform', [0,1,2,3,4,5,6,7], 12, true);
		cloud.animations.play('transform', 12, false, false);
		this.time.events.add(Phaser.Timer.SECOND * 1, this.narration,this);
	},
	narration: function() {
		this.add.text(320, this.world.height/2, "Congratulations! \nYou made your own cloud!", instFont);
	},
	resetGame: function() {
		this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		Rabbit.LAUNCHSOUND.stop();
		Rabbit.BACKGROUNDMUSIC.play();
		this.state.start('launchStage');
	},
	update: function() {
		this._spaceKey.onDown.add(this.resetGame, this);
	}
};