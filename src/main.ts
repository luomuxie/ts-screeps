import { create } from "lodash";
import { RoleController } from "./RoleController";
module.exports.loop = function(): void {
    const cnt = RoleController.ins.harverterCnt;
    if(cnt<3){
        RoleController.ins.creatHarverter();
    }    
    RoleController.ins.harverterWork();
}
