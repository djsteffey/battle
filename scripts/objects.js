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
	constructor(skill_index){
        this.skill = DATA.skills[skill_index];
        this.cooldown_remaining = 4;
        this.is_ready = true;
    }
    
    decrement_cooldown_remaining(){
        this.cooldown_remaining -= 1;
        if (this.cooldown_remaining <= 0){
            this.cooldown_remaining = 0;
            this.is_ready = true;
        }
    }

    execute(scene, actor, friendly_team, enemy_team){
        this.skill.execute(scene, actor, friendly_team, enemy_team);
    }
}

class Actor{
	constructor(clazz_index){
		this.clazz = DATA.clazzes[clazz_index];
		this.abilities = [
            new Ability(0),
            new Ability(0),
            new Ability(0)
        ];
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
    
    damage(amount){
        this.stats.effective.hp -= amount;
    }

    heal(amount){
        this.stats.effective.hp += amount;
    }
}

class Team{
	constructor(actors){
		this.actors = actors;
	}
}
