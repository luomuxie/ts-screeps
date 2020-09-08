"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpawnRoom = exports.SCREEP_TYPE = void 0;
var PlayerData_1 = require("./PlayerData");
var SCREEP_TYPE;
(function (SCREEP_TYPE) {
    SCREEP_TYPE["HARVESTER"] = "Harvester";
    SCREEP_TYPE["GRUAPUPER"] = "Upgrader";
    SCREEP_TYPE["BULIDER"] = "Builder";
})(SCREEP_TYPE = exports.SCREEP_TYPE || (exports.SCREEP_TYPE = {}));
var SpawnRoom = (function () {
    function SpawnRoom() {
    }
    Object.defineProperty(SpawnRoom, "ins", {
        get: function () {
            if (this._ins == null)
                this._ins = new SpawnRoom();
            return this.ins;
        },
        enumerable: false,
        configurable: true
    });
    SpawnRoom.prototype.creatScreep = function () {
        var newName = SCREEP_TYPE.HARVESTER + Game.time;
        var isSuc = Game.spawns[PlayerData_1.PlayerData.ins.spawnName].spawnCreep([WORK, CARRY, MOVE], newName);
        if (isSuc === 0)
            return newName;
        return "";
    };
    SpawnRoom.prototype.create = function (type) {
        var name = this.creatScreep();
        if (!name)
            return;
        var creep = Game.creeps[name];
        var vo = {
            type: type
        };
        return creep;
    };
    return SpawnRoom;
}());
exports.SpawnRoom = SpawnRoom;
