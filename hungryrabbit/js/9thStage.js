Rabbit.ninthStage = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	this._carrot = null;
	VELOCITY = 300;
	this._spaceKey = null;
	this._blocks = null;
	this._emptyBlocks = null;
	this._invisibleBlock = null;
};
Rabbit.ninthStage.prototype = {
	create: function(){
		Rabbit.HELICOPTERSOUND.stop();
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		var platform1 = this._platforms.create(0, this.world.height/2 + 30, 'ground');
		platform1.scale.setTo(0.895,1.6);
		platform1.body.immovable = true;

		var platform2 = this._platforms.create(this.world.width/2 + 32, this.world.height/2 + 30, 'ground');
		platform2.scale.setTo(0.337,1.6);
		platform2.body.immovable = true;

		var platform3 = this._platforms.create(this.world.width - 215, this.world.height/2 + 30, 'ground');
		platform3.scale.setTo(0.5,1.6);
		platform3.body.immovable = true;

		this._blocks = this.add.group();
		this._blocks.enableBody = true;

		this._emptyBlocks = this.add.group();
		this._emptyBlocks.enableBody = true;

		var block = this._blocks.create(7 * 64 , (this.world.height/2 + 30), 'carrotBlock');
		block.scale.setTo(2,2);
		block.body.moves = false;

		this._invisibleBlock = this.add.sprite(this.world.width/2 + 200, (this.world.height/2 +30), 'invisibleBlock');
		this._invisibleBlock.scale.setTo(2,2);
		this.physics.arcade.enable(this._invisibleBlock);
		this._invisibleBlock.body.moves = false;

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
		this.state.start('tenthStage');
	},
	eatCarrot: function(player, carrot) {
		carrot.kill();
	},
	hitBox: function(player, block) {
		block.kill();
		Rabbit.HITBOXSOUND.play();
		var emptyblock = this._emptyBlocks.create(block.x, (this.world.height/2 -35), 'emptyBlock');
		emptyblock.scale.setTo(2,2);
		emptyblock.body.moves = false;

		this._carrot = this.add.sprite(block.x + 5, this.world.height/2 +25, 'carrot');
		this._carrot.scale.setTo(2,2);
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;

		var carrotMove = this.add.tween(this._carrot).to({y: this.world.height/2 -44}, 1000, Phaser.Easing.Linear.None)
						.start();
	},
	fakeBox: function(player, block) {
		block.kill();
		var emptyblock = this._emptyBlocks.create(block.x, (this.world.height/2 -35), 'emptyBlock');
		emptyblock.scale.setTo(2,2);
		emptyblock.body.moves = false;
	},
	resetGame: function() {
		this._player.kill();
		this._carrot.kill();
		this._blocks.forEach(function(item) {
	    		item.kill();
	    	}, this);
		this._emptyBlocks.forEach(function(item) {
	    		item.kill();
	    	}, this);
		this._invisibleBlock.kill();

		var block = this._blocks.create(7 * 64 , (this.world.height/2 + 30), 'carrotBlock');
		block.scale.setTo(2,2);
		block.body.moves = false;

		this._invisibleBlock = this.add.sprite(this.world.width/2 + 200, (this.world.height/2 +30), 'invisibleBlock');
		this._invisibleBlock.scale.setTo(2,2);
		this.physics.arcade.enable(this._invisibleBlock);
		this._invisibleBlock.body.moves = false;

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
		this.physics.arcade.collide(this._player, this._emptyBlocks);
		this.physics.arcade.collide(this._player, this._invisibleBlock, this.fakeBox, null, this);
		this.physics.arcade.collide(this._player, this._blocks, this.hitBox, null, this);

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