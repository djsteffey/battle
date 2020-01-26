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
<<<<<<< HEAD
		this.load.spritesheet('actors', 'assets/entities_24x24.png', { frameWidth: 24, frameHeight: 24 });
	
		// ability icons
		this.load.spritesheet('icons', 'assets/icons.png', { frameWidth: 32, frameHeight: 32 });
=======
        this.load.spritesheet('actors', 'assets/entities_24x24.png', { frameWidth: 24, frameHeight: 24 });

        // ability icons
        this.load.spritesheet('icons', 'assets/icons.png', { frameWidth: 32, frameHeight: 32 });
>>>>>>> 2fcdc92bf250c244d0a674cf065a2623fa3b4957
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
		
<<<<<<< HEAD
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
=======
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
>>>>>>> 2fcdc92bf250c244d0a674cf065a2623fa3b4957
                        }
                    }
                }
            }
<<<<<<< HEAD
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
=======
        }.bind(this));

        // ability on bar 1 clicked
        this.abilities_bars[1].on('click', function(ability){
            if (ability.get_is_ready()){
                ability.execute(this.teams[1], this.teams[0]);
                for (let i = 0; i < this.abilities_bars[1].actor.abilities.length; ++i){
                    if (this.abilities_bars[1].actor.abilities[i] !== null){
                        if (this.abilities_bars[1].actor.abilities[i].cooldown < 1000){
                            this.abilities_bars[1].actor.abilities[i].set_cooldown(1000);
>>>>>>> 2fcdc92bf250c244d0a674cf065a2623fa3b4957
                        }
                    }
                }
            }
<<<<<<< HEAD
		}.bind(this));
    }
=======
        }.bind(this));
		this.abilities_bars[0].set_actor(this.teams[0].actors[0]);
        this.abilities_bars[1].set_actor(this.teams[1].actors[1]);
	}
>>>>>>> 2fcdc92bf250c244d0a674cf065a2623fa3b4957
	
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
			
<<<<<<< HEAD
			// update teams
			this.teams_data[0].update(UPDATE_RATE, this.teams_data[1]);
			this.teams_data[1].update(UPDATE_RATE, this.teams_data[0]);

			// update the rendering
			for (let i = 0; i < this.teams_renderer.length; ++i){
				this.teams_renderer[i].update();
=======
            // update teams
			for (let i = 0; i < this.teams.length; ++i){
				this.teams[i].update(UPDATE_RATE);
			}
			for (let i = 0; i < this.actor_renderers.length; ++i){
				this.actor_renderers[i].update();
			}
			for (let i = 0; i < this.abilities_bars.length; ++i){
				this.abilities_bars[i].update();
>>>>>>> 2fcdc92bf250c244d0a674cf065a2623fa3b4957
			}
		}

		// debug text
//		this.debug_text.setText(JSON.stringify(this.game.renderer));
	}
}
