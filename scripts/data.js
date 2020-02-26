class Item{
	constructor(name){
		this.name = name;
	}
}

class Armor extends Item{
	constructor(name){
		super(name);
	}
}

class Weapon extends Item{
	constructor(name){
		super(name);
	}
}

class Ability{
	constructor(name){
		this.name = name;
	}
}

class Actor{
	constructor(name){
		this.name = name;
		this.abilities = [];
		this.weapon = null;
		this.armor = null;
	}
}

class Team{
	constructor(actors){
		this.actors = actors;
	}
}

class Quest{
	constructor(name, duration, difficulty, reward, time_to_accept){
		this.name = name;
		this.initial_duration = duration;
		this.duration = duration;
		this.difficulty = difficulty;
		this.reward = reward;
		this.time_to_accept = time_to_accept;
		this.in_progress = false;
	}

	update(delta_ms){
		if (this.in_progress){
			this.duration -= delta_ms;
			if (this.duration <= 0){
				// complete
			}		
		}
		else{
			this.time_to_accept -= delta_ms;
			if (this.time_to_accept <= 0){
				// out of time
			}
		}
	}

	begin(){
		this.in_progress = true;
	}
}

class Kingdom{
	constructor(){
		this.actors = [];
		this.teams = [];
		this.available_quests = [];
		this.active_quests = [];
	}

	update(delta_ms){

	}
}

class System{
	constructor(){
		this.kingdoms = [];
	}
}