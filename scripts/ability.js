class Ability{
	constructor(name, cooldown){
		this.name = name;
		this.cooldown = cooldown;
		this.cooldown_remaining = this.cooldown;
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
}