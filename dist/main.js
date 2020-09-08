"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoleController_1 = require("./RoleController");
module.exports.loop = function () {
    var cnt = RoleController_1.RoleController.ins.harverterCnt;
    if (cnt < 3) {
        RoleController_1.RoleController.ins.creatHarverter();
    }
    RoleController_1.RoleController.ins.harverterWork();
};
