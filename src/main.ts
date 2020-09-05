import { create } from "lodash";
module.exports.loop = function(): void {
    findSources();
}


function findSources():void{
    const creep = Game.creeps['Harvester1'];
    if(creep.store.getFreeCapacity()>0){
        const sources = creep.room.find(FIND_SOURCES);    
        if(creep.harvest[sources[0] as any] == ERR_NOT_IN_RANGE){
            creep.moveTo(sources[0]);
        }
    }else{
        if(creep.transfer(Game.spawns['Spawn1'],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(Game.spawns['Spawn1']);            
        }
    }
    
}