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
		this.dirty = true;
		
		// create the bar and the box
		this.background = scene.add.graphics();
		this.add(this.background);

		// do one instance of update to setup all the drawing
		this.update();
	}
	
	update(){		
		if (this.dirty){
			this.dirty = false;
			
			this.background.clear();
            this.background.lineStyle(2, this.background_color, this.background_alpha);
            this.background.strokeRect(0, 0, this.width, this.height);
            this.background.strokeRect(8 + (0 * (8 + 64)), 8, 64, 64);
            this.background.strokeRect(8 + (1 * (8 + 64)), 8, 64, 64);
            this.background.strokeRect(8 + (2 * (8 + 64)), 8, 64, 64);
            this.background.strokeRect(8 + (3 * (8 + 64)), 8, 64, 64);
		}
	}
}
