import crafttweaker.api.event.entity.player.interact.RightClickBlockEvent;
import crafttweaker.api.event.tick.WorldTickEvent;
import crafttweaker.api.events.CTEventManager;
import crafttweaker.api.world.ServerLevel;
import crafttweaker.api.world.Level;
import crafttweaker.api.util.math.BlockPos;
import crafttweaker.api.data.IData;
import crafttweaker.api.data.IntArrayData;
import crafttweaker.api.data.ListData;
import crafttweaker.api.data.MapData;
import crafttweaker.api.util.sequence.SequenceContext;
import crafttweaker.api.capability.Capabilities;
import crafttweaker.api.capability.IEnergyStorage;
import stdlib.List;

CTEventManager.register<RightClickBlockEvent>(event => {
    if (!event.player.level.isClientSide() && event.hand == <constant:minecraft:interactionhand:main_hand>) {
        val level = event.player.level as ServerLevel;
        val pos = event.blockPos;
        val block = level.getBlockState(pos);
        val player = event.player;
        if (block == <blockstate:kubejs:warped_obsidian>) {
            val centralPos = pos.above();
            if (!player.isVisuallyCrawling && level.getBlockState(centralPos) == <blockstate:minecraft:air> && checkStructure(level, centralPos) && consumeEnergy(level, centralPos, true)) {
                player.playNotifySound(<soundevent:minecraft:block.end_portal.spawn>, <constant:minecraft:sound/source:blocks>, 1.0, 1.0);
                level.setBlockAndUpdate(centralPos, <blockstate:minecraft:end_portal>);
                val customData = level.customData;
                val data = customData.getData();
                if (!data.contains("EndPortals")) {
                    data.put("EndPortals", ListData.create());
                } else {
                    data.getData<ListData>("EndPortals").add([centralPos.x, centralPos.y, centralPos.z]);
                }
            }
        }
    }
});

CTEventManager.register<WorldTickEvent>(event => {
    val level = event.world;
    if (level.isClientSide || event.phase == <constant:forge:event/tick/phase:end>) return;
    val serverLevel = level as ServerLevel;
    val customData = serverLevel.customData;
    val data = customData.getData();
    if (!data.contains("EndPortals")) {
        data.put("EndPortals", ListData.create());
    } else {
        val newList = ListData.create();
        for element in (data.getData<ListData>("EndPortals") as ListData as List<IData>) {
            val posData = element as IntArrayData;
            val pos = new BlockPos(posData.getAt(0).asInt(), posData.getAt(1).asInt(), posData.getAt(2).asInt());
            if (checkStructure(level, pos) && consumeEnergy(level, pos, false)) {
                newList.add(posData);
                val random = serverLevel.random;
                val offsetX = random.nextDouble() * 3.0 - 1.5;
                val offsetZ = random.nextDouble() * 3.0 - 1.5;
                serverLevel.server.executeCommand("particle minecraft:portal " + (pos.x + offsetX + 0.5) + " " + pos.y + " " + (pos.z + offsetZ + 0.5), true);
            } else {
                level.setBlockAndUpdate(pos, <blockstate:minecraft:air>);
            }
        }
        data.put("EndPortals", newList);
    }
    customData.setData(data);
});

public function checkStructure(level as ServerLevel, pos as BlockPos) as bool {
    val warpedObsidian = <blockstate:kubejs:warped_obsidian>;
    val endStone = <blockstate:minecraft:end_stone>;
    for i in 0 .. 3 {
        for j in 0 .. 3 {
            if (level.getBlockState(pos.offset(i - 1, 1, j - 1)) != warpedObsidian || level.getBlockState(pos.offset(i - 1, -1, j - 1)) != warpedObsidian) {
                return false;
            }
        }
    }
    for i in 0 .. 5 {
        for j in 0 .. 5 {
            if (i == 2 && j == 2) {
                if (level.getBlockState(pos.offset(i - 2, -2, j - 2)) != endStone) {
                    return false;
                }
            } else {
                if (level.getBlockState(pos.offset(i - 2, -2, j - 2)) != endStone || (level.getBlockState(pos.offset(i - 2, 2, j - 2)) != endStone)) {
                    return false;
                }
            }
        }
    }
    return true;
}

public function consumeEnergy(level as ServerLevel, pos as BlockPos, simulate as bool) as bool {
    val cell = level.getBlockEntity(pos.above(2));
    if (cell != null) {
        val energyStorage = cell.getCapability<IEnergyStorage>(Capabilities.ENERGY, <constant:minecraft:direction:down>);
        if (energyStorage != null && energyStorage.extractEnergy(10000, true) == 10000) {
            if (!simulate) {
                energyStorage.extractEnergy(10000, false);
            }
            return true;
        }
    }
    return false;
}
