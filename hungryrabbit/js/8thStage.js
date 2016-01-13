Rabbit.eighthStage = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	this._carrot = null;
	VELOCITY = 300;
	this._spaceKey = null;
	this._fly = false;
	this._velocity = 200;
	this._carrotMove = null;
};
Rabbit.eighthStage.prototype = {
	create: function(){
		Rabbit.HELICOPTERSOUND.play();
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		var platform1 = this._platforms.create(0, 0, 'ground');
		platform1.scale.setTo(0.9,12);
		platform1.body.immovable = true;

		var platform5 = this._platforms.create(this.world.width-430, 0, 'ground');
		platform5.scale.setTo(0.9,12);
		platform5.body.immovable = true;

		this._carrot = this.add.sprite(this.world.width/2, this.world.height/2 + 50, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;

		this._carrotMove = this.add.tween(this._carrot).to({y: this.world.height/2 + 20}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height/2 + 50}, 1000, Phaser.Easing.Linear.None)
						.loop()
						.start();

		// set fontstyle
		this._fontStyle = { font: "40px Arial", fill: "#FFF", stroke: "#333", strokeThickness: 5, align: "center" };
		
		// display images
		this._player = this.add.sprite(0, this.world.height-130, 'longears');
		this._player.scale.setTo(2,2);
		this.physics.arcade.enable(this._player);

		// set player attributes
		this._player.body.gravity.y = 0;
	    this._player.body.collideWorldBounds = true;

	    this._player.animations.add('hover', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
		this._player.animations.play('hover');

		var playerBob = this.add.tween(this._player).to({y: this.world.height-150}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height-130}, 1000, Phaser.Easing.Linear.None)
						.loop()
						.start();
	
		this._spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	proceed: function() {
		this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		// start the Game state
		this.state.start('ninthStage');
	},
	eatCarrot: function(player, carrot) {
		carrot.kill();
	},
	flyCarrot: function() {
		
		// this.remove.tween(this._carrotMove);
		this._carrotMove.stop();
		this._carrotMove = this.add.tween(this._carrot).to({y: -50}, 800, Phaser.Easing.Linear.None)
						.start();
	},
	resetGame: function() {
		this._player.kill();
		this._carrot.kill();
		this._fly = false;

		this._carrot = this.add.sprite(this.world.width/2, this.world.height/2 + 50, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;

		this._carrotMove = this.add.tween(this._carrot).to({y: this.world.height/2 + 20}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height/2 + 50}, 1000, Phaser.Easing.Linear.None)
						.loop()
						.start();

		this._player = this.add.sprite(0, this.world.height-130, 'longears');
		this._player.scale.setTo(2,2);
		this.physics.arcade.enable(this._player);

		// set player attributes
		this._player.body.gravity.y = 0;
	    this._player.body.collideWorldBounds = true;

	    this._player.animations.add('hover', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
		this._player.animations.play('hover');

		var playerBob = this.add.tween(this._player).to({y: this.world.height-150}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height-130}, 1000, Phaser.Easing.Linear.None)
						.loop()
						.start();
	},
	update: function() {
		this.physics.arcade.collide(this._player, this._platforms);

		this._player.body.velocity.x = 0;
		this._player.body.velocity.y = 0;
		
		if (cursors.left.isDown)
	    {
	        //  Move to the left
	        this._player.body.velocity.x = -this._velocity;
	    }
	    else if (cursors.right.isDown)
	    {
	        //  Move to the right
	        this._player.body.velocity.x = this._velocity;
	    }

	    this._spaceKey.onDown.add(this.resetGame, this);

	    if(this._player.x >= this.world.width-130) {
	    	this.proceed();
	    }
	    if(this._player.x >= 416 && this._player.x <= 445) {
	    	if(!this._fly) {
	    		this.flyCarrot();
	    		this._fly = true;
	    	}
	    	
	    }
	}
};