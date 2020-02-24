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
	constructor(name, duration, difficulty){
		this.name = name;
		this.duration = duration;
		this.difficulty;
	}
}

class Kingdom{
	constructor(){
		this.actors = [];
		this.teams = [];
		this.quests = [];
		
		
	}
}