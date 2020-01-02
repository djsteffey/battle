class ProgressBar extends Phaser.GameObjects.Container{
	// build me !!!
	constructor(scene, x, y, width, height, border_size, font_size, value, max_value){
		// super me
		super(scene, x, y);
		scene.add.existing(this);

		// save passed values
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.border_size = border_size;
		this.value = Math.round(value);
		this.max_value = Math.round(max_value);
		this.background_color = 0xffffff;
		this.background_alpha = 1;
		this.inner_color = 0x008000;
		this.inner_alpha = 1;
		this.outer_color = 0x222222;
		this.outer_alpha = 1;
		this.dirty = true;
		
		// create the bar and the box
		this.background = scene.add.graphics();
		this.add(this.background);
		this.box = scene.add.graphics();
		this.add(this.box);
		this.bar = scene.add.graphics();		
		this.add(this.bar);

		// text
		this.text = scene.add.text(
			this.width / 2,
			this.height / 2,
			this.value + '/' + this.max_value,
			{
				fontSize: font_size,
				fill: '#ffffff',
				align: 'center'
			}
		);
		this.text.setOrigin(0.5);
		this.add(this.text);
		
		// do one instance of update to setup all the drawing
		this.update();
	}
	
	update(){		
		if (this.dirty){
			this.dirty = false;
			
			this.background.clear();
			this.background.fillStyle(this.background_color, this.background_alpha);
			this.background.fillRect(0, 0, this.width, this.height);
			
			this.box.clear();
			this.box.fillStyle(this.outer_color, this.outer_alpha);
			this.box.fillRect(this.border_size, this.border_size, this.width - 2 * this.border_size, this.height - 2 * this.border_size);

			this.bar.clear();
			this.bar.fillStyle(this.inner_color, this.inner_alpha);
			this.bar.fillRect(
				this.border_size,
				this.border_size,
				(this.width - 2 * this.border_size) * this.value / this.max_value,
				this.height - 2 * this.border_size
			);

			this.text.setText(abbreviate_number(this.value) + '/' + abbreviate_number(this.max_value));
		}
	}
	
	set_background_fill_style(color, alpha){
		this.background_color = color;
		this.background_alpha = alpha;
		this.dirty = true;
	}
	
	set_inner_fill_style(color, alpha){
		this.inner_color = color;
		this.inner_alpha = alpha;
		this.dirty = true;
	}
	
	set_outer_fill_style(color, alpha){
		this.outer_color = color;
		this.outer_alpha = alpha;
		this.dirty = true;
	}
	
	set_border_size(size){
		this.border_size = size;
		this.dirty = true;
	}
	
	set_value(value){
		this.value = Math.round(value);
		if (this.value > this.max_value){
			this.value = this.max_value;
		}
		this.dirty = true;
	}
	
	set_max_value(value){
		this.max_value = Math.round(value);
		this.dirty = true;
	}
}
