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

