class TeamData{
    constructor(actors_data){
        this.actors_data = actors_data;
    }

    update(delta_ms){
        for (let i = 0; i < this.actors_data.length; ++i){
            this.actors_data[i].update(delta_ms);
        }
    }
}