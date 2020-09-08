"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
var SpawnRoom_1 = require("./SpawnRoom");
var BuilderStatus;
(function (BuilderStatus) {
    BuilderStatus[BuilderStatus["none"] = 0] = "none";
    BuilderStatus[BuilderStatus["building"] = 1] = "building";
    BuilderStatus[BuilderStatus["harvest"] = 2] = "harvest";
})(BuilderStatus || (BuilderStatus = {}));
var Builder = (function () {
    function Builder() {
        this.roleType = SpawnRoom_1.SCREEP_TYPE.BULIDER;
        this.status = BuilderStatus.none;
        this.creep = SpawnRoom_1.SpawnRoom.ins.create(SpawnRoom_1.SCREEP_TYPE.BULIDER);
        this.name = this.creep.name;
        this.status = BuilderStatus.harvest;
    }
    Builder.prototype.work = function () {
        if (this.status == BuilderStatus.building && this.creep.store[RESOURCE_ENERGY] == 0) {
            this.status = BuilderStatus.harvest;
            this.creep.say('🔄 harvest');
        }
        if (this.status == BuilderStatus.harvest && this.creep.store.getFreeCapacity() == 0) {
            this.status = BuilderStatus.building;
            this.creep.say('🚧 build');
        }
        if (this.status == BuilderStatus.building) {
            var targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (this.creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else if (this.status == BuilderStatus.harvest) {
            var sources = this.creep.room.find(FIND_SOURCES);
            if (this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    };
    return Builder;
}());
exports.Builder = Builder;
