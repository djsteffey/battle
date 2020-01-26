const UPDATE_RATE = 100;

class SceneBattle extends Phaser.Scene {
	// construct me
	constructor(){
		// super me
		super({ key: 'SceneBattle' });

		// this is assuming the teams are passed in the constructor
		this.teams = [
			new Team([
				new Actor('djs 00'),
				new Actor('djs 01'),
				new Actor('djs 02')
			]),
			new Team([
				new Actor('other 00'),
				new Actor('other 01'),
				new Actor('other 02')
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
		this.team_renderers = [
			new TeamRendererLeft(this, this.teams[0]),
			new TeamRendererRight(this, this.teams[1])
		];

		// events
		this.team_renderers[0].on('on_ability_click', function(ability){
			// check if ability ready
			if (ability.get_is_ready()){
				// execute the ability
				ability.execute(this.teams[0], this.teams[1]);

				// global cooldown
				for (let i = 0; i < this.teams[0].actors[0].abilities.length; ++i){
					if (this.teams[0].actors[0].abilities[i] !== null){
						if (this.teams[0].actors[0].abilities[i].cooldown < 1000){
							this.teams[0].actors[0].abilities[i].set_cooldown(1000);
						}
					}
				}
			}
		}.bind(this));

		this.team_renderers[1].on('on_ability_click', function(ability){
			// check if ability ready
			if (ability.get_is_ready()){
				// execute the ability
				ability.execute(this.teams[1], this.teams[0]);

				// global cooldown
				for (let i = 0; i < this.teams[1].actors[0].abilities.length; ++i){
					if (this.teams[1].actors[0].abilities[i] !== null){
						if (this.teams[1].actors[0].abilities[i].cooldown < 1000){
							this.teams[1].actors[0].abilities[i].set_cooldown(1000);
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
			for (let i = 0; i < this.teams.length; ++i){
				this.teams[i].update(UPDATE_RATE);
			}
			for (let i = 0; i < this.team_renderers.length; ++i){
				this.team_renderers[i].update();
			}
		}

		// debug text
//		this.debug_text.setText(JSON.stringify(this.game.renderer));
	}
}
