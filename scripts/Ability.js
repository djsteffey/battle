class Ability{
	constructor(name, cooldown){
		this.name = name;
		this.cooldown = cooldown;
		this.cooldown_max = cooldown;
	}
	
	update(delta_ms){
		// update the cooldown based on passed time
		this.cooldown = Math.max(0, this.cooldown - delta_ms);
	}
	
	get_ready_percent(){
		// this is like a ready percentage
		return (this.cooldown === 0) ? 1 : (this.cooldown_max - this.cooldown) / this.cooldown_max;
	}
}