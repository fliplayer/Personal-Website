Rabbit.sixthStage = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	this._carrot = null;
	VELOCITY = 300;
	this._spaceKey = null;
	this._velocity = 6000;
};
Rabbit.sixthStage.prototype = {
	create: function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		this._carrot = this.add.sprite(this.world.width/2 - 32, this.world.height/2 + 50, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;

		var carrotBob = this.add.tween(this._carrot).to({y: this.world.height/2 + 20}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height/2 + 50}, 1000, Phaser.Easing.Linear.None)
						.loop()
						.start();

		// set fontstyle
		this._fontStyle = { font: "40px Arial", fill: "#FFF", stroke: "#333", strokeThickness: 5, align: "center" };
		
		// display images
		this._player = this.add.sprite(0, 0, 'rocket2');
		this._player.scale.setTo(2,2);
		this.physics.arcade.enable(this._player);

		// set player attributes
		this._player.body.gravity.y = 0;
	    this._player.body.collideWorldBounds = true;

	    this._player.animations.add('fly', [0, 1, 2, 3, 4, 5], 12, true);
		this._player.animations.play('fly');
	
		this._spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},
	proceed: function() {
		this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		// start the Game state
		this.state.start('seventhStage');
	},
	eatCarrot: function(player, carrot) {
		carrot.kill();
	},
	resetGame: function() {
		this._player.kill();
		this._carrot.kill();

		this._carrot = this.add.sprite(this.world.width/2 - 32, this.world.height/2 + 50, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;

		var carrotBob = this.add.tween(this._carrot).to({y: this.world.height/2 + 20}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height/2 + 50}, 1000, Phaser.Easing.Linear.None)
						.loop()
						.start();

		this._player = this.add.sprite(0, 0, 'rocket2');
		this._player.scale.setTo(2,2);
		this.physics.arcade.enable(this._player);

		// set player attributes
		this._player.body.gravity.y = 0;
	    this._player.body.collideWorldBounds = true;

	    this._player.animations.add('fly', [0, 1, 2, 3, 4, 5], 12, true);
		this._player.animations.play('fly');
	},
	update: function() {
		this.physics.arcade.collide(this._player, this._platforms);
		this.physics.arcade.overlap(this._player, this._carrot, this.eatCarrot, null, this);

		this._player.body.velocity.x = 0;
		
		if (cursors.left.isDown)
	    {
	        //  Move to the left
	        this._player.body.velocity.x = -this._velocity;
	        this._player.animations.play('left');
	    }
	    else if (cursors.right.isDown)
	    {
	        //  Move to the right
	        this._player.body.velocity.x = this._velocity;
		    this._player.animations.play('right');
	    }
	    else
	    {
	        //  Stand still
	        this._player.animations.play('stand');
	    }

	    //  Allow the player to jump if they are touching the ground.
	    if (cursors.up.isDown && this._player.body.touching.down)
	    {
	        this._player.body.velocity.y = -600;
	    }

	    this._spaceKey.onDown.add(this.resetGame, this);

	    if(this._player.x >= this.world.width-80) {
	    	this.proceed();
	    }
	}
};