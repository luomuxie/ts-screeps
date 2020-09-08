import { map } from "lodash";
import { PlayerData } from "./PlayerData";
//产房
export enum SCREEP_TYPE{
    HARVESTER="Harvester",
    GRUAPUPER="Upgrader1",
    BULIDER = "Builder"

}

interface MemoryData{
    type:string;
}
export class spawnRoom{
    creatScreep():string{
        const newName = SCREEP_TYPE.HARVESTER + Game.time;        
        const isSuc = Game.spawns[PlayerData.ins.spawnName].spawnCreep([WORK,CARRY,MOVE], newName);
        if(isSuc === 0)  return newName
        return "";         
    }

    create(type:SCREEP_TYPE):void{
        const name = this.creatScreep()
        if(!name)  return;
        const creep = Game.creeps[name]
        const vo:MemoryData = {
            type
        }
        creep.memory = vo;
    }
}