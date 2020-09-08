"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerData = void 0;
var PlayerData = (function () {
    function PlayerData() {
        this.spawnName = "Spawn1";
    }
    Object.defineProperty(PlayerData, "ins", {
        get: function () {
            if (this._ins == null)
                this._ins = new PlayerData();
            return this.ins;
        },
        enumerable: false,
        configurable: true
    });
    return PlayerData;
}());
exports.PlayerData = PlayerData;
