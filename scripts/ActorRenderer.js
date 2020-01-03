class ActorRenderer extends Phaser.GameObjects.Container{
	constructor(scene, x, y, actor){
		// super me
		super(scene, x, y);
		scene.add.existing(this);
		
		// save the actor
		this.actor = actor;
		
		// sprite for the actor
		this.sprite = new Phaser.GameObjects.Sprite(scene, 80, 104, 'actors', 30);
		this.sprite.setOrigin(.5, 1);
		this.sprite.setDisplaySize(24 * 4, 24 * 4);
		this.sprite.setFlip(true, false);
		this.scene.add.existing(this.sprite);
        this.add(this.sprite);
        
        // tween the sprite
        this.scene.tweens.add({
            targets: [this.sprite],
            scaleY: 4.25,
            ease: 'Linear',
            duration: 350,
            yoyo: true,
            repeat: -1,
            callbackScope: this
        });
		
		// progress bar for hp
		this.hp_bar = new ProgressBar(scene, 8, 112, 144, 32, 2, '24px', this.actor.stats.hp, this.actor.stats.hp_max);
		this.add(this.hp_bar);
	}

	
	update(){
		this.hp_bar.update();
	}
}