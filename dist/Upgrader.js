"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upgrader = void 0;
var SpawnRoom_1 = require("./SpawnRoom");
var UpgraderStatus;
(function (UpgraderStatus) {
    UpgraderStatus[UpgraderStatus["none"] = 0] = "none";
    UpgraderStatus[UpgraderStatus["upgrading"] = 1] = "upgrading";
    UpgraderStatus[UpgraderStatus["harvest"] = 2] = "harvest";
})(UpgraderStatus || (UpgraderStatus = {}));
var Upgrader = (function () {
    function Upgrader() {
        this.roleType = SpawnRoom_1.SCREEP_TYPE.BULIDER;
        this.creep = SpawnRoom_1.SpawnRoom.ins.create(SpawnRoom_1.SCREEP_TYPE.BULIDER);
        this.name = this.creep.name;
        this.status = UpgraderStatus.harvest;
    }
    Upgrader.prototype.work = function () {
        if (this.status == UpgraderStatus.upgrading && this.creep.store[RESOURCE_ENERGY] == 0) {
            this.status = UpgraderStatus.harvest;
            this.creep.say('🔄 harvest');
        }
        if (this.status == UpgraderStatus.harvest && this.creep.store.getFreeCapacity() == 0) {
            this.status = UpgraderStatus.upgrading;
            this.creep.say('⚡ upgrade');
        }
        if (this.status == UpgraderStatus.upgrading) {
            if (this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(this.creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            var sources = this.creep.room.find(FIND_SOURCES);
            if (this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    };
    return Upgrader;
}());
exports.Upgrader = Upgrader;
