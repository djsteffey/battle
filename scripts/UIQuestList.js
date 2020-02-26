class CUiQuestListContainer extends RexPlugins.UI.ScrollablePanel{
    constructor(scene){
        super(
            scene,
            {
                
            }
        )
    }
}

class UiQuestList extends RexPlugins.UI.Tabs {
    constructor(scene, active_quests, available_quests) {
        super(
            scene,
            {
                // location of the list
                x: 400,
                y: 300,

                // main panel
                panel: scene.rexUI.add.gridTable({
                    // panel background
                    background: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

                    // table characteristics
                    table: {
                        width: 600,
                        height: 400,
                        cellWidth: 120,
                        cellHeight: 60,
                        columns: 1,
                        mask: {
                            padding: 2,
                        },
                    },

                    // slider characteristics
                    slider: {
                        track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
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
                            text: scene.add.text(0, 0, item.id),

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
						background: scene.rexUI.add.roundRectangle(0, 0, 50, 50, { tr: 20, tl: 20}, COLOR_DARK),
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
						background: scene.rexUI.add.roundRectangle(0, 0, 50, 50, {tr:20, tl:20}, COLOR_DARK),
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

        // save the active quests
        this.active_quests = active_quests;

        // not currently a prev button
        this.m_prevTypeButton = null;

        // callbacks on the active/available buttons
        this.on('button.click', function (button, groupName, index){
            // do nothing if the button is the same as the prev
            if (button === this._prevTypeButton){
                return;
            }

            // ensure we are talking about the top buttons
            switch (groupName) {                    
                case 'top':
                    // un-highlight the previous clicked button
                    if (this._prevTypeButton) {
                        this._prevTypeButton.getElement('background').setFillStyle(COLOR_DARK)
                    }

                    // highlight the new clicked button
                    button.getElement('background').setFillStyle(COLOR_PRIMARY);

                    // save the button
                    this._prevTypeButton = button;
                    break;
            }

            // todo, switch between active and available
            var items = this.active_quests
            this.getElement('panel').setItems(items).scrollToTop();
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
    }
}