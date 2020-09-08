"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Harvester = void 0;
var SpawnRoom_1 = require("./SpawnRoom");
var Harvester = (function () {
    function Harvester() {
        this.roleType = SpawnRoom_1.SCREEP_TYPE.HARVESTER;
        this.creep = SpawnRoom_1.SpawnRoom.ins.create(SpawnRoom_1.SCREEP_TYPE.HARVESTER);
        this.name = this.creep.name;
    }
    Harvester.prototype.work = function () {
        if (!this.creep)
            return;
        if (this.creep.store.getFreeCapacity() > 0) {
            var sources = this.creep.room.find(FIND_SOURCES);
            if (this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            var targets = this.creep.room.find(FIND_STRUCTURES, {
                filter: function (structure) {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    };
    return Harvester;
}());
exports.Harvester = Harvester;
