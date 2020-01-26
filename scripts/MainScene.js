const UPDATE_RATE = 100;

class MainScene extends Phaser.Scene {
	// construct me
	constructor(){
		// super me
		super({ key: 'MainScene' });

		// this is assuming the teams are passed in the constructor
		this.teams_data = [
			new TeamData([
				new ActorData('djs 00'),
				new ActorData('djs 01'),
				new ActorData('djs 02')
			]),
			new TeamData([
				new ActorData('other 00'),
				new ActorData('other 01'),
				new ActorData('other 02')
			])
		];
	}

	preload() {
		// load the actors sprite sheet
		this.load.spritesheet('actors', 'assets/entities_24x24.png', { frameWidth: 24, frameHeight: 24 });
	
		// ability icons
		this.load.spritesheet('icons', 'assets/icons.png', { frameWidth: 32, frameHeight: 32 });
	}

	create() {
		// track for delta time
		this.last_time = new Date();
		this.accumulated_delta_ms = 0;

		// debug text
		this.debug_text = this.add.text(
			0,
			0,
			'',
			{
				fontSize: '24px',
				fill: '#ff00ff',
				backgroundColor: '#808080',
				align: 'center'
			}
		);
		
		// renderers
		this.teams_renderer = [
			new TeamRendererLeft(this, this.teams_data[0]),
			new TeamRendererRight(this, this.teams_data[1])
		];

		// listen for ability clicks
		this.teams_renderer[0].on('ability_click', function(ability_data){
			if (ability_data.get_is_ready()){
				// execute the ability
				ability_data.execute(this.teams_data[0], this.teams_data[1]);
				
				// implement global cooldown
                for (let i = 0; i < this.teams_data[0].actors_data[0].abilities.length; ++i){
                    if (this.teams_data[0].actors_data[0].abilities[i] !== null){
                        if (this.teams_data[0].actors_data[0].abilities[i].cooldown < 1000){
                            this.teams_data[0].actors_data[0].abilities[i].set_cooldown(1000);
                        }
                    }
                }
            }
		}.bind(this));
		this.teams_renderer[1].on('ability_click', function(ability_data){
			if (ability_data.get_is_ready()){
				// execute the ability
				ability_data.execute(this.teams_data[1], this.teams_data[0]);
				
				// implement global cooldown
                for (let i = 0; i < this.teams_data[1].actors_data[0].abilities.length; ++i){
                    if (this.teams_data[1].actors_data[0].abilities[i] !== null){
                        if (this.teams_data[1].actors_data[0].abilities[i].cooldown < 1000){
                            this.teams_data[1].actors_data[0].abilities[i].set_cooldown(1000);
                        }
                    }
                }
            }
		}.bind(this));
    }
	
	update() {
		// get the delta time
		const now_time = new Date();
		const delta_ms = (now_time - this.last_time);
		this.accumulated_delta_ms += delta_ms;
		this.last_time = now_time;

		// update every UPDATE_RATE ms
		while (this.accumulated_delta_ms >= UPDATE_RATE){
			// clear delta
			this.accumulated_delta_ms -= UPDATE_RATE;
			
			// update teams
			this.teams_data[0].update(UPDATE_RATE, this.teams_data[1]);
			this.teams_data[1].update(UPDATE_RATE, this.teams_data[0]);

			// update the rendering
			for (let i = 0; i < this.teams_renderer.length; ++i){
				this.teams_renderer[i].update();
			}
		}

		// debug text
		this.debug_text.setText('debug text');
	}
}
