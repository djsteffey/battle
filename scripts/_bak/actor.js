class Actor extends Phaser.Events.EventEmitter{
	constructor(name){
		super();
		this.name = name;
		this.stats = {
			hp: 75,
			hp_max: 100
		}
		this.abilities = [
			new AbilityAttack(),
			new AbilityHeal(),
			null,
			new Ability('swap', 5000)
		];
		this.graphics_id = get_random_int(21, 30);
	}

	damage(amount){
		this.stats.hp -= amount;
		this.emit('on_damage', amount);
		if (this.stats.hp <= 0){
			this.stats.hp = 0;
			this.emit('on_death');
		}
	}

	heal(amount){
		this.stats.hp += amount;
		this.emit('on_heal', amount);
		if (this.stats.hp > this.stats.hp_max){
			this.stats.hp = this.stats.hp_max;
		}
	}

	update(delta_ms){
		for (let i = 0; i < this.abilities.length; ++i){
			if (this.abilities[i] !== null){
				this.abilities[i].update(delta_ms);
			}
		}
	}
}

class Team{
	constructor(actors){
		this.actors = actors;
	}

	update(delta_ms){
		for (let i = 0; i < this.actors.length; ++i){
			this.actors[i].update(delta_ms);
		}
	}
}