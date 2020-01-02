class ActorRenderer extends Phaser.GameObjects.Container{
	constructor(scene, x, y, actor){
		// super me
		super(scene, x, y);
		scene.add.existing(this);
		
		// save the actor
		this.actor = actor;
		
		// sprite for the actor
		this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, 'actors', 30);
		this.sprite.setOrigin(0, 0);
		this.sprite.setDisplaySize(24 * 4, 24 * 4);
		this.sprite.setFlip(true, false);
		this.scene.add.existing(this.sprite);
		this.add(this.sprite);
		
		// progress bar for hp
		this.hp_bar = new ProgressBar(scene, 0, 24, 48*2, 24, 2, '18px', this.actor.stats.hp, this.actor.stats.hp_max);
		this.add(this.hp_bar);
	}

	
	update(){
		this.hp_bar.update();
	}
}