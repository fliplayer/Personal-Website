Rabbit.fifteenthStage = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	this._carrot = null;
	this._oldCarrot = null;
	VELOCITY = 300;
	this._spaceKey = null;
	this._angry = false;
	this._text = null;
	this._pause = false;
};
Rabbit.fifteenthStage.prototype = {
	create: function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		var platform1 = this._platforms.create(200, this.world.height-100, 'ground');
		platform1.scale.setTo(0.2,4);
		platform1.body.immovable = true;

		var platform2 = this._platforms.create(100, this.world.height-150, 'ground');
		platform2.scale.setTo(0.2,4);
		platform2.body.immovable = true;

		var platform3 = this._platforms.create(0, this.world.height-200, 'ground');
		platform3.scale.setTo(0.2,5);
		platform3.body.immovable = true;

		this._carrot = this.add.sprite(230, this.world.height - 170, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;
		this._carrot.scale.setTo(1.5,1.5);

		var carrotBob = this.add.tween(this._carrot).to({y: this.world.height - 190}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height - 170}, 1000, Phaser.Easing.Linear.None)
						.loop()
						.start();

		// set fontstyle
		this._fontStyle = { font: "40px Arial", fill: "#FFF", stroke: "#333", strokeThickness: 5, align: "center" };
		
		// display images
		this._player = this.add.sprite(0, 376, 'player');
		this._player.scale.setTo(2,2);
		this.physics.arcade.enable(this._player);

		// set player attributes
		this._player.body.gravity.y = 1000;
	    this._player.body.collideWorldBounds = true;

	    this._player.animations.add('stand', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
		this._player.animations.add('left', [19, 20, 21, 22], 10, true);
		this._player.animations.add('right', [15, 16, 17, 18], 10, true);
		this._player.animations.add('angrystand', [23], 1, true);
		this._player.animations.add('angryleft', [28, 29, 30, 31], 10, true);
		this._player.animations.add('angryright', [24, 25, 26, 27], 10, true);
		this._player.animations.play('stand');
	},
	proceed: function() {
		this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		// start the Game state
		this.state.start('launchStage');
	},
	eatCarrot: function(player, carrot) {
		Rabbit.EATSOUND.play();
		carrot.kill();
		this._pause = true;
		this._angry = true;
		this._player.animations.play('angrystand');
		this.time.events.add(Phaser.Timer.SECOND * 2, this.spitCarrot,this);
	},
	spitCarrot: function() {
		this._oldCarrot = this.add.sprite(this._player.x, this._player.y, 'carrot');
		this.physics.arcade.enable(this._oldCarrot);
		this._oldCarrot.body.moves = false;
		this._oldCarrot.scale.setTo(1.5,1.5);
		Rabbit.CRYINGSOUND.play();
		var carrotThrow = this.add.tween(this._oldCarrot).to({x: this.world.width/2, y: this.world.height - 190}, 500, Phaser.Easing.Linear.None)
						.to({x: this.world.width/2 + 200, y: this.world.height - 100}, 500, Phaser.Easing.Linear.None)
						.start();
		this.time.events.add(Phaser.Timer.SECOND * 1, this.narration,this);
		this.time.events.add(Phaser.Timer.SECOND * 1, this.unpause,this);
	},
	narration: function() {
		this._text = this.add.text(0, 250, "The rabbit does not seem to trust carrots anymore \nafter the rotten one...", instFont);
	},
	unpause: function() {
		this._pause = false;
	},
	update: function() {
		this.physics.arcade.collide(this._player, this._platforms);
		this.physics.arcade.overlap(this._player, this._carrot, this.eatCarrot, null, this);

		this._player.body.velocity.x = 0;
		
		if (cursors.left.isDown && !this._pause)
	    {
	        //  Move to the left
	        this._player.body.velocity.x = -VELOCITY;
	        
	        if(this._angry) {
	        	this._player.animations.play('angryleft');
	        }
	        else {
	        	this._player.animations.play('left');
	        }
	    }
	    else if (cursors.right.isDown && !this._pause)
	    {
	        //  Move to the right
	        this._player.body.velocity.x = VELOCITY;
		    

		    if(this._angry) {
	        	this._player.animations.play('angryright');
	        }
	        else {
	        	this._player.animations.play('right');
	        }
	    }
	    else
	    {
	        //  Stand still
	        if(this._angry) {
	        	this._player.animations.play('angrystand');
	        }
	        else {
	        	this._player.animations.play('stand');
	        }
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
	}
};