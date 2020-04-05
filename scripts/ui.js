class ProgressBar extends Phaser.GameObjects.Container{
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
		this.font_size = font_size;
		this.value = value;
		this.max_value = max_value;
		
		this.background = scene.rexUI.add.roundRectangle(0, 0, this.width, this.height, 4, 0x000000).setStrokeStyle(this.border_size, 0xffffff);
		this.bar = scene.rexUI.add.roundRectangle(0, 0, this.width, this.height, 4, 0x80ff80);
		this.text = scene.add.text(
			0,
			0,
			'0/0',
			{
                fontSize: this.font_size,
                fontStyle: 'bold',
				fill: '#ffffff',
                align: 'center'
			}
		);
		this.text.setOrigin(0.5);
		this.add(this.background);
		this.add(this.bar);
		this.add(this.text);
		this.set_value(value);
		this.set_max_value(max_value);		
	}
	
	set_fill_color(color, alpha){
		this.bar.setFillStyle(color, alpha);
	}

	set_empty_color(color, alpha){
		this.background.setFillStyle(color, alpha);
	}

	set_value(value){
		this.value = Math.round(value);
		this.bar.width = this.width * this.get_percent();
		this.bar.x = -(this.width - this.bar.width) / 2;
		this.text.text = this.value + '/' + this.max_value;
	}

	set_max_value(max_value){
		this.max_value = Math.round(max_value);
		this.bar.width = this.width * this.get_percent();
		this.bar.x = -(this.width - this.bar.width) / 2;
		this.text.text = this.value + '/' + this.max_value;
	}

	set_text_color(color){
		this.text.setColor(color);
	}

	get_percent(){
		return this.value / this.max_value;
	}
}

class ClassSelector extends RexPlugins.UI.Sizer{
	constructor(scene){
		super(scene, 0, 0, 0, 0, 'v');
		
		// selected class index
		this.selected_index = 0;
		
		// background
		this.addBackground(scene.rexUI.add.roundRectangle(0, 0, 0, 0, 4, 0x000000).setStrokeStyle(2, 0xffffff));

		// prev, image, next as buttons
		this.selector = scene.rexUI.add.buttons({
			orientation: 'h',
			space: 8,
			buttons:[
				scene.rexUI.add.label({
					width: 64,
					height: 64,
					background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 4, DATA.colors.BUTTON_NORMAL),
					text: scene.add.text(0, 0, 'prev', {
						fontSize: 32
					})
				}),
				scene.rexUI.add.label({
					width: 128,
					height: 128,
					background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 4, DATA.colors.BUTTON_NORMAL),
					icon: scene.add.sprite(0, 0, 'actors', DATA.clazzes[this.selected_index].graphics_index).setDisplaySize(128, 128)
				}),
				scene.rexUI.add.label({
					width: 64,
					height: 64,
					background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 4, DATA.colors.BUTTON_NORMAL),
					text: scene.add.text(0, 0, 'next', {
						fontSize: 32
					})
				}),
			]			
		})
		.on('button.click', function(button, index, pointer, event){
			switch (index){
				case 0:{
					// clicked previous
					this.selected_index -= 1;
					if (this.selected_index < 0){
						this.selected_index = DATA.clazzes.length - 1;
					}
				} break;
				case 1:{
					// clicked the character
				} break;
				case 2:{
					// clicked next
					this.selected_index += 1;
					if (this.selected_index >= DATA.clazzes.length){
						this.selected_index = 0;
					}
				} break;
			}
			this.selector.getButton(1).getElement('icon').setFrame(DATA.clazzes[this.selected_index].graphics_index);
			this.information.text = DATA.clazzes[this.selected_index].name;
		}, this)
		.on('button.over', function(button, index, pointer, event){
			button.getElement('background').setStrokeStyle(4, DATA.colors.BUTTON_HOVER_EDGE);
			button.getElement('background').setFillStyle(DATA.colors.BUTTON_HOVER, 1);
		}, this)
		.on('button.out', function(button, index, pointer, event){
			button.getElement('background').setStrokeStyle();
			button.getElement('background').setFillStyle(DATA.colors.BUTTON_NORMAL, 1);
		}, this)
		.layout();
		this.add(this.selector, 1, 'center', 4);


		// information about the class
		this.information = scene.rexUI.add.label({
			width: 64,
			height: 64,
			background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 4, 0x00ff00),
			text: scene.add.text(0, 0, DATA.clazzes[this.selected_index].name, {
				fontSize: 32
			})
		})
		.layout();
		this.add(this.information, 1, 'center', 4);
		
		this.layout();
	}
}

class PartyClassSelector extends RexPlugins.UI.Sizer{
	constructor(scene){
		super(scene, 0, 0, 0, 0, 'h', {
			anchor:{
				centerX: 'center',
				centerY: '20%'
			}
		});
		this.selectors = [
			new ClassSelector(scene),
			new ClassSelector(scene),
			new ClassSelector(scene)
		]
		for (let i = 0; i < this.selectors.length; ++i){
			this.add(this.selectors[i], 1, 'center', 8);
		}
		this.layout();
	}
}

class BattleActorStatus extends RexPlugins.UI.Sizer{
	constructor(scene, actor = null){
		super(scene, 0, 0, 0, 0, 'v');
		
		// font size for text components
		const font_size = 32;

		
		// background
		this.addBackground(scene.rexUI.add.roundRectangle(0, 0, 0, 0, 4, 0x000000).setStrokeStyle(2, 0xffffff));

		// hp bar
		this.hp = new ProgressBar(scene, 0, 0, 256, 48, 2, font_size, 0, 0);
		this.hp.set_fill_color(0x00ff00, 1);
		this.hp.set_empty_color(0xff0000, 1);
		this.add(this.hp, 1, 'center', 4);

		// class name
		this.class_name = scene.add.text(
			0,
			0,
			'CLS:',
			{
                fontSize: font_size,
                fontStyle: 'bold',
				fill: '#ffffff',
                align: 'center'
			}
		);
		this.class_name.setOrigin(0.5);
		this.add(this.class_name, 1, 'left', 4);
		
		// speed
		this.speed = scene.add.text(
			0,
			0,
			'SPD:',
			{
                fontSize: font_size,
                fontStyle: 'bold',
				fill: '#ffffff',
                align: 'center'
			}
		);
		this.speed.setOrigin(0.5);
		this.add(this.speed, 1, 'left', 4);
		
		// power
		this.power = scene.add.text(
			0,
			0,
			'PWR:',
			{
                fontSize: font_size,
                fontStyle: 'bold',
				fill: '#ffffff',
                align: 'center'
			}
		);
		this.power.setOrigin(0.5);
		this.add(this.power, 1, 'left', 4);

		// layout
		this.layout();
		
		// set the actor
		this.set_actor(actor);
	}
	
	set_actor(actor){
		this.actor = actor;
		if (this.actor !== null){
			this.hp.set_value(this.actor.stats.effective.hp);
			this.hp.set_max_value(this.actor.stats.effective.hp_max);
			this.class_name.text = 'CLS: ' + this.actor.clazz.name;
			this.speed.text = 'SPD: ' + this.actor.stats.effective.speed;
			this.power.text = 'PWR: '  + this.actor.stats.effective.power;
		}
		else{
			this.hp.set_value(0);
			this.hp.set_max_value(0);
			this.class_name.text = 'CLS:';
			this.speed.text = 'SPD:';
			this.power.text = 'PWR:';
		}
		this.layout();
	}
}