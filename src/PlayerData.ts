import { map } from "lodash";

export class PlayerData{
    private static _ins:PlayerData;
    public static get ins():PlayerData {
        if(this._ins == null) this._ins = new PlayerData();
        return this.ins;
    }

    public spawnName = "Spawn1";
    creeps:Map<number,string> = new Map();        
    static spawnName: any;
}