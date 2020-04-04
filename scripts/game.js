// our game state
const game_state = new GameState();

// create the game
new Phaser.Game({
	width: 1066,
	height: 600,
	backgroundColor: '#000000',
	pixelArt: true,
	scene: [new SceneMain(), new SceneBattle(), new SceneTeamSelect()],
	parent: 'canvas',
	plugins: {
		scene: [
			{
				key: 'rexUI',
                plugin: rexuiplugin,
                mapping: 'rexUI'
			}
		]
	}
});
