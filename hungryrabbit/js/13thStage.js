Rabbit.thirteenthStage = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	this._carrot = null;
	this._gun = null;
	this._deadPlayer = null;
	VELOCITY = 300;
	this._spaceKey = null;
	this._gunMove = null;
	this._jump = false;
	this._dead = false;
	this._disarm = false;
};
Rabbit.thirteenthStage.prototype = {
	create: function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		var platform3 = this._platforms.create(this.world.width -100, this.world.height-350, 'ground');
		platform3.scale.setTo(0.2,5);
		platform3.body.immovable = true;

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

		this._gun = this.add.sprite(this.world.width - 140, 250, 'gun');
		this._gun.scale.setTo(2,2);
		this.physics.arcade.enable(this._gun);
		this._gun.body.moves = false;
		this._gun.anchor.setTo(0.5,0.5);
		this._gun.angle = -30;
		this._gun.animations.add('shoot', [0,1,2,3,4], 15, true);
	
		this._spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.time.events.add(Phaser.Timer.SECOND * 6, this.disarm,this);
	},
	proceed: function() {
		this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		// start the Game state
		this.state.start('fourteenthStage');
	},
	eatCarrot: function(player, carrot) {
		Rabbit.EATSOUND.play();
		carrot.kill();
		player.kill();
		Rabbit.GUNSOUND.play();
		this.add.tween(this._gun).to({angle: -30, x: this.world.width - 140, y: 250}, 10, Phaser.Easing.Linear.None).start();
		this._gun.animations.play('shoot', 15, false, false);
		this._deadPlayer = this.add.sprite(player.x, player.y, 'playerdead');
		this._deadPlayer.scale.setTo(2,2);
		this.add.tween(this._deadPlayer).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
	},
	disarm: function() {
		this._disarm = true;
		if(!this._dead) {
			this.add.tween(this._gun).to({angle: 90, x: this.world.width - 50, y: 230}, 1000, Phaser.Easing.Linear.None).start();
		}
	},
	shoot: function() {
		Rabbit.GUNSOUND.play();
		this._gun.animations.play('shoot', 15, false, false);
		if(this._jump) {
			this._gunMove.stop();
		}
		this._player.kill();
		this._deadPlayer = this.add.sprite(this._player.x, this._player.y, 'playerdead');
		this._deadPlayer.scale.setTo(2,2);
		this.add.tween(this._deadPlayer).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None).start();
	},
	resetGame: function() {
		this.time.events.removeAll();
		this._jump = false;
		this._dead = false;
		this._disarm = false;
		this._player.kill();
		this._carrot.kill();
		this._deadPlayer.kill();
		this._gun.kill();

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

		// set player attributes
		this._player.body.gravity.y = 1000;
	    this._player.body.collideWorldBounds = true;

	    this._player.animations.add('stand', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
		this._player.animations.add('left', [19, 20, 21, 22], 10, true);
		this._player.animations.add('right', [15, 16, 17, 18], 10, true);
		this._player.animations.play('stand');

		this._gun = this.add.sprite(this.world.width - 140, 250, 'gun');
		this._gun.scale.setTo(2,2);
		this.physics.arcade.enable(this._gun);
		this._gun.body.moves = false;
		this._gun.anchor.setTo(0.5,0.5);
		this._gun.angle = -30;
		this._gun.animations.add('shoot', [0,1,2,3,4], 15, true);

		this.time.events.add(Phaser.Timer.SECOND * 6, this.disarm,this);
	},
	update: function() {
		this.physics.arcade.collide(this._player, this._platforms);
		this.physics.arcade.collide(this._platforms, this._gun);
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
	        this._jump = true;
	        if(!this._disarm) {
	        	this._gunMove = this.add.tween(this._gun).to( { angle: -13 }, 700, Phaser.Easing.Linear.None)
		        .to( { angle: -30 }, 700, Phaser.Easing.Linear.None)
		        .start();
	        }
	    }
	    if(this._player.body.touching.down) {
	    	this._jump = false;
	    }
	    if (this._player.x > 40 && !this._dead) {
	    	if(!this._disarm) {
	    		this.shoot();
	    		this._dead = true;
	    	}
	    }
	    if(this._player.y < 536) {
	    	this._jump = true;
	    }
	    this._spaceKey.onDown.add(this.resetGame, this);
	    if(this._player.x >= this.world.width-40) {
	    	this.proceed();
	    }
	}
};