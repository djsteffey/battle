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
		// create our kingdom
		this.my_kingdom = new Kingdom();
		for (let i = 0; i < 24; ++i){
			this.my_kingdom.active_quests.push(new Quest('active quest ' + i, 10000, 1, null, 10000));
		}
		for (let i = 0; i < 24; ++i){
			this.my_kingdom.available_quests.push(new Quest('available quest ' + i, 10000, 1, null, 10000));
		}
		var ql = new UiQuestListContainer(this, this.my_kingdom.active_quests, this.my_kingdom.available_quests);
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

