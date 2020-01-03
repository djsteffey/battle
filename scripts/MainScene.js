class MainScene extends Phaser.Scene {
	// construct me
	constructor(){
		// super me
		super({ key: 'MainScene' });
	}

	preload() {
		// load the actors sprite sheet
		this.load.spritesheet('actors', 'assets/entities_24x24.png', { frameWidth: 24, frameHeight: 24 });
	}

	create() {
		// track for delta time
		this.last_time = new Date();
		this.delta_time = 0;

		// debug text
		this.debug_text = this.add.text(
			0,
			0,
			"",
			{
				fontSize: "24px",
				fill: '#ff00ff',
				backgroundColor: '#808080',
				align: 'center'
			}
		);
		
		// actors
		this.actors = [
            new Actor('djs 00'),
            new Actor('other 00')
		];
		
		// renderers
		this.actor_renderers = [
            new ActorRenderer(this, 325, 224, this.actors[0]),
            new ActorRenderer(this, 64, 100, this.actors[0]),
            new ActorRenderer(this, 64, 348, this.actors[0]),
            new ActorRenderer(this, 581, 224, this.actors[1]),
            new ActorRenderer(this, 581, 224, this.actors[1]),
            new ActorRenderer(this, 581, 224, this.actors[1])
        ];

        // abilities bar
        this.abilities_bars = [
            new AbilitiesBar(this, 189, 512),
            new AbilitiesBar(this, 581, 512)
        ];
	}
	
	update() {
		// get the delta time
		const now_time = new Date();
		this.delta_time += (now_time - this.last_time);
		this.last_time = now_time;

		// update every 1000 ms
		if (this.delta_time >= 1000){
			// clear delta
			this.delta_time = 0;
			
			// update actors
			for (let i = 0; i < this.actors.length; ++i){
				this.actors[i].update();
			}
			for (let i = 0; i < this.actor_renderers.length; ++i){
				this.actor_renderers[i].update();
			}
		}

		// debug text
		this.debug_text.setText('debug text');
	}
}
