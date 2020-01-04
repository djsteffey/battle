class Actor{
	constructor(name){
		this.name = name;
		this.stats = {
			hp: 50,
			hp_max: 100,
			speed: 1,
			initiative: 0
		}
		this.abilities = [
			new Ability('ability 00', 1000),
			new Ability('ability 01', 2000),
			new Ability('ability 02', 3000)
		];
	}
	
	update(delta_ms){
		for (let i = 0; i < this.abilities.length; ++i){
			this.abilities[i].update(delta_ms);
		}
	}
}