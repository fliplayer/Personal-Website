Rabbit.launchStage = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	this._carrot = null;
	VELOCITY = 300;
	this._spaceKey = null;
	this._text = null;
	this._launch = false;
	this._plane = null;
};
Rabbit.launchStage.prototype = {
	create: function(){
		this._launch = false;
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		this._carrot = this.add.sprite(this.world.width/2 - 32, this.world.height/2 + 50, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;
		this._carrot.scale.setTo(1.5,1.5);

		var carrotBob = this.add.tween(this._carrot).to({y: this.world.height/2 + 20}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height/2 + 50}, 1000, Phaser.Easing.Linear.None)
						.loop()
						.start();

		// set fontstyle
		this._fontStyle = { font: "40px Arial", fill: "#FFF", stroke: "#333", strokeThickness: 5, align: "center" };
		
		// display images
		this._player = this.add.sprite(0, this.world.height-100, 'player');
		this._player.scale.setTo(2,2);
		this.physics.arcade.enable(this._player);

		// set player attributes
		this._player.body.gravity.y = 1000;
	    this._player.body.collideWorldBounds = true;

	    this._player.animations.add('stand', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
		this._player.animations.add('left', [19, 20, 21, 22], 10, true);
		this._player.animations.add('right', [15, 16, 17, 18], 10, true);
		this._player.animations.play('stand');

		this._plane = this.add.sprite(-50, -50, 'invisibleBlock');
	
		this._spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	proceed: function() {
		this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		// start the Game state
		this.state.start('outside');
	},
	launch: function() {
		Rabbit.BACKGROUNDMUSIC.stop();
		Rabbit.LAUNCHSOUND.play();
		this._player.kill();
		this._plane = this.add.sprite(this._player.x - 33, this._player.y, 'transform1');
		this._plane.scale.setTo(2,2);
		this._plane.animations.add('transform', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 12, true);
		this._plane.animations.add('fly', [14,15,16,17,18], 12, true);
		this._plane.animations.play('transform', 12, false, false);
		this.time.events.add(Phaser.Timer.SECOND * 3, this.fly,this);
	},
	fly: function() {
		this._plane.animations.play('fly');
		this.add.tween(this._plane).to({y: -100}, 2000, Phaser.Easing.Linear.None).start();
		this.time.events.add(Phaser.Timer.SECOND * 2, this.proceedLaunch,this);
	},
	proceedLaunch: function() {
		this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		// start the Game state
		this.state.start('sky');
	},
	resetGame: function() {
		Rabbit.BACKGROUNDMUSIC.play();
		Rabbit.LAUNCHSOUND.stop();
		this.time.events.removeAll();
		this._player.kill();
		this._carrot.kill();
		this._plane.kill();
		this._launch = false;

		this._carrot = this.add.sprite(this.world.width/2 - 32, this.world.height/2 + 50, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;
		this._carrot.scale.setTo(1.5,1.5);

		var carrotBob = this.add.tween(this._carrot).to({y: this.world.height/2 + 20}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height/2 + 50}, 1000, Phaser.Easing.Linear.None)
						.loop()
						.start();

		this._player = this.add.sprite(0, this.world.height-100, 'player');
		this._player.scale.setTo(2,2);
		this.physics.arcade.enable(this._player);

		// set player attributes
		this._player.body.gravity.y = 1000;
	    this._player.body.collideWorldBounds = true;

	    this._player.animations.add('stand', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
		this._player.animations.add('left', [19, 20, 21, 22], 10, true);
		this._player.animations.add('right', [15, 16, 17, 18], 10, true);
		this._player.animations.play('stand');
	},
	update: function() {
		this.physics.arcade.collide(this._player, this._platforms);

		this._player.body.velocity.x = 0;
		
		if (cursors.left.isDown)
	    {
	        //  Move to the left
	        this._player.body.velocity.x = -VELOCITY;
	        this._player.animations.play('left');
	    }
	    else if (cursors.right.isDown)
	    {
	        //  Move to the right
	        this._player.body.velocity.x = VELOCITY;
		    this._player.animations.play('right');
	    }
	    else
	    {
	        //  Stand still
	        this._player.animations.play('stand');
	    }

	    //  Allow the player to jump if they are touching the ground.
	    if (cursors.up.isDown && !this._launch)
	    {
	        this.launch();
	        this._launch = true;
	    }
	    this._spaceKey.onDown.add(this.resetGame, this);
	    if(this._player.x >= this.world.width-40) {
	    	this.proceed();
	    }
	}
};