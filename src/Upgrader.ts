import { SCREEP_TYPE, SpawnRoom } from "./SpawnRoom";
enum UpgraderStatus{
    none = 0,
    upgrading,
    harvest    
}
export class Upgrader implements role {
    status:UpgraderStatus;
    creep: Creep;
    name:string;
    id:number    
    roleType = SCREEP_TYPE.BULIDER;    
    constructor(){
        this.creep = SpawnRoom.ins.create(SCREEP_TYPE.BULIDER);
        this.name = this.creep.name;
        this.status = UpgraderStatus.harvest;
    }

    work(): void {
        if(this.status == UpgraderStatus.upgrading && this.creep.store[RESOURCE_ENERGY] == 0) {
            this.status = UpgraderStatus.harvest;
            this.creep.say('🔄 harvest');
	    }
	    if(this.status == UpgraderStatus.harvest && this.creep.store.getFreeCapacity() == 0) {
	        this.status = UpgraderStatus.upgrading
	        this.creep.say('⚡ upgrade');
	    }

	    if(this.status == UpgraderStatus.upgrading) {
            if(this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(this.creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            //这里可以优化为查找最近的能量todo
            const sources = this.creep.room.find(FIND_SOURCES);
            if(this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}