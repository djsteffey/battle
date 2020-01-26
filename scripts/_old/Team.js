class Team{
    constructor(name, actors){
        this.name = name;
        this.actors = actors;
    }

    update(delta_ms){
        for (let i = 0; i < this.actors.length; ++i){
            this.actors[i].update(delta_ms);
        }
    }
}