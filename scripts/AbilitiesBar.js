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
        this.icons = [
            new Phaser.GameObjects.Sprite(scene, 0, 0, 'icons', 0),
            new Phaser.GameObjects.Sprite(scene, 0, 0, 'icons', 1),
            new Phaser.GameObjects.Sprite(scene, 0, 0, 'icons', 2),
            new Phaser.GameObjects.Sprite(scene, 0, 0, 'icons', 3)
        ];
        for (let i = 0; i < this.icons.length; ++i){
            this.icons[i].setDisplaySize(64, 64);
            this.icons[i].setOrigin(0, 0);
            this.icons[i].setPosition(8 + (i * (8 + 64)), 8);
            this.icons[i].setTint(0x101010);
            this.add(this.icons[i]);
        }


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
                        this.icons[i].tint = 0x555555;
//						this.background.fillStyle(0x00ff00, 1);
					}
					else{
                        this.icons[i].tint = 0x555555;
//						this.background.fillStyle(0x008000, 1);
					}
//					this.background.fillRect(8 + (i * (8 + 64)), 8, 64, 64);

                    // draw shading over the cooldown portion
                    /*
					if (this.actor.abilities[i].get_is_ready() === false){
						this.background.fillStyle(0x000000, 0.75);
						let percent_ready = this.actor.abilities[i].get_ready_percent();
						this.background.fillRect(8 + (i * (8 + 64)), 8, 64, 64 * (1 - percent_ready));
                    }*/
                    
				}
			}
		}
	}
	
	set_actor(actor){
		this.actor = actor;
		this.update();
	}
}
