const UPDATE_RATE = 100;

class MainScene extends Phaser.Scene {
	// construct me
	constructor(){
		// super me
		super({ key: 'MainScene' });
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
			"",
			{
				fontSize: "24px",
				fill: '#ff00ff',
				backgroundColor: '#808080',
				align: 'center'
			}
		);
		
        // teams
        this.teams = [
            new Team('team 00', [new Actor('djs 00'), new Actor('djs 00'), new Actor('djs 00')]),
            new Team('team 01', [new Actor('other 00'), new Actor('other 00'), new Actor('other 00')]),
        ];
        
		// renderers
		this.actor_renderers = [
            new ActorRenderer(this, 325, 224, this.teams[0].actors[0]),
            new ActorRenderer(this, 64, 100, this.teams[0].actors[1]),
            new ActorRenderer(this, 64, 348, this.teams[0].actors[2]),
            new ActorRenderer(this, 581, 224, this.teams[1].actors[0]),
            new ActorRenderer(this, 581, 224, this.teams[1].actors[1]),
            new ActorRenderer(this, 581, 224, this.teams[1].actors[2])
        ];

        // abilities bar
        this.abilities_bars = [
            new AbilitiesBar(this, 189, 512),
            new AbilitiesBar(this, 581, 512)
        ];

        // ability on bar 0 clicked
        this.abilities_bars[0].on('click', function(ability){
            if (ability.get_is_ready()){
                ability.execute(this.teams[0], this.teams[1]);
                for (let i = 0; i < this.abilities_bars[0].actor.abilities.length; ++i){
                    if (this.abilities_bars[0].actor.abilities[i] !== null){
                        if (this.abilities_bars[0].actor.abilities[i].cooldown < 1000){
                            this.abilities_bars[0].actor.abilities[i].set_cooldown(1000);
                        }
                    }
                }
            }
        }.bind(this));

        // ability on bar 1 clicked
        this.abilities_bars[1].on('click', function(ability){
            if (ability.get_is_ready()){
                ability.execute(this.teams[1], this.teams[0]);
                for (let i = 0; i < this.abilities_bars[1].actor.abilities.length; ++i){
                    if (this.abilities_bars[1].actor.abilities[i] !== null){
                        if (this.abilities_bars[1].actor.abilities[i].cooldown < 1000){
                            this.abilities_bars[1].actor.abilities[i].set_cooldown(1000);
                        }
                    }
                }
            }
        }.bind(this));
		this.abilities_bars[0].set_actor(this.teams[0].actors[0]);
        this.abilities_bars[1].set_actor(this.teams[1].actors[1]);
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
			for (let i = 0; i < this.actor_renderers.length; ++i){
				this.actor_renderers[i].update();
			}
			for (let i = 0; i < this.abilities_bars.length; ++i){
				this.abilities_bars[i].update();
			}
		}

		// debug text
//		this.debug_text.setText(JSON.stringify(this.game.renderer));
	}
}
