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
		this.value = Math.round(value);
		this.max_value = Math.round(max_value);
		this.dirty = true;
		
		this.background = scene.rexUI.add.roundRectangle(0, 0, this.width, this.height, 4, 0x000000).setStrokeStyle(this.border_size, 0xffffff);
		this.background.setOrigin(0.5);
		this.bar = scene.rexUI.add.roundRectangle(0, 0, this.width / 2, this.height, 4, 0x80ff80);
		this.bar.setOrigin(0.5);
		this.text = scene.add.text(
			this.width / 2,
			this.height / 2,
			this.value + '/' + this.max_value,
			{
                fontSize: this.font_size,
                fontFamily: 'Arial',
                fontStyle: 'bold',
				fill: '#ffffff',
                align: 'center'
			}
		);
		this.text.setOrigin(0.5);
		this.add(this.background);
		this.add(this.bar);
		this.add(this.text);		
	}
	
	update(){
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
					icon: scene.add.sprite(0, 0, 'actors', DATA.classes[this.selected_index].graphics_index).setDisplaySize(128, 128)
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
						this.selected_index = DATA.classes.length - 1;
					}
				} break;
				case 1:{
					// clicked the character
				} break;
				case 2:{
					// clicked next
					this.selected_index += 1;
					if (this.selected_index >= DATA.classes.length){
						this.selected_index = 0;
					}
				} break;
			}
			this.selector.getButton(1).getElement('icon').setFrame(DATA.classes[this.selected_index].graphics_index);
			this.information.text = DATA.classes[this.selected_index].name;
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
			text: scene.add.text(0, 0, DATA.classes[this.selected_index].name, {
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
	constructor(scene){
		super(scene, 0, 0, 0, 0, 'v');
		
		// selected class index
		this.selected_index = 0;
		
		// background
		this.addBackground(scene.rexUI.add.roundRectangle(0, 0, 0, 0, 4, 0x000000).setStrokeStyle(2, 0xffffff));
		this.add(new ProgressBar(scene, 0, 0, 256, 64, 2, 48, 50, 100));
		
		this.layout();
	}
}