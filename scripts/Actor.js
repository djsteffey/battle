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
			null,
			new Ability('ability 00', 1000),
			new Ability('ability 01', 5000)
		];
	}
	
	update(delta_ms){
		// update all the abilities
		for (let i = 0; i < this.abilities.length; ++i){
			if (this.abilities[i] !== null){
				this.abilities[i].update(delta_ms);
			}
		}

		// todo make better ai
        // find the first ability that is ready and execute it
        let r = get_random_int(0, 3);
        if (this.abilities[r] !== null){
            if (this.abilities[r].get_is_ready()){
                this.abilities[r].execute();
            }
        }
/*		if (get_random_int(0, 100) < 10){
			for (let i = 0; i < this.abilities.length; ++i){
				if (this.abilities[i] !== null){
					if (this.abilities[i].get_is_ready()){
						this.abilities[i].execute();
						break;
					}
				}
			}
		}*/
	}
}