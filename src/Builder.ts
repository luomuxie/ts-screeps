import { SCREEP_TYPE, SpawnRoom } from "./SpawnRoom";
enum BuilderStatus{
    none = 0,
    building,
    harvest    
}

export class Builder implements Role {
    creep: Creep;
    name:string;
    id:number    
    roleType = SCREEP_TYPE.BULIDER;
    status = BuilderStatus.none;
    constructor(){
        this.creep = SpawnRoom.ins.create(SCREEP_TYPE.BULIDER);
        this.name = this.creep.name;
        this.status = BuilderStatus.harvest;
    }

    work(): void {
        if(this.status == BuilderStatus.building && this.creep.store[RESOURCE_ENERGY] == 0) {
            this.status = BuilderStatus.harvest;
            this.creep.say('🔄 harvest');
	    }
	    if(this.status == BuilderStatus.harvest && this.creep.store.getFreeCapacity() == 0) {
	        this.status = BuilderStatus.building;
	        this.creep.say('🚧 build');
	    }

	    if(this.status == BuilderStatus.building) {
	        var targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(this.creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else if(this.status == BuilderStatus.harvest) {
	        var sources = this.creep.room.find(FIND_SOURCES);
            if(this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
    }

}