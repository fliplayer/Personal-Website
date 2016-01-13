Rabbit.fourthStage = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	this._carrot = null;
	VELOCITY = 300;
	this._spaceKey = null;
	this._movingPlatform = null;
};
Rabbit.fourthStage.prototype = {
	create: function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		this._movingPlatform = this._platforms.create(this.world.width-100, this.world.height-200, 'ground');
		this._movingPlatform.scale.setTo(0.4,2);
		this._movingPlatform.body.immovable = true;
		this._movingPlatform.body.moves = false;

		var platform2 = this._platforms.create(this.world.width/2, this.world.height/2 -100, 'ground');
		platform2.scale.setTo(0.1,10);
		platform2.body.immovable = true;

		var platform3 = this._platforms.create(this.world.width/2 - 300, 0, 'ground');
		platform3.scale.setTo(0.1,13);
		platform3.body.immovable = true;

		var platform4 = this._platforms.create(this.world.width/2 - 300, this.world.height-150, 'ground');
		platform4.scale.setTo(0.3,1);
		platform4.body.immovable = true;

		var platform5 = this._platforms.create(this.world.width-100, 0, 'ground');
		platform5.scale.setTo(0.4,10);
		platform5.body.immovable = true;

		var platform6 = this._platforms.create(this.world.width/2 -100, this.world.height-300, 'ground');
		platform6.scale.setTo(0.3,1);
		platform6.body.immovable = true;

		this._carrot = this.add.sprite(this.world.width - 70, this.world.height - 90, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;

		var carrotBob = this.add.tween(this._carrot).to({y: this.world.height - 110}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height - 90}, 1000, Phaser.Easing.Linear.None)
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
	
		this._spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	proceed: function() {
		this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		// start the Game state
		this.state.start('fifthStage');
	},
	eatCarrot: function(player, carrot) {
		carrot.kill();
	},
	dropBlock: function() {
		var drop = this.add.tween(this._movingPlatform).to({y: this.world.height - 110}, 50, Phaser.Easing.Linear.None)
					.start();
		this._carrot.kill();
	},
	resetGame: function() {
		this._player.kill();
		this._carrot.kill();
		this._movingPlatform.kill();

		this._movingPlatform = this._platforms.create(this.world.width-100, this.world.height-200, 'ground');
		this._movingPlatform.scale.setTo(0.4,2);
		this._movingPlatform.body.immovable = true;
		this._movingPlatform.body.moves = false;

		this._carrot = this.add.sprite(this.world.width - 70, this.world.height - 90, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;

		var carrotBob = this.add.tween(this._carrot).to({y: this.world.height - 110}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height - 90}, 1000, Phaser.Easing.Linear.None)
						.loop()
						.start();

		this._player = this.add.sprite(0, this.world.height-100, 'player');
		this._player.scale.setTo(2,2);
		this.physics.arcade.enable(this._player);
		this._player.body.gravity.y = 1000;
	    this._player.body.collideWorldBounds = true;

	    this._player.animations.add('stand', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
		this._player.animations.add('left', [19, 20, 21, 22], 10, true);
		this._player.animations.add('right', [15, 16, 17, 18], 10, true);
		this._player.animations.play('stand');
	},
	update: function() {
		this.physics.arcade.collide(this._player, this._platforms);
		this.physics.arcade.overlap(this._player, this._carrot, this.eatCarrot, null, this);

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
	    if (cursors.up.isDown && this._player.body.touching.down)
	    {
	        this._player.body.velocity.y = -600;
	        Rabbit.JUMPSOUND.play();
	    }

	    this._spaceKey.onDown.add(this.resetGame, this);

	    if(this._player.x >= this.world.width-40) {
	    	this.proceed();
	    }
	    if(this._player.x >= 760 && this._player.x <= 825) {
	    	this.dropBlock();
	    }
	}
};