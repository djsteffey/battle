class AbilityData{
	constructor(name, cooldown){
		this.name = name;
		this.cooldown = cooldown;
		this.cooldown_max = cooldown;
		this.is_ready = false;
	}
	
	update(delta_ms){
		// update the cooldown based on passed time
		if (this.is_ready === false){
			if (this.cooldown === 0){
				this.is_ready = true;
			}
			else{
				this.cooldown = Math.max(0, this.cooldown - delta_ms);
			}
		}
	}
	
	get_ready_percent(){
		// this is like a ready percentage
		return (this.cooldown === 0) ? 1 : (this.cooldown_max - this.cooldown) / this.cooldown_max;
	}

	execute(friendly_team, enemy_team){
		// for the base just reset the cooldown
		this.cooldown = this.cooldown_max;
		this.is_ready = false;
	}

	get_is_ready(){
		return this.is_ready;
    }
    
    set_cooldown(cooldown){
        this.cooldown = cooldown;
        this.is_ready = false;
    }
}

class AbilityDataAttack extends AbilityData{
	constructor(){
		super('Attack', 1000);
	}

	execute(friendly_team, enemy_team){
		super.execute();

		// todo damage the lead of the other team
<<<<<<< HEAD:scripts/AbilityData.js
		enemy_team.actors_data[0].damage(1);
	}
}

class AbilityDataSwap extends AbilityData{
=======
        enemy_team[0].stats.hp -= 1;
	}
}

class AbilitySwap extends Ability{
>>>>>>> 2fcdc92bf250c244d0a674cf065a2623fa3b4957:scripts/Ability.js
    constructor(){
        super('Swap', 5000);
    }

    execute(friendly_team, enemy_team){
        super.execute();

        // swap lead with one of the others
        let temp = friendly_team.actors[0];
        friendly_team.actors[0] = friendly_team.actors[1];
        friendly_team.actors[1] = temp;
    }
}