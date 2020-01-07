class Ability{
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

class AbilityAttack extends Ability{
	constructor(){
		super('Attack', 2000);
	}

	execute(friendly_team, enemy_team){
		super.execute();

		// todo damage the lead of the other team

	}
}