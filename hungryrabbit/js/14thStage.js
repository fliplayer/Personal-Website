Rabbit.fourteenthStage = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	this._carrot = null;
	this._deadPlayer = null;
	VELOCITY = 300;
	this._spaceKey = null;
	this._text = null;
};
Rabbit.fourteenthStage.prototype = {
	create: function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		var platform3 = this._platforms.create(0, this.world.height-350, 'ground');
		platform3.scale.setTo(0.2,5);
		platform3.body.immovable = true;

		var platform2 = this._platforms.create(this.world.width - 100, this.world.height- 200, 'ground');
		platform2.scale.setTo(0.2,5);
		platform2.body.immovable = true;

		this._carrot = this.add.sprite(this.world.width/2 - 32, this.world.height/2 + 50, 'rottenCarrot');
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

		this._deadPlayer = this.add.sprite(-50, -50, 'invisibleBlock');
		this._text = this.add.text(-50, -50, "I am Error", instFont);
	
		this._spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	proceed: function() {
		this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		// start the Game state
		this.state.start('fifteenthStage');
	},
	eatCarrot: function(player, carrot) {
		Rabbit.EATSOUND.play();
		carrot.kill();
		player.kill();
		var xpos = player.x;
		this._deadPlayer = this.add.sprite(player.x, player.y, 'playerdead');
		this._deadPlayer.scale.setTo(2,2);
		this._deadPlayer.anchor.setTo(0.5,0.5);
		this.add.tween(this._deadPlayer).to( { angle: -90, x: xpos - 30, y: this.world.height-50}, 1000, Phaser.Easing.Linear.None)
										.to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None)
										.start();
		this.time.events.add(Phaser.Timer.SECOND * 0.7, this.narration,this);
		
	},
	narration: function() {
		this._text = this.add.text(this.world.width/2, 250, "That carrot was rotten! T_T", instFont);
	},
	resetGame: function() {
		this.time.events.removeAll();
		this._player.kill();
		this._carrot.kill();
		this._deadPlayer.kill();
		this._text.destroy();

		this._carrot = this.add.sprite(this.world.width/2 - 32, this.world.height/2 + 50, 'rottenCarrot');
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
	}
};