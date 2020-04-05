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
	constructor(clazz_index){
		this.clazz = DATA.clazzes[clazz_index];
		this.abilities = [];
		this.weapon = null;
		this.armor = null;
		this.stats = {
			base:{
				hp: this.clazz.health,
				hp_max: this.clazz.health,
				speed: this.clazz.speed,
				power: this.clazz.power
			},
			effective:{
				hp: 0,
				hp_max: 0,
				speed: 0,
				power: 0
			}
		}
		this.recompute_effective_stats();
	}
	
	recompute_effective_stats(){
		this.stats.effective.hp = this.stats.base.hp;
		this.stats.effective.hp_max = this.stats.base.hp_max;
		this.stats.effective.speed = this.stats.base.speed;
		this.stats.effective.power = this.stats.base.power;
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
	clazzes:[
		{
			name: 'Warrior',
			graphics_index: 22,
			health: 10,
			speed: 1,
			power: 3
		},
		{
			name: 'Mage',
			graphics_index: 23,
			health: 7,
			speed: 2,
			power: 2
		},
		{
			name: 'Rogue',
			graphics_index: 24,
			health: 8,
			speed: 3,
			power: 1
		},
	]
}