// create the game
new Phaser.Game({
	width: 1066,
	height: 600,
	backgroundColor: '#000000',
	pixelArt: true,
	scene: [new MainScene()],
	parent: 'game'
});

