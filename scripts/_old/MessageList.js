class CMessageList extends Phaser.GameObjects.Container{
	// build me !!!
	constructor(scene, x, y, width, height, border_size){
		// super me
		super(scene, x, y);
		scene.add.existing(this);

		// save passed values
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.border_size = border_size;

		// initial colors
		this.box_color = 0x222222;
		this.box_alpha = 1;
		
		// create the bar and the box
		this.box = scene.add.graphics();
		this.add(this.box);

		// store all the texts
		this.text = this.scene.add.text(
			this.border_size,
			this.border_size,
			'',
			{
				fontSize: '22px',
				fill: '#ffffff',
				align: 'left',
				wordWrap: true,
				wordWrapWidth: this.width - this.border_size * 2
			}
		);
		this.text.setOrigin(0);
		this.add(this.text);

		// flag dirty
		this.dirty = true;
	}
	
	update(){		
		// check if dirty
		if (this.dirty){
			// flag not dirty anymore
			this.dirty = false;

			// redraw the box
			this.box.clear();
			this.box.fillStyle(this.box_color, this.box_alpha);
			this.box.fillRect(0, 0, this.width, this.height);
		}
	}
	
	set_box_color(color, alpha){
		this.box_color = color;
		this.box_alpha = alpha;
		this.dirty = true;
	}

	add_message(msg){
		if (this.text.text == ''){
			this.text.setText(msg);
		}
		else{
			this.text.setText(this.text.text + '\n' + msg);
		}
		while (this.text.displayHeight > this.height - 2 * this.border_size){
			let n = this.text.text.indexOf('\n');
			if (n != -1){
				this.text.setText(this.text.text.substr(n + 1));
			}
		}
	}
}
