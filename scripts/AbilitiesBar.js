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


        // icons shading
        this.icons_shading = null;


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

		if (this.actor != null){
			for (let i = 0; i < this.actor.abilities.length; ++i){
				if (this.actor.abilities[i] !== null){
					// draw ability
					if (this.actor.abilities[i].get_is_ready()){
                        this.icons[i].setTint(0xffffff);
					}
					else{
                        this.icons[i].setTint(0x808080);
					}

                    // draw shading over the cooldown portion
                    this.icons_shading[i].clear();
					if (this.actor.abilities[i].get_is_ready() === false){
						this.icons_shading[i].fillStyle(0x000000, 0.75);
						let percent_ready = this.actor.abilities[i].get_ready_percent();
						this.icons_shading[i].fillRect(8 + (i * (8 + 64)), 8, 64, 64 * (1 - percent_ready));
                    }
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

        // remove existing shading icons
        if (this.icons_shading !== null){
            for (let i = 0; i < this.icons_shading.length; ++i){
                if (this.icons_shading[i] !== null){
                    this.icons_shading[i].remove();
                }
            }
        }

        // create the new icons
        this.icons = [];
        for (let i = 0; i < this.actor.abilities.length; ++i){
            if (this.actor.abilities[i] !== null){
                this.icons.push(new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'icons', i));
            }
            else{
                this.icons.push(null);
            }
        }
        for (let i = 0; i < this.icons.length; ++i){
            if (this.icons[i] !== null){
                this.icons[i].setDisplaySize(64, 64);
                this.icons[i].setOrigin(0, 0);
                this.icons[i].setPosition(8 + (i * (8 + 64)), 8);
                this.add(this.icons[i]);
            }
        }

        // create new icons shading
        this.icons_shading = [];
        for (let i = 0; i < this.icons.length; ++i){
            if (this.icons[i] !== null){
                this.icons_shading.push(this.scene.add.graphics());
                this.add(this.icons_shading[i]);
            }
            else{
                this.icons_shading.push(null);
            }
        }

        // one update
        this.update();
	}
}
