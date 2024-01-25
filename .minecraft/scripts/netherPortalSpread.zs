#debug
import crafttweaker.api.event.entity.EntityTravelToDimensionEvent;
import crafttweaker.api.event.block.PortalSpawnEvent;
import crafttweaker.api.event.block.BlockNeighborNotifyEvent;
import crafttweaker.api.event.tick.WorldTickEvent;
import crafttweaker.api.events.CTEventManager;
import crafttweaker.api.world.Level;
import crafttweaker.api.world.ServerLevel;
import crafttweaker.api.block.BlockState;
import crafttweaker.api.block.Block;
import crafttweaker.api.data.IData;
import crafttweaker.api.data.IntData;
import crafttweaker.api.data.ListData;
import crafttweaker.api.data.MapData;
import crafttweaker.api.data.IntArrayData;
import crafttweaker.api.util.math.BlockPos;
import crafttweaker.api.util.math.Random;
import crafttweaker.api.util.Direction;
import crafttweaker.api.tag.type.KnownTag;
import stdlib.List;
import stdlib.IllegalArgumentException;
import math.Functions;

public expand IData {
    public asInt() as int {
        return this.asNumber().getInt();
    }
}

public class WeightedEntry<T> {
    public val object as T;
    public val weight as int;

    public this(object as T, weight as int) {
        this.object = object;
        this.weight = weight;
    }
}

public class WeightedList<T> {
    public val elements as WeightedEntry<T>[];
    public val totalWeight as int;
    public val weightedMap as int[];

    public this(elements as WeightedEntry<T>[]) {
        this.elements = elements;
        var totalWeight as int = 0;
        this.weightedMap = new int[](elements.length);
        for i in 0 .. elements.length {
            val entry = elements[i];
            totalWeight += entry.weight;
            this.weightedMap[i] = totalWeight;
        }
        this.totalWeight = totalWeight; 
    }

    public pick(random as Random) as T throws IllegalArgumentException {
        val n = random.nextInt(this.totalWeight);
        for i in 0 .. this.weightedMap.length {
            var x = this.weightedMap[i];
            if (n < x) {
                return this.elements[i].object;
            }
        }
        throw new IllegalArgumentException("not possible");
    }
}

public expand WeightedList<BlockState> {
    public in(element as BlockState) as bool {
        for e in this.elements {
            if (e.object == element) {
                return true;
            }
        }
        return false;
    }
}

public expand BlockState {
    public %(weight as int) as WeightedEntry<BlockState> {
        return new WeightedEntry<BlockState>(this, weight);
    }
}

public expand string {
    public %(weight as int) as WeightedEntry<string> {
        return new WeightedEntry<string>(this, weight);
    }
}

public class SpreadRules {
    public static val groups as WeightedList<BlockState>[string] = {
        "wastes": new WeightedList<BlockState>([
            <blockstate:minecraft:netherrack> % 85,
            <blockstate:minecraft:nether_quartz_ore> % 15,
            <blockstate:minecraft:nether_gold_ore> % 10
        ]),
        "soul": new WeightedList<BlockState>([
            <blockstate:minecraft:soul_sand> % 60,
            <blockstate:minecraft:soul_soil> % 40
        ]),
        "crimson": new WeightedList<BlockState>([
            <blockstate:minecraft:crimson_nylium> % 1
        ]),
        "nylium": new WeightedList<BlockState>([
            <blockstate:minecraft:warped_nylium> % 1
        ]),
        "basalt": new WeightedList<BlockState>([
            <blockstate:minecraft:basalt:axis=y> % 40,
            <blockstate:minecraft:blackstone> % 40,
            <blockstate:minecraft:magma_block> % 20
        ])
    };
    public static val rules as WeightedList<string>[KnownTag<Block>] = {
        <tag:blocks:forge:stone>: new WeightedList<string>([
            "wastes" % 80,
            "crimson" % 20,
            "nylium" % 20,
            "basalt" % 20,
            "soul" % 20
        ]),
        <tag:blocks:forge:cobblestone>: new WeightedList<string>([
            "wastes" % 80,
            "crimson" % 20,
            "nylium" % 20,
            "basalt" % 20,
            "soul" % 20
        ]),
        <tag:blocks:minecraft:dirt>: new WeightedList<string>([
            "wastes" % 80,
            "crimson" % 20,
            "nylium" % 20,
            "soul" % 50
        ]),
        <tag:blocks:forge:sand>: new WeightedList<string>([
            "soul" % 1
        ])
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
            val transformPos = pos.offset(transformVector);
            val transformBlock = transform(level.getBlockState(transformPos), transformPos, level);
            level.setBlockAndUpdate(transformPos, transformBlock);
            return 1;
        }
        currentDistance++;
    }
    return 1;
}

public function canTransform(blockState as BlockState) as bool {
    for blockTag in SpreadRules.rules {
        if (blockTag.contains(blockState.block)) {
            return true;
        }
    }
    return false;
}

public function transform(blockState as BlockState, pos as BlockPos, level as ServerLevel) as BlockState {
    val nearBlocks as int[string] = {};
    for side in Direction.values() {
        val nearBlock = level.getBlockState(pos.relative(side));
        for name, group in SpreadRules.groups {
            if (nearBlock in group) {
                if (name in nearBlocks) {
                    nearBlocks[name] = nearBlocks[name] + 1;
                } else {
                    nearBlocks[name] = 1;
                }
            }
        }
    }
    var group as string = "";
    if (!nearBlocks.isEmpty) {
        val weightedList = new List<WeightedEntry<string>>();
        for name, weight in nearBlocks {
            weightedList.add(name % weight);
        }
        group = new WeightedList<string>(weightedList).pick(level.random);
    } else {
        for blockTag, list in SpreadRules.rules {
            if (blockTag.contains(blockState.block)) {
                group = list.pick(level.random);
                break;
            }
        }
    }
    if (!group.isEmpty) {
        return SpreadRules.groups[group].pick(level.random);
    } else {
        return blockState;
    }
}
