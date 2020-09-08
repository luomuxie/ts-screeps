import { map } from "lodash";
import { PlayerData } from "./PlayerData";
//产房
export enum SCREEP_TYPE{
    HARVESTER="Harvester",
    GRUAPUPER="Upgrader",
    BULIDER = "Builder"

}

interface MemoryData{
    type:string;
}
export class SpawnRoom{

    private static _ins:SpawnRoom;
    public static get ins():SpawnRoom {
        if(this._ins == null) this._ins = new SpawnRoom();
        return this.ins;
    }

    private creatScreep():string{
        const newName = SCREEP_TYPE.HARVESTER + Game.time;        
        const isSuc = Game.spawns[PlayerData.ins.spawnName].spawnCreep([WORK,CARRY,MOVE], newName);
        if(isSuc === 0)  return newName
        return "";         
    }

    create(type:SCREEP_TYPE):Creep{
        const name = this.creatScreep()
        if(!name)  return;
        const creep = Game.creeps[name]
        const vo:MemoryData = {
            type
        }
        //creep.memory = vo;
        return creep;
    }
}