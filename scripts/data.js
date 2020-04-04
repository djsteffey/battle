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

class Battle{
	constructor(teams){
		this.teams = teams;
	}
}

class GameState{
	constructor(){
		this.teams = [];
		this.battles = [];
	}

	update(delta_ms){

	}
}

const DATA = {
	colors:{
		BUTTON_NORMAL: 0x123456,
		BUTTON_HOVER: 0x234567,
		BUTTON_HOVER_EDGE: 0xffffff
	},
	classes:[
		{
			name: 'Warrior',
			graphics_index: 22
		},
		{
			name: 'Mage',
			graphics_index: 23
		},
		{
			name: 'Rogue',
			graphics_index: 24
		},
	]
}