Rabbit.twelfthStage = function(game){
	this._fontStyle = null;
	this._player = null;
	this._platforms = null;
	this._carrot = null;
	this._guns = null;
	this._deadPlayer = null;
	VELOCITY = 300;
	this._spaceKey = null;
	var gun1;
	var gun2;
	var gun3;
	var gun4;
	var gun5;
	var gun6;
	var gun7;
	var gun8;
	var gun9;
	var gun10;
};
Rabbit.twelfthStage.prototype = {
	create: function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this._platforms = this.add.group();
		this._platforms.enableBody = true;

		var ground = this._platforms.create(0, this.world.height-40, 'ground');
		ground.scale.setTo(2,1);
		ground.body.immovable = true;

		var platform1 = this._platforms.create(this.world.width/2-150, this.world.height-350, 'ground');
		platform1.scale.setTo(0.6,4);
		platform1.body.immovable = true;

		var platform2 = this._platforms.create(this.world.width/2 -200, this.world.height-200, 'ground');
		platform2.scale.setTo(0.8,4);
		platform2.body.immovable = true;

		this._carrot = this.add.sprite(this.world.width/2 - 30, this.world.height - 390, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;

		var carrotBob = this.add.tween(this._carrot).to({y: this.world.height - 400}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height - 390}, 1000, Phaser.Easing.Linear.None)
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

		this._guns = this.add.group();
		this._guns.enableBody = false;

		gun1 = this._guns.create(this.world.width + 160, 170, 'gun');
		gun1.scale.setTo(2,2);
		gun1.animations.add('shoot', [0,1,2,3,4], 15, true);

		gun2 = this._guns.create(this.world.width - 170, -130, 'gun');
		gun2.scale.setTo(2,2);
		gun2.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun2.anchor.setTo(0.5,0.5);
		gun2.angle = -32;

		gun3 = this._guns.create(this.world.width - 250, -100, 'gun');
		gun3.scale.setTo(2,2);
		gun3.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun3.anchor.setTo(0.5,0.5);
		gun3.angle = -52;

		gun4 = this._guns.create(this.world.width - 350, -100, 'gun');
		gun4.scale.setTo(2,2);
		gun4.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun4.anchor.setTo(0.5,0.5);
		gun4.angle = -72;

		gun5 = this._guns.create(this.world.width - 450, -100, 'gun');
		gun5.scale.setTo(2,2);
		gun5.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun5.anchor.setTo(0.5,0.5);
		gun5.angle = -85;

		gun6 = this._guns.create(this.world.width - 550, -100, 'gun');
		gun6.scale.setTo(2,2);
		gun6.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun6.anchor.setTo(0.5,0.5);
		gun6.angle = -85;

		gun7 = this._guns.create(this.world.width - 650, -100, 'gun');
		gun7.scale.setTo(2,2);
		gun7.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun7.anchor.setTo(0.5,0.5);
		gun7.angle = -105;

		gun8 = this._guns.create(-100, 120, 'gun');
		gun8.scale.setTo(2,2);
		gun8.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun8.anchor.setTo(0.5,0.5);
		gun8.angle = -125;

		gun9 = this._guns.create( -100, 150, 'gun');
		gun9.scale.setTo(2,2);
		gun9.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun9.anchor.setTo(0.5,0.5);
		gun9.angle = -145;

		gun10 = this._guns.create( -100, 200, 'gun');
		gun10.scale.setTo(2,2);
		gun10.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun10.anchor.setTo(0.5,0.5);
		gun10.angle = -165;
	
		this._spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	proceed: function() {
		this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		// start the Game state
		this.state.start('thirteenthStage');
	},
	eatCarrot: function(player, carrot) {
		Rabbit.EATSOUND.play();
		carrot.kill();
		player.body.moves = false;
		this.add.tween(gun1).to( { x: this.world.width - 160 }, 2000, Phaser.Easing.Linear.None).start();
		this.add.tween(gun2).to( { x: this.world.width - 170, y: 130 }, 2000, Phaser.Easing.Linear.None).start();
		this.add.tween(gun3).to( { x: this.world.width - 250, y: 100 }, 2000, Phaser.Easing.Linear.None).start();
		this.add.tween(gun4).to( { y: 100 }, 2000, Phaser.Easing.Linear.None).start();
		this.add.tween(gun5).to( { y: 100 }, 2000, Phaser.Easing.Linear.None).start();
		this.add.tween(gun6).to( { y: 100 }, 2000, Phaser.Easing.Linear.None).start();
		this.add.tween(gun7).to( { y: 100 }, 2000, Phaser.Easing.Linear.None).start();
		this.add.tween(gun8).to( { x: this.world.width - 750, y: 120 }, 2000, Phaser.Easing.Linear.None).start();
		this.add.tween(gun9).to( { x: this.world.width - 820, y: 150 }, 2000, Phaser.Easing.Linear.None).start();
		this.add.tween(gun10).to( { x: this.world.width - 880 }, 2000, Phaser.Easing.Linear.None).start();
		this.time.events.add(Phaser.Timer.SECOND * 2.2, this.fire,this);
	},
	fire: function() {
		this._guns.forEach(function(item) {
	    	item.animations.play('shoot', 12, false, false);
	    	Rabbit.GUNSOUND.play();
	    }, this);
	    this._player.kill();
	    this._deadPlayer = this.add.sprite(this._player.x, this._player.y, 'playerdead');
		this._deadPlayer.scale.setTo(2,2);
		this.add.tween(this._deadPlayer).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None).start();
	},
	resetGame: function() {
		this._player.kill();
		this._carrot.kill();
		this._deadPlayer.kill();
		this._guns.forEach(function(item) {
	    	item.kill();
	    }, this);

		this._carrot = this.add.sprite(this.world.width/2 - 30, this.world.height - 390, 'carrot');
		this.physics.arcade.enable(this._carrot);
		this._carrot.body.moves = false;

		var carrotBob = this.add.tween(this._carrot).to({y: this.world.height - 400}, 1000, Phaser.Easing.Linear.None)
						.to({y: this.world.height - 390}, 1000, Phaser.Easing.Linear.None)
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

		gun1 = this._guns.create(this.world.width + 160, 170, 'gun');
		gun1.scale.setTo(2,2);
		gun1.animations.add('shoot', [0,1,2,3,4], 15, true);

		gun2 = this._guns.create(this.world.width - 170, -130, 'gun');
		gun2.scale.setTo(2,2);
		gun2.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun2.anchor.setTo(0.5,0.5);
		gun2.angle = -32;

		gun3 = this._guns.create(this.world.width - 250, -100, 'gun');
		gun3.scale.setTo(2,2);
		gun3.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun3.anchor.setTo(0.5,0.5);
		gun3.angle = -52;

		gun4 = this._guns.create(this.world.width - 350, -100, 'gun');
		gun4.scale.setTo(2,2);
		gun4.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun4.anchor.setTo(0.5,0.5);
		gun4.angle = -72;

		gun5 = this._guns.create(this.world.width - 450, -100, 'gun');
		gun5.scale.setTo(2,2);
		gun5.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun5.anchor.setTo(0.5,0.5);
		gun5.angle = -85;

		gun6 = this._guns.create(this.world.width - 550, -100, 'gun');
		gun6.scale.setTo(2,2);
		gun6.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun6.anchor.setTo(0.5,0.5);
		gun6.angle = -85;

		gun7 = this._guns.create(this.world.width - 650, -100, 'gun');
		gun7.scale.setTo(2,2);
		gun7.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun7.anchor.setTo(0.5,0.5);
		gun7.angle = -105;

		gun8 = this._guns.create(-100, 120, 'gun');
		gun8.scale.setTo(2,2);
		gun8.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun8.anchor.setTo(0.5,0.5);
		gun8.angle = -125;

		gun9 = this._guns.create( -100, 150, 'gun');
		gun9.scale.setTo(2,2);
		gun9.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun9.anchor.setTo(0.5,0.5);
		gun9.angle = -145;

		gun10 = this._guns.create( -100, 200, 'gun');
		gun10.scale.setTo(2,2);
		gun10.animations.add('shoot', [0,1,2,3,4], 15, true);
		gun10.anchor.setTo(0.5,0.5);
		gun10.angle = -165;
	},
	update: function() {
		this.physics.arcade.collide(this._player, this._platforms);
		// this.physics.arcade.collide(this._platforms, this._gun);
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