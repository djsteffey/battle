

class UiQuestList extends RexPlugins.UI.Tabs {
    constructor(scene, active_quests, available_quests) {
        super(
            scene,
            {
                // location of the list
                x: 0,
                y: 0,

                // main panel
                panel: scene.rexUI.add.gridTable({
                    // panel background
                    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT, 1),

                    // table characteristics
                    table: {
                        width: 600,
                        height: 400,
                        cellWidth: 596,
                        cellHeight: 60,
                        columns: 1,
                        mask: {
                            padding: 2,
                        },
                    },

                    // slider characteristics
                    slider: {
                        track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
                        thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
                    },
                  
                    // callback for creating each cell
                    createCellContainerCallback: function (cell) {
                        var scene = cell.scene,
                        width = cell.width,
                        height = cell.height,
                        item = cell.item,
                        index = cell.index;
                        return scene.rexUI.add.label({
                            width: width,
                            height: height,
                            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                            icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, item.color),
                            text: scene.add.text(0, 0, item.name),
                            space: {
                                icon: 10,
                                left: 15
                            }
                        });
                    },
                }),

                // active/available buttons
				topButtons:[
					scene.rexUI.add.label({
						width: 150,
						height:40,
						background: scene.rexUI.add.roundRectangle(0, 0, 50, 50, { tr: 20, tl: 20}, COLOR_DARK).setStrokeStyle(2, COLOR_LIGHT, 1),
						text: scene.add.text(0, 0, 'Active', {
							fontSize: '18pt'
						}),
						space: {
							left: 10
						}
					}),
					scene.rexUI.add.label({
						width: 150,
						height:40,
						background: scene.rexUI.add.roundRectangle(0, 0, 50, 50, {tr:20, tl:20}, COLOR_DARK).setStrokeStyle(2, COLOR_LIGHT, 1),
						text: scene.add.text(0, 0, 'Available', {
							fontSize: '18pt'
						}),
						space: {
							left: 10
						}
					})
                ],
                
                // spacing
                space: {
					topButtonsOffset: 200,
                    topButton: 4
                },
            }
        );

        // layout the tabs control
        this.layout();

        // save the quests
        this.active_quests = active_quests;
		this.available_quests = available_quests;

        // not currently a prev button
        this.previous_button = null;

        // callbacks on the active/available buttons
        this.on('button.click', function (button, groupName, index){
            // do nothing if the button is the same as the prev
            if (button === this.previous_button){
                return;
            }

            // ensure we are talking about the top buttons
			if (groupName !== 'top'){
				return;
			}

			// un-highlight the previous clicked button
			if (this.previous_button) {
				this.previous_button.getElement('background').setFillStyle(COLOR_DARK)
			}

			// save the button
			this.previous_button = button;
			
			// highlight the new clicked button
			button.getElement('background').setFillStyle(COLOR_PRIMARY);

            // todo, switch between active and available
			if (button.text === 'Active'){
				this.getElement('panel').setItems(this.active_quests).scrollToTop();
			}
			else{
				this.getElement('panel').setItems(this.available_quests).scrollToTop();
			}
        }, this);

        // callbacks for cell interactions
        this.getElement('panel')
            .on('cell.click', function (cellContainer, cellIndex) {
                this.emit('quest_click', cellContainer.text);
            }, this)
            .on('cell.over', function (cellContainer, cellIndex) {
                cellContainer.getElement('background')
                    .setStrokeStyle(2, COLOR_LIGHT)
                    .setDepth(1);
            }, this)
            .on('cell.out', function (cellContainer, cellIndex) {
                cellContainer.getElement('background')
                    .setStrokeStyle(2, COLOR_DARK)
                    .setDepth(0);
            }, this);
			
		// simulate click on active
		this.emitButtonClick('top', 0);
    }
}

class UiQuestListContainer extends RexPlugins.UI.Sizer{
    constructor(scene, active_quests, available_quests){
		// super me
        super(scene, scene.sys.game.canvas.width / 2, scene.sys.game.canvas.height / 2, 0, 0, 'y');
		
		// color scheme
		this.COLOR_DARK = 0x0000ff;
		this.COLOR_LIGHT = 0x8080ff;
		this.COLOR_PRIMARY = 0x5050ff;
		
		// save quests
		this.active_quests = active_quests;
		this.available_quests = available_quests;
		
		// add a background
		this.background = scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, this.COLOR_PRIMARY).setStrokeStyle(4, this.COLOR_LIGHT, 1);
		this.addBackground(this.background);
		
		// add the quests label
		this.label = scene.rexUI.add.label({
			orientation: 'y',
			text: scene.add.text(0, 0, 'QUESTS', { fontSize: '38pt'})
		});
		this.add(this.label);
		
		// add the tab control for the list of quests
		this.quest_list = this.rexUI.add.tabs({
			// location of the list
			x: 0,
			y: 0,

			// main panel
			panel: scene.rexUI.add.gridTable({
				// panel background
				background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, this.COLOR_PRIMARY).setStrokeStyle(2, this.COLOR_LIGHT, 1),

				// table characteristics
				table: {
					width: 500,
					height: 250,
					cellWidth: 496,
					cellHeight: 60,
					columns: 1,
					mask: {
						padding: 2
					}
				},

				// slider characteristics
				slider: {
					track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, this.COLOR_DARK),
					thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, this.COLOR_LIGHT)
				},
			  
				// callback for creating each cell
				createCellContainerCallback: function (cell) {
					return cell.scene.rexUI.add.label({
						width: cell.width,
						height: cell.height,
						background: cell.scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, this.COLOR_DARK),
						icon: cell.scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, cell.item.color),
						text: cell.scene.add.text(0, 0, cell.item.name),
						space: {
							icon: 10,
							left: 15
						}
					});
				},
			}),

			// active/available buttons
			topButtons:[
				scene.rexUI.add.label({
					width: 150,
					height:40,
					background: scene.rexUI.add.roundRectangle(0, 0, 50, 50, { tr: 20, tl: 20}, COLOR_DARK).setStrokeStyle(2, COLOR_LIGHT, 1),
					text: scene.add.text(0, 0, 'Active', {
						fontSize: '18pt'
					}),
					space: {
						left: 10
					}
				}),
				scene.rexUI.add.label({
					width: 150,
					height:40,
					background: scene.rexUI.add.roundRectangle(0, 0, 50, 50, {tr:20, tl:20}, COLOR_DARK).setStrokeStyle(2, COLOR_LIGHT, 1),
					text: scene.add.text(0, 0, 'Available', {
						fontSize: '18pt'
					}),
					space: {
						left: 10
					}
				})
			],
			
			// spacing
			space: {
				topButtonsOffset: 200,
				topButton: 4
			},
		});

        // not currently a prev button
        this.previous_button = null;

        // callbacks on the active/available buttons
        this.quest_list.on('button.click', function (button, groupName, index){
            // do nothing if the button is the same as the prev
            if (button === this.previous_button){
                return;
            }

            // ensure we are talking about the top buttons
			if (groupName !== 'top'){
				return;
			}

			// un-highlight the previous clicked button
			if (this.previous_button) {
				this.previous_button.getElement('background').setFillStyle(COLOR_DARK)
			}

			// save the button
			this.previous_button = button;
			
			// highlight the new clicked button
			button.getElement('background').setFillStyle(COLOR_PRIMARY);

            // todo, switch between active and available
			if (button.text === 'Active'){
				this.quest_list.getElement('panel').setItems(this.active_quests).scrollToTop();
			}
			else{
				this.quest_list.getElement('panel').setItems(this.available_quests).scrollToTop();
			}
        }, this);

        // callbacks for cell interactions
        this.quest_list.getElement('panel')
            .on('cell.click', function (cellContainer, cellIndex) {
                this.emit('quest_click', cellContainer.text);
            }, this)
            .on('cell.over', function (cellContainer, cellIndex) {
                cellContainer.getElement('background')
                    .setStrokeStyle(2, COLOR_LIGHT)
                    .setDepth(1);
            }, this)
            .on('cell.out', function (cellContainer, cellIndex) {
                cellContainer.getElement('background')
                    .setStrokeStyle(2, COLOR_DARK)
                    .setDepth(0);
            }, this);
			
		// simulate click on active
		this.quest_list.emitButtonClick('top', 0);
		this.add(this.quest_list, 0, 'center', 15, false);
		
		// add a close button
		this.buttons = scene.rexUI.add.buttons({
			orientation: 'x',
			buttons:[
				scene.rexUI.add.label({
					width: 200,
					height: 40,
					background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT).setStrokeStyle(2, this.COLOR_LIGHT, 1),
					text: scene.add.text(0, 0, 'Close', {
						fontSize: 24
					}),
					space: {
						left: 60,
						right: 0,
					}
				})
			]
		});
		this.add(this.buttons, 0, 'center', 15, false);

		
		// add the mouse events for the close button
		this.buttons
			.on('button.over', function(button, index, pointer, event){
				button.getElement('background').setFillStyle(this.COLOR_DARK);
				console.log('here');
			}, this)
			.on('button.out', function(button, index, pointer, event){
				button.getElement('background').setFillStyle(this.COLOR_LIGHT);
				console.log('here');
			}, this);
		
		
		// layout now
		this.layout();
    }
}