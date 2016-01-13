Rabbit.seventhStage = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	this._carrot = null;
	this._bird = null;
	VELOCITY = 300;
	this._spaceKey = null;
	this._drop = false;
};
Rabbit.seventhStage.prototype = {
	create: function(){
		Rabbit.ROCKETSOUND.stop();
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		var platform5 = this._platforms.create(this.world.width-100, 50, 'ground');
		platform5.scale.setTo(0.4,10);
		platform5.body.immovable = true;

		this._carrot = this.add.sprite(this.world.width/2 - 32, this.world.height/2 + 50, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;

		var carrotBob = this.add.tween(this._carrot).to({y: this.world.height/2 + 20}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height/2 + 50}, 1000, Phaser.Easing.Linear.None)
						.loop()
						.start();

		this._bird = this.add.sprite(this.world.width-80, 20, 'bird');
		this._bird.scale.setTo(1.5,1.5);
		this.physics.arcade.enable(this._bird);
		this._bird.animations.add('fly', [0,1,2], 12, true);

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
		this.state.start('eighthStage');
	},
	eatCarrot: function(player, carrot) {
		carrot.kill();
	},
	birdDrop: function() {
		this._bird.body.moves = false;
		this._bird.animations.play('fly');
		Rabbit.CAWSOUND.play();
		var drop = this.add.tween(this._bird).to({x: this.world.width/2 - 32 ,y: this.world.height/2 +50}, 100, Phaser.Easing.Linear.None)
					.to({x: -32 ,y: -50}, 1000, Phaser.Easing.Linear.None)
					.start();
		// this._carrot.kill();
	},
	resetGame: function() {
		this._player.kill();
		this._carrot.kill();
		this._bird.kill();
		this._drop = false;

		this._bird = this.add.sprite(this.world.width-80, 20, 'bird');
		this._bird.scale.setTo(1.5,1.5);
		this.physics.arcade.enable(this._bird);
		this._bird.animations.add('fly', [0,1,2], 12, true);

		this._carrot = this.add.sprite(this.world.width/2 - 32, this.world.height/2 + 50, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;

		var carrotBob = this.add.tween(this._carrot).to({y: this.world.height/2 + 20}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height/2 + 50}, 1000, Phaser.Easing.Linear.None)
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
		this.physics.arcade.collide(this._bird, this._platforms);
		this.physics.arcade.overlap(this._bird, this._carrot, this.eatCarrot, null, this);

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
	    if(this._player.x >= this.world.width/2 - 150 && this._player.x <= this.world.width/2 + 150) {
	    	if(this._player.y < 536) {
	    		if(!this._drop) {
	    			this.birdDrop();
	    			this._drop = true;
	    		}
	    		
	    	}
	    }
	}
};