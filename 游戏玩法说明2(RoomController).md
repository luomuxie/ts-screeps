# 玩法说明2(RoomControlling)
In this Tutorial section we’ll talk about a key strategic object in your room: Room Controller. By controlling this invincible structure you can build facilities in the room. The higher the controller level, the more structures available to build.

1、创建一个creep来负责控制器升级

You will need a new worker creep to upgrade your controller level. Let's call it "Upgrader1". In following sections we'll discuss how to create creeps automatically, but for now let's send a command manually to the console.
```js
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1' );
```
2、通过写入memory属性来标记不同角色

To do that, we need to utilize the memory property of each creep that allows writing custom information into the creep's "memory". Let's do this to assign different roles to our creeps.
All your stored memory is accessible via the global Memory object. You can use it any way you like.
```js
Game.creeps['Harvester1'].memory.role = 'harvester';
Game.creeps['Upgrader1'].memory.role = 'upgrader';
```
3、创建控制器升模块
You can check your creeps' memory in either the creep information panel on the left or on the "Memory" tab.

Now let's define the behavior of the new creep. Both creeps should harvest energy, but the creep with the role harvester should bring it to the spawn, while the creep with the role upgrader should go to the Controller and apply the function upgradeController to it (you can get the Controller object with the help of the Creep.room.controller property).

In order to do this, we’ll create a new module called role.upgrader.
```js
var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store[RESOURCE_ENERGY] == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;
```
现在的main.js结构为
```js
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
```