/*
1、创建一个creeps
 Your spawn creates new units called "creeps" by its method spawnCreep.
 Usage of this method is described in the documentation.
 Each creep has a name and certain body parts that give it various skills.
 You can address your spawn by its name the following way: Game.spawns['Spawn1'].
 Create a worker creep with the body array [WORK,CARRY,MOVE]
 and name Harvester1 (the name is important for the tutorial!). 
 You can type the code in the console yourself or copy & paste the hint below.
*/
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' );


/* 
 2、控制screep 去工作，如收集能量
 To send a creep to harvest energy,
 you need to use the methods described in the documentation section below. 
 Commands will be passed each game tick. 
 The harvest method requires that the energy source is adjacent to the creep.
 You give orders to a creep by its name this way: Game.creeps['Harvester1'].
 Use the FIND_SOURCES constant as an argument to the Room.find method. 
*/
module.exports.loop = function () {
    var creep = Game.creeps['Harvester1'];
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
    }
}

/* 
 3、添加判断，以致能来回工作
 To make the creep transfer energy back to the spawn, you need to use the method Creep.transfer. 
 However, remember that it should be done when the creep is next to the spawn, so the creep needs to walk back.
 If you modify the code by adding the check .store.getFreeCapacity() > 0 to the creep, 
 it will be able to go back and forth on its own,
 giving energy to the spawn and returning to the source.
 Extend the creep program so that it can transfer harvested energy to the spawn and return back to work.
*/
module.exports.loop = function () {
    var creep = Game.creeps['Harvester1'];

    if(creep.store.getFreeCapacity() > 0) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
    else {
        if( creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
            creep.moveTo(Game.spawns['Spawn1']);
        }
    }
}

/* 
 4、每个creep的生命周期是1500秒，现在花费200能量创建第二个creep铺助工作
 Great! This creep will now work as a harvester until it dies. 
 Remember that almost any creep has a life cycle of 1500 game ticks, then it "ages" and dies (this behavior is disabled in the Tutorial).
 Let's create another worker creep to help the first one.
 It will cost another 200 energy units, so you may need to wait until your harvester collects enough energy.
 The spawnCreep method will return an error code ERR_NOT_ENOUGH_ENERGY (-6) until then. 
*/
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester2' );


/* 
 5、通过for把第二个creep加入工作工
 The second creep is ready, but it won't move until we include it into the program.
 To set the behavior of both creeps we could just duplicate the entire script for the second one, 
 but it's much better to use the for loop against all the screeps in Game.creeps. 
*/

module.exports.loop = function () {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    }
}