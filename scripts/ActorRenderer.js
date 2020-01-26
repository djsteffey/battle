class AbilitiesBarAbility extends Phaser.GameObjects.Container{
    constructor(scene, x, y, sheet, index, ability_data){
        // super me
        super(scene, x, y);
        scene.add.existing(this);

        // save the ability
        this.ability_data = ability_data;

        // add to the sprite icon
        this.sprite = new Phaser.GameObjects.Sprite(scene, x, y, sheet, index);
        this.sprite.setDisplaySize(64, 64);
        this.sprite.setOrigin(.5, .5);
        this.sprite.setPosition(32, 32);
        this.add(this.sprite);

        // no tween yet
        this.tween = null;

        // the shading
        this.shading = scene.add.graphics();
        this.add(this.shading);

        // register handler for clicking on the sprite
        this.sprite.setInteractive();
        this.sprite.on('pointerdown', function(){
            // check if ready
            if (this.ability_data.get_is_ready()){
                this.emit('click', this.ability_data);
            }
        }.bind(this));
    }

    update(){
        if (this.ability_data !== null){
            this.shading.clear();
            if (this.ability_data.get_is_ready() === false){
				if (this.tween !== null){
					this.tween.remove();
					this.tween = null;
					this.sprite.setDisplaySize(64, 64);
				}
                this.shading.fillStyle(0x000000, 0.75);
                let percent_ready = this.ability_data.get_ready_percent();
                this.shading.fillRect(0, 0, 64, 64 * (1 - percent_ready));
            }
            else{
                if (this.tween === null){
                    // tween the sprite
                    this.tween = this.scene.tweens.add({
                        targets: [this.sprite],
                        scale: 2.15,
                        ease: 'Linear',
                        duration: 250,
                        yoyo: true,
                        repeat: -1,
                        callbackScope: this
                    });
                }
            }
        }
    }
}

class AbilitiesBar extends Phaser.GameObjects.Container{
	// build me !!!
	constructor(scene, x, y){
		// super me
		super(scene, x, y);
		scene.add.existing(this);

		// save passed values
		this.x = x;
		this.y = y;
		this.width = 296;
		this.height = 80;
		this.border_size = 2;
		this.background_color = 0xffffff;
		this.background_alpha = 1;
		
		// create the bar and the box
		this.background = scene.add.graphics();
        this.add(this.background);
        
        // icons
        this.icons = null;

		// no initial actor
		this.actor_data = null;
		
		// do one instance of update to setup all the drawing
		this.update();
	}
	
	update(){		
		// clear drawing
		this.background.clear();

		// draw background
		this.background.lineStyle(2, this.background_color, this.background_alpha);
		this.background.strokeRect(0, 0, this.width, this.height);

        // update icons if we have them
        if (this.icons !== null){
            for (let i = 0; i < this.icons.length; ++i){
                if (this.icons[i] !== null){
                    this.icons[i].update();
                }
            }
        }
	}
	
	set_actor(actor_data){
        // save the actor
        this.actor_data = actor_data;
        
        // remove existing icons
        if (this.icons !== null){
            for (let i = 0; i < this.icons.length; ++i){
                if (this.icons[i] !== null){
                    this.icons[i].remove();
                }
            }
        }

        // create the new icons
        this.icons = [];
        if (this.actor_data !== null){
            for (let i = 0; i < this.actor_data.abilities.length; ++i){
                if (this.actor_data.abilities[i] !== null){
                    let icon = new AbilitiesBarAbility(this.scene, 0, 0, 'icons', i, this.actor_data.abilities[i]);
                    icon.on('click', function(ability_data){
                        // make sure the ability is ready
                        if (ability_data.get_is_ready()){
                            // emit the click
                            this.emit('click', ability_data);
                        }
                    }.bind(this));
                    this.icons.push(icon);
                }
                else{
                    this.icons.push(null);
                }
            }
        }
        for (let i = 0; i < this.icons.length; ++i){
            if (this.icons[i] !== null){
                this.icons[i].setPosition(8 + (i * (8 + 64)), 8);
                this.add(this.icons[i]);
            }
        }

        // one update
        this.update();
	}
}

class ActorRenderer extends Phaser.GameObjects.Container{
	constructor(scene, x, y, actor_data){
		// super me
		super(scene, x, y);
		scene.add.existing(this);
		
		// save the actor state
		this.actor_data = actor_data;
		
		// sprite for the actor
		this.sprite = new Phaser.GameObjects.Sprite(scene, 80, 104, 'actors', this.actor_data.graphics_id);
		this.sprite.setOrigin(.5, 1);
		this.sprite.setDisplaySize(24 * 4, 24 * 4);
		this.scene.add.existing(this.sprite);
        this.add(this.sprite);
        
        // tween the sprite
        this.scene.tweens.add({
            targets: [this.sprite],
            scaleY: 4.25,
            ease: 'Linear',
            duration: 350,
            yoyo: true,
            repeat: -1,
            callbackScope: this
        });
		
		// progress bar for hp
		this.hp_bar = new ProgressBar(scene, 8, 112, 144, 32, 2, '24px', this.actor_data.stats.hp, this.actor_data.stats.hp_max);
		this.add(this.hp_bar);

		// listen for actor events
		this.actor_data.on('damage', function(amount){
			// scrolling text
		}.bind(this));
		this.actor_data.on('heal', function(amount){
			// scrolling text
		}.bind(this));
		this.actor_data.on('death', function(amount){
			// scrolling text
		}.bind(this));
	}

	update(){
		// update the hp bar
		this.hp_bar.set_value(this.actor_data.stats.hp);
		this.hp_bar.set_max_value(this.actor_data.stats.hp_max);
		this.hp_bar.update();
	}
}

class TeamRenderer extends Phaser.GameObjects.Container{
	constructor(scene, x, y, team_data){
		// super me
		super(scene, x, y);
		scene.add.existing(this);

		// make an actor renderer for each actor in the team
		this.actors_renderer = [
			new ActorRenderer(scene, 0, 0, team_data.actors_data[0]),
			new ActorRenderer(scene, 0, 0, team_data.actors_data[1]),
			new ActorRenderer(scene, 0, 0, team_data.actors_data[2])
		];
		for (let i = 0; i < this.actors_renderer.length; ++i){
			this.add(this.actors_renderer[i]);
		}

		// abilities bar
		this.ability_bar = new AbilitiesBar(scene, 0, 0);
		this.add(this.ability_bar);

		// callback for ability bar
		this.ability_bar.on('click', function(ability_data){
            if (ability_data.get_is_ready()){
				this.emit('ability_click', ability_data);
            }
		}.bind(this));

		// set the lead actor on the ability bar
		this.ability_bar.set_actor(team_data.actors_data[0]);
	}

	update(){
		for (let i = 0; i < this.actors_renderer.length; ++i){
			this.actors_renderer[i].update();
		}
		this.ability_bar.update();
	}
}

class TeamRendererLeft extends TeamRenderer{
	constructor(scene, team_data){
		// super me
		super(scene, 0, 0, team_data);

		// set actor position
		this.actors_renderer[0].setPosition(325, 224);
		this.actors_renderer[1].setPosition(64, 100);
		this.actors_renderer[2].setPosition(64, 348);

		// flip them
		this.actors_renderer[0].sprite.setFlip(true, false);
		this.actors_renderer[1].sprite.setFlip(true, false);
		this.actors_renderer[2].sprite.setFlip(true, false);

		// abilities bar position
		this.ability_bar.setPosition(189, 512);
	}
}

class TeamRendererRight extends TeamRenderer{
	constructor(scene, team_data){
		// super me
		super(scene, 1066 / 2, 0, team_data);

		// set actor position
		this.actors_renderer[0].setPosition(48, 224);
		this.actors_renderer[1].setPosition(309, 100);
		this.actors_renderer[2].setPosition(309, 348);

		// abilities bar position
		this.ability_bar.setPosition(48, 512);
	}
}