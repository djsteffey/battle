class ActorData extends Phaser.Events.EventEmitter{
	constructor(name){
		super();
		
		this.name = name;
		this.stats = {
			hp: get_random_int(50, 80),
			hp_max: 100,
			speed: 1,
			initiative: 0
		}
		this.abilities = [
			new AbilityDataAttack(),
			null,
			null,
			new AbilityData('ability 01', 5000)
		];
		this.graphics_id = get_random_int(21, 38);
	}

	update(delta_ms){
		for (let i = 0; i < this.abilities.length; ++i){
			if (this.abilities[i] !== null){
				this.abilities[i].update(delta_ms);
			}
		}
	}

	damage(amount){
		this.stats.hp -= amount;
		if (this.stats.hp <= 0){
			this.stats.hp = 0;
			this.emit('death');
		}
		this.emit('damage', amount);
	}

	heal(amount){
		this.stats.hp += amount;
		if (this.stats.hp > this.stats.hp_max){
			this.stats.hp = this.stats.hp_max;
		}
		this.emit('heal', amount);
	}
}
