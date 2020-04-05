class SceneMain extends Phaser.Scene {
	// construct me
	constructor(){
		// super me
		super({ key: 'SceneMain' });
		console.log('SceneMain::constructor()');
	}

	preload() {
		console.log('SceneMain::preload()');
	}

    create() {
		console.log('SceneMain::create()');
		// create menu buttons
		let buttons = this.rexUI.add.buttons({
			anchor:{
				centerX: 'center',
				centerY: 'center'
			},
			orientation: 'y',
			space: 8,
			buttons:[
				this.rexUI.add.label({
					align: 'center',
					width: 256,
					height: 128,
					background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 4, DATA.colors.BUTTON_NORMAL),
					text: this.add.text(0, 0, 'Battle', {
						fontSize: 64
					}),
				})
			]			
		});
		buttons.layout();
		buttons.on('button.click', function(button, index, pointer, event){
			switch (index){
				case 0:{
					// battle
					this.scene.start('SceneTeamSelect');
				} break;
			}
		}, this);
		buttons.on('button.over', function(button, index, pointer, event){
			button.getElement('background').setStrokeStyle(4, DATA.colors.BUTTON_HOVER_EDGE);
			button.getElement('background').setFillStyle(DATA.colors.BUTTON_HOVER, 1);
		}, this);
		buttons.on('button.out', function(button, index, pointer, event){
			button.getElement('background').setStrokeStyle();
			button.getElement('background').setFillStyle(DATA.colors.BUTTON_NORMAL, 1);
		}, this);
    }	
	
	update() {
	}
}

class SceneTeamSelect extends Phaser.Scene {
	// construct me
	constructor(){
		// super me
		super({ key: 'SceneTeamSelect' });
		console.log('SceneTeamSelect::constructor()');
	}

	preload() {
		console.log('SceneTeamSelect::preload()');
		this.load.spritesheet('actors', 'assets/entities_24x24.png', { frameWidth: 24, frameHeight: 24 });
	}

    create() {
		console.log('SceneTeamSelect::create()');
		
		// buttons for character selectors
		this.selector = new PartyClassSelector(this);
		
		// start and cancel buttons
		let buttons = this.rexUI.add.buttons({
			anchor:{
				centerX: 'center',
				centerY: '80%'
			},
			orientation: 'h',
			space: 8,
			buttons:[
				this.rexUI.add.label({
					align: 'center',
					width: 256,
					height: 128,
					background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 4, DATA.colors.BUTTON_NORMAL),
					text: this.add.text(0, 0, 'Ready', {
						fontSize: 64
					}),
				}),
				this.rexUI.add.label({
					align: 'center',
					width: 256,
					height: 128,
					background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 4, DATA.colors.BUTTON_NORMAL),
					text: this.add.text(0, 0, 'Cancel', {
						fontSize: 64
					}),
				})
			]			
		});
		buttons.layout();
		buttons.on('button.click', function(button, index, pointer, event){
			switch (index){
				case 0:{
					// ready
					this.scene.start('SceneBattle', {
						selected:[
							this.selector.selectors[0].selected_index,
							this.selector.selectors[1].selected_index,
							this.selector.selectors[2].selected_index
						]
					});
				} break;
				case 1:{
					// cancel; go back to main
					this.scene.start('SceneMain');
				} break;
			}
		}, this);
		buttons.on('button.over', function(button, index, pointer, event){
			button.getElement('background').setStrokeStyle(4, DATA.colors.BUTTON_HOVER_EDGE);
			button.getElement('background').setFillStyle(DATA.colors.BUTTON_HOVER, 1);
		}, this);
		buttons.on('button.out', function(button, index, pointer, event){
			button.getElement('background').setStrokeStyle();
			button.getElement('background').setFillStyle(DATA.colors.BUTTON_NORMAL, 1);
		}, this);
    }	
	
	update() {
	}
}

class SceneBattle extends Phaser.Scene {
	// construct me
	constructor(){
		// super me
		super({ key: 'SceneBattle' });
		console.log('SceneBattle::constructor()');
	}

	init(data){
		console.log('SceneBattle::init(data)');
		this.selected = data.selected;
	}

	preload() {
		console.log('SceneBattle::preload()');
	}

    create() {
		console.log('SceneBattle::create()');
		
		// create menu buttons
		let buttons = this.rexUI.add.buttons({
			anchor:{
				centerX: 'center',
				centerY: 'center'
			},
			orientation: 'y',
			buttons:[
				this.rexUI.add.label({
					align: 'center',
					width: 256,
					height: 128,
					background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 4, DATA.colors.BUTTON_NORMAL),
					text: this.add.text(0, 0, 'Exit', {
						fontSize: 64
					}),
				})
			]			
		})
		.layout()
		.on('button.click', function(button, index, pointer, event){
			switch(index){
				case 0:{
					// exit
					this.scene.start('SceneMain');
				} break;
			}
		}, this)
		.on('button.over', function(button, index, pointer, event){
			button.getElement('background').setStrokeStyle(4, 0xffffff);
		}, this)
		.on('button.out', function(button, index, pointer, event){
			button.getElement('background').setStrokeStyle();
		}, this);

		this.status = new BattleActorStatus(this);
    }	
	
	update() {
	}
}

