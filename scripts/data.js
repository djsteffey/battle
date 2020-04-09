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
	],
	skills:[
		{
			name: 'Attack',
			graphics_index: 1,
			cooldown: 0,
			execute(scene, actor, friendly_team, enemy_team){
				enemy_team.actors[0].damage(1);
			}
		},
		{
			name: 'Heal',
			graphics_index: 1,
			cooldown: 3,
			execute(scene, actor, friendly_team, enemy_team){
				enemy_team.actors[0].heal(1);
			}
		}
	]
}