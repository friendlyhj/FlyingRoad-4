#debug
import crafttweaker.api.event.entity.EntityTravelToDimensionEvent;
import crafttweaker.api.event.block.PortalSpawnEvent;
import crafttweaker.api.event.block.BlockNeighborNotifyEvent;
import crafttweaker.api.event.tick.WorldTickEvent;
import crafttweaker.api.events.CTEventManager;
import crafttweaker.api.world.ServerLevel;
import crafttweaker.api.block.BlockState;
import crafttweaker.api.data.IData;
import crafttweaker.api.data.IntData;
import crafttweaker.api.data.ListData;
import crafttweaker.api.data.MapData;
import crafttweaker.api.data.IntArrayData;
import crafttweaker.api.util.math.BlockPos;
import crafttweaker.api.util.math.Random;
import stdlib.List;
import math.Functions;

public expand IData {
    public asInt() as int {
        return this.asNumber().getInt();
    }
}

public class WeightedBlockState {
    public val block as BlockState;
    public val weight as int;

    public this(block as BlockState, weight as int) {
        this.block = block;
        this.weight = weight;
    }
}

public expand BlockState {
    public %(weight as int) as WeightedBlockState {
        return new WeightedBlockState(this, weight);
    }
}

public class SpreadRules {
    public static val rules as WeightedBlockState[][BlockState] = {
        <blockstate:minecraft:cobblestone> : [
            <blockstate:minecraft:netherrack> % 90,
            <blockstate:minecraft:nether_quartz_ore> % 10,
            <blockstate:minecraft:nether_gold_ore> % 10,
            <blockstate:minecraft:blackstone> % 50,
            <blockstate:minecraft:basalt:axis=y> % 20
        ]
    };
}

public class MathUtils {
    public val vectorDistance as List<BlockPos>[] = new List<BlockPos>[](9, new List<BlockPos>());
    public static val INSTANCE as MathUtils = new MathUtils();

    public this() {
        for i in 0 .. 9 {
            val vectors = new List<BlockPos>();
            for x in (0-i) .. (i + 1) {
                for y in (0-i) .. (i + 1) {
                    for z in (0-i) .. (i + 1) {
                        if (i == Functions.abs(x) + Functions.abs(y)+ Functions.abs(z)) {
                            vectors.add(new BlockPos(x, y, z));
                        }
                    }
                }
            }
            vectorDistance[i] = vectors;
        }
    }
}

CTEventManager.register<EntityTravelToDimensionEvent>(event => {
    if (event.dimension == <resource:minecraft:the_nether>) {
        event.cancel();
    }
});

CTEventManager.register<PortalSpawnEvent>(event => {
    val pos = event.pos;
    val level = event.world;
    if (level.isClientSide) return;
    val serverLevel = level as ServerLevel;
    val customData = serverLevel.customData;
    val data = customData.getData();
    if (!data.contains("Portals")) {
        data.put("Portals", ListData.create());
    } else {
        data.getData<ListData>("Portals").add({"pos": [pos.x, pos.y, pos.z], "time": 0, "modifier": 0});
    }
    customData.setData(data);
});

CTEventManager.register<WorldTickEvent>(event => {
    val level = event.world;
    if (level.isClientSide) return;
    val serverLevel = level as ServerLevel;
    val customData = serverLevel.customData;
    val data = customData.getData();
    if (!data.contains("Portals")) {
        data.put("Portals", ListData.create());
    } else {
        val newList = ListData.create();
        for element in (data.getData<ListData>("Portals") as ListData as List<IData>) {
            val elementData = element as MapData;
            val posData = elementData.getData<IntArrayData>("pos");
            val pos = new BlockPos(posData.getAt(0).asInt(), posData.getAt(1).asInt(), posData.getAt(2).asInt());
            if (level.getBlockState(pos) == <blockstate:minecraft:nether_portal>) {
                val time = elementData.getData<IntData>("time").asInt();
                val modifier = elementData.getData<IntData>("modifier").asInt();
                val result = tickPortal(serverLevel, pos, time, modifier);
                if (result == 0) {
                    elementData.put("time", time + 1);
                }
                if (result == 1) {
                    elementData.put("time", 0);
                }
                if (result == 2) {
                    elementData.put("modifier", 0);
                }
                newList.add(elementData);
            }
        }
        data.put("Portals", newList);
    }
    customData.setData(data);
});

// WAITING: 0
// SPREAD: 1
// MODIFIER_FINISH: 2
public function tickPortal(level as ServerLevel, pos as BlockPos, time as int, modifier as int) as int {
    if (time != 20) return 0;
    var currentDistance = 1;
    while (currentDistance < 9) {
        var vectors = MathUtils.INSTANCE.vectorDistance[currentDistance];
        var canTransformVectors = new List<BlockPos>();
        for vector in vectors {
            if (canTransform(level.getBlockState(pos.offset(vector)))) {
                print("added" + vector.toString());
                canTransformVectors.add(vector);
            }
        }
        if (!canTransformVectors.isEmpty) {
            val transformVector = canTransformVectors[level.random.nextInt(canTransformVectors.length as int)];
            val transformBlocks = SpreadRules.rules[level.getBlockState(pos.offset(transformVector))];
            val weightedMap = new int[](transformBlocks.length);
            var totalWeight = 0;
            for i in 0 .. transformBlocks.length {
                val entry = transformBlocks[i];
                totalWeight += entry.weight;
                weightedMap[i] = totalWeight;
            }
            val n = level.random.nextInt(totalWeight);
            for i in 0 .. weightedMap.length {
                var x = weightedMap[i];
                if (n < x) {
                    val transformBlock = transformBlocks[i].block;
                    level.setBlockAndUpdate(pos.offset(transformVector), transformBlock);
                    return 1;
                }
            }
        }
        currentDistance++;
    }
    return 1;
}

public function canTransform(block as BlockState) as bool {
    return block in SpreadRules.rules;
}
