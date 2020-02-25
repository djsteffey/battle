const Random = Phaser.Math.Between;

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const UPDATE_RATE = 100;

class SceneMain extends Phaser.Scene {
	// construct me
	constructor(){
		// super me
		super({ key: 'SceneMain' });
	}

	preload() {

	}

    create() {
        this.print = this.add.text(0, 0, '');
      
        var db = createDataBase(100);

		var tabs = new UiQuestList(this, db, null);
		this.add.existing(tabs);
		/*
        var tabs = this.rexUI.add.tabs({
                x: 400,
                y: 300,

                panel: this.rexUI.add.gridTable({
                    background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

                    table: {
                        width: 600,
                        height: 400,

                        cellWidth: 120,
                        cellHeight: 60,
                        columns: 2,                     
                        mask: {
                            padding: 2,
                        },
                    },

                    slider: {
                        track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                        thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
                    },
                  
                    // scroller: true,

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
                                text: scene.add.text(0, 0, item.id),

                                space: {
                                    icon: 10,
                                    left: 15
                                }
                            });
                    },
                }),

                leftButtons: [
                    createButton(this, 2, 'AA'),
                    createButton(this, 2, 'BB'),
                    createButton(this, 2, 'CC'),
                    createButton(this, 2, 'DD'),
                ],

                rightButtons: [
                    createButton(this, 0, '+'),
                    createButton(this, 0, '-'),
				],
				
				topButtons:[
					this.rexUI.add.label({
						width: 150,
						height:40,
						background: this.rexUI.add.roundRectangle(0, 0, 50, 50, { tr: 20, tl: 20}, COLOR_DARK),
						text: this.add.text(0, 0, 'Active', {
							fontSize: '18pt'
						}),
						space: {
							left: 10
						}
					}),
					this.rexUI.add.label({
						width: 150,
						height:40,
						background: this.rexUI.add.roundRectangle(0, 0, 50, 50, {tr:20, tl:20}, COLOR_DARK),
						text: this.add.text(0, 0, 'Available', {
							fontSize: '18pt'
						}),
						space: {
							left: 10
						}
					})
				],

				

                space: {
                    leftButtonsOffset: 20,
					rightButtonsOffset: 30,
					topButtonsOffset: 200,
					topButton: 4,

                    leftButton: 1,
                },
            })
            .layout()*/
        //.drawBounds(this.add.graphics(), 0xff0000);
/*
        tabs
            .on('button.click', function (button, groupName, index) {
                switch (groupName) {
                    case 'left':
                        // Highlight button
                        if (this._prevTypeButton) {
                            this._prevTypeButton.getElement('background').setFillStyle(COLOR_DARK)
                        }
                        button.getElement('background').setFillStyle(COLOR_PRIMARY);
                        this._prevTypeButton = button;
                        if (this._prevSortButton === undefined) {
                            return;
                        }
                        break;

                    case 'right':
                        // Highlight button
                        if (this._prevSortButton) {
                            this._prevSortButton.getElement('background').setFillStyle(COLOR_DARK)
                        }
                        button.getElement('background').setFillStyle(COLOR_PRIMARY);
                        this._prevSortButton = button;
                        if (this._prevTypeButton === undefined) {
                            return;
                        }
						break;
						
						case 'top':
							button.getElement('background').setFillStyle(COLOR_PRIMARY);
							break;

                }

                // Load items into grid table
				var items = db
				/*
                    .chain()
                    .find({
                        type: this._prevTypeButton.text
                    })
                    .simplesort('id', {
                        desc: (this._prevSortButton.text === '-') // sort descending
                    })
                    .data();
                this.getElement('panel').setItems(items).scrollToTop();
            }, tabs);

        // Grid table
        tabs.getElement('panel')
            .on('cell.click', function (cellContainer, cellIndex) {
                this.print.text += cellIndex + ': ' + cellContainer.text + '\n';
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
			*/
		tabs.on('quest_click', function(text){
			this.print.text += text + '\n';
		}, this);
      
        tabs.emitButtonClick('top', 0);
    }	
	
	update() {
	}
}

var createDataBase = function (count) {
    var TYPE = ['AA', 'BB', 'CC', 'DD'];
    // Create the database
/*    var db = new loki();
    // Create a collection
    var items = db.addCollection('items');
    // Insert documents
    for (var i = 0; i < count; i++) {
        items.insert({
            type: TYPE[i % 4],
            id: i,
            color: Random(0, 0xffffff)
        });
	}*/
	var items = [];
    // Insert documents
    for (var i = 0; i < count; i++) {
        items.push({
            type: TYPE[i % 4],
            id: i,
            color: Random(0, 0xffffff)
        });
	}

    return items;
};

var createButton = function (scene, direction, text) {
    var radius;
    switch (direction) {
        case 0: // Right
            radius = {
                tr: 20,
                br: 20
            }
            break;
        case 2: // Left
            radius = {
                tl: 20,
                bl: 20
            }
            break;
	}
	var label = scene.rexUI.add.label({
        width: 50,
        height:40,
        background: scene.rexUI.add.roundRectangle(0, 0, 50, 50, radius, COLOR_DARK),
        text: scene.add.text(0, 0, text, {
			fontSize: '18pt',
			align: 'center'
        }),
        space: {
            left: 10
        }
	});
//	label.getElement('text').setOrigin(0.5);
	return label;
}

