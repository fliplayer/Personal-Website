Rabbit.Instruction = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	cursors = null;
	VELOCITY = 300;
	startingPosx = null;
	startingPosy = null;
};
Rabbit.Instruction.prototype = {
	create: function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		startingPosx = 0;
		startingPosy = this.world.height - 100;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		var platform = this._platforms.create(this.world.width-100, this.world.height-250, 'ground');
		platform.body.immovable = true;
		// set fontstyle
		this._fontStyle = { font: "40px Arial", fill: "#FFF", stroke: "#333", strokeThickness: 5, align: "center" };
		
		cursors = this.input.keyboard.createCursorKeys();
		// display images
		this._player = this.add.sprite(this.world.width/2 - 32, this.world.height-100, 'player');
		this._player.scale.setTo(2,2);
		this.physics.arcade.enable(this._player);

		// set player attributes
		this._player.body.gravity.y = 1000;
	    this._player.body.collideWorldBounds = true;

	    this._player.animations.add('stand', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
		this._player.animations.add('left', [19, 20, 21, 22], 10, true);
		this._player.animations.add('right', [15, 16, 17, 18], 10, true);
		this._player.animations.play('stand');

		var instructionText = this.add.text(this.world.width/2 - 350, 250, "Use left and right arrow keys to move and up key to jump.", instFont);
		var instructionText1 = this.add.text(this.world.width/2 - 80, 300, "Easy. Right?", instFont);
	},
	proceed: function() {
		// start the Game state
		this.state.start('Instruction2');
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
	    if (cursors.up.isDown && this._player.body.touching.down)
	    {
	        this._player.body.velocity.y = -600;
	        Rabbit.JUMPSOUND.play();
	    }

	    if(this._player.x >= this.world.width-40) {
	    	this.proceed();
	    }

	    // this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(null, this);
	}
};