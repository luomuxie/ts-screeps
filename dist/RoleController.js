"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
var SpawnRoom_1 = require("./SpawnRoom");
var Harvester_1 = require("./Harvester");
var RoleController = (function () {
    function RoleController() {
        this.harverterCnt = 3;
        this.roleMap = new Map();
    }
    Object.defineProperty(RoleController, "ins", {
        get: function () {
            if (this._ins == null)
                this._ins = new RoleController();
            return this.ins;
        },
        enumerable: false,
        configurable: true
    });
    RoleController.prototype.getRoleCntByType = function (type) {
        var roles = this.roleMap.get(type);
        return roles ? roles.length : 0;
    };
    RoleController.prototype.creatHarverter = function () {
        var cnt = this.getRoleCntByType(SpawnRoom_1.SCREEP_TYPE.HARVESTER);
        var roles = this.roleMap.get(SpawnRoom_1.SCREEP_TYPE.HARVESTER);
        if (!roles)
            roles = [];
        var har = new Harvester_1.Harvester();
        if (har.creep) {
            roles.push(har);
        }
        this.roleMap.set(SpawnRoom_1.SCREEP_TYPE.HARVESTER, roles);
    };
    RoleController.prototype.harverterWork = function () {
        var roles = this.roleMap.get(SpawnRoom_1.SCREEP_TYPE.HARVESTER);
        roles.forEach(function (vo) {
            vo.work();
        });
    };
    return RoleController;
}());
exports.RoleController = RoleController;
