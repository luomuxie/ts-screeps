import { SCREEP_TYPE } from "./SpawnRoom";
import { Harvester } from "./Harvester";

export class RoleController{


    private static _ins:RoleController;
    public harverterCnt = 3;
    public static get ins():RoleController {
        if(this._ins == null) this._ins = new RoleController();
        return this.ins;
    }

    private roleMap:Map<SCREEP_TYPE,Array<Role>> = new Map();
    
    public getRoleCntByType(type:SCREEP_TYPE):number{
        const roles = this.roleMap.get(type)
        return roles?roles.length:0;
    }

    public creatHarverter():void{
        const cnt = this.getRoleCntByType(SCREEP_TYPE.HARVESTER)
        let roles = this.roleMap.get(SCREEP_TYPE.HARVESTER)
        if(!roles) roles = []
        const har = new Harvester();
        if(har.creep){
            roles.push(har);
        }
        this.roleMap.set(SCREEP_TYPE.HARVESTER,roles);
    }

    public harverterWork():void{
        let roles = this.roleMap.get(SCREEP_TYPE.HARVESTER);
        roles.forEach((vo)=>{
            vo.work();
        })
    }
}