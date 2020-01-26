class AbilitiesBarAbility extends Phaser.GameObjects.Container{
    constructor(scene, x, y, sheet, index, ability){
        // super me
        super(scene, x, y);
        scene.add.existing(this);

        // save the ability
        this.ability = ability;

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
            if (this.ability.get_is_ready()){
                // it is ready; stop the tween, set the size and emit the click
                if (this.tween !== null){
                    this.tween.remove();
                    this.tween = null;
                }
                this.sprite.setDisplaySize(64, 64);
                this.emit('click', this.ability);
            }
        }.bind(this));
    }

    update(){
        if (this.ability !== null){
            this.shading.clear();
            if (this.ability.get_is_ready() === false){
                this.shading.fillStyle(0x000000, 0.75);
                let percent_ready = this.ability.get_ready_percent();
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
		this.actor = null;
		
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
	
	set_actor(actor){
        // save the actor
        this.actor = actor;
        
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
        if (this.actor !== null){
            for (let i = 0; i < this.actor.abilities.length; ++i){
                if (this.actor.abilities[i] !== null){
                    let icon = new AbilitiesBarAbility(this.scene, 0, 0, 'icons', i, this.actor.abilities[i]);
                    icon.on('click', function(ability){
                        // make sure the ability is ready
                        if (ability.get_is_ready()){
                            // emit the click
                            this.emit('click', ability);
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
