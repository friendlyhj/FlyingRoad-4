#debug
import crafttweaker.api.event.entity.EntityTravelToDimensionEvent;
import crafttweaker.api.event.block.PortalSpawnEvent;
import crafttweaker.api.event.block.BlockNeighborNotifyEvent;
import crafttweaker.api.event.block.BlockPlaceEvent;
import crafttweaker.api.event.tick.WorldTickEvent;
import crafttweaker.api.events.CTEventManager;
import crafttweaker.api.world.Level;
import crafttweaker.api.world.ServerLevel;
import crafttweaker.api.world.CraftTweakerSavedData;
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
import crafttweaker.api.entity.type.item.ItemEntity;
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

public expand <T> List<T> {
    public random(random as Random, size as int) as List<T> {
        if (size > this.length as int) {
            return this;
        } else {
            val indexes as int[] = new int[](size, 0-1);
            val list as List<T> = new List<T>();
            for i in 0 .. size {
                var nextIndex as int = 0-1;
                while (nextIndex in indexes) {
                    nextIndex = random.nextInt(this.length as int);
                }
                indexes[i] = nextIndex;
                list.add(this[nextIndex]);
            }
            return list;
        }
    }
}

public class SpreadRules {
    public static val groups as WeightedList<BlockState>[string] = {
        "wastes": new WeightedList<BlockState>([
            <blockstate:minecraft:netherrack> % 75,
            <blockstate:minecraft:nether_quartz_ore> % 15,
            <blockstate:minecraft:nether_gold_ore> % 15
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

public class Modifiers {
    public static val SPEED as int = 1;
    public static val NETHERITE as int = 2;
    public static val STOP as int = 4;
}

public function hasModifier(modifiers as int, toCheck as int) as bool {
    return (modifiers & toCheck) != 0;
}

public function addModifier(modifiers as int, toAdd as int) as int {
    return modifiers | toAdd;
}

public function removeModifier(modifiers as int, toRemove as int) as int {
    return modifiers & (0 - toRemove - 1);
}

CTEventManager.register<EntityTravelToDimensionEvent>(event => {
    if (event.dimension == <resource:minecraft:the_nether>) {
        event.cancel();
        val entity = event.entity;

        if (entity is ItemEntity) {
            val pos = entity.blockPosition;
            val level = entity.level;
            if (level.isClientSide) return;
            val serverLevel = level as ServerLevel;
            val customData = serverLevel.customData;
            var nearestPortalIndex as int = findNearestPortal(customData, pos);
            val data = customData.getData();
            val portalData = data.getData<ListData>("Portals") as ListData;
            if (nearestPortalIndex >= 0) {
                val itemEntity = entity as ItemEntity;
                val item = itemEntity.item;
                var addedModifier as int = 0;
                if (<item:thermal_extra:soul_infused_dust>.matches(item)) {
                    addedModifier = Modifiers.SPEED;
                } else if (<item:thermal_extra:twinite_dust>.matches(item)) {
                    addedModifier = Modifiers.NETHERITE;
                } else if (<tag:items:minecraft:coals>.asIIngredient().matches(item)) {
                    addedModifier = Modifiers.STOP;
                }
                val toChangePortalData = portalData.getAt(nearestPortalIndex) as MapData;
                if (addedModifier == Modifiers.SPEED) {
                    toChangePortalData.put("time", 0);
                }
                toChangePortalData.put("modifier", addModifier((toChangePortalData.getAt("modifier") as IData).asInt(), addedModifier));
                customData.setData(data);
                entity.setRemoved(<constant:minecraft:entity/removalreason:discarded>);
            }
        }
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
    if (level.isClientSide || event.phase == <constant:forge:event/tick/phase:end>) return;
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
            if (level.getBlockState(pos).block == <block:minecraft:nether_portal>) {
                val time = elementData.getData<IntData>("time").asInt();
                val modifier = elementData.getData<IntData>("modifier").asInt();
                val newModifier = tickPortal(serverLevel, pos, time, modifier, elementData);
                elementData.put("modifier", newModifier);
                elementData.put("time", time + 1);
                newList.add(elementData);
            }
        }
        data.put("Portals", newList);
    }
    customData.setData(data);
});

CTEventManager.register<BlockPlaceEvent>(event => {
    val level = event.entity.level;
    if (level.isClientSide || event.state != <blockstate:minecraft:composter:level=0>) return;
    val serverLevel = level as ServerLevel;
    val customData = serverLevel.customData;
    val pos = event.pos;
    val portalIndex = findNearestPortal(customData, pos);
    if (portalIndex >= 0) {
        val data = customData.data;
        val portalData = (data.getData<ListData>("Portals") as ListData).getAt(portalIndex) as MapData;
        portalData.put("detector", [pos.x, pos.y, pos.z]);
        customData.setData(data);
    }
});

// return new modifier
public function tickPortal(level as ServerLevel, pos as BlockPos, time as int, modifier as int, data as MapData) as int {
    var newModifier as int = modifier;
    var interval as int = 100;

    if (hasModifier(modifier, Modifiers.STOP)) {
        return newModifier;
    }

    if (hasModifier(modifier, Modifiers.SPEED)) {
        interval = 40;
        if (time % 8001 == 0 && time != 0) {
            newModifier = removeModifier(modifier, Modifiers.SPEED);
            notifyDetector(3, level, data);
        } else {
            val random = level.random;
            if (random.nextInt(8) == 0) {
                val offsetX = random.nextDouble() * 5.0 - 2.5;
                val offsetY = random.nextDouble() * 4.0;
                val offsetZ = random.nextDouble() * 5.0 - 2.5;
                level.server.executeCommand("particle minecraft:soul " + (pos.x + offsetX + 0.5) + " " + (pos.y + offsetY + 0.5) + " " + (pos.z + offsetZ + 0.5), true);
            }
        }
    }

    if (hasModifier(modifier, Modifiers.NETHERITE)) {
        val random = level.random;
        if (random.nextInt(12) == 0) {
            val offsetX = random.nextDouble() * 5.0 - 2.5;
            val offsetY = random.nextDouble() * 4.0;
            val offsetZ = random.nextDouble() * 5.0 - 2.5;
            level.server.executeCommand("particle minecraft:glow_squid_ink " + (pos.x + offsetX + 0.5) + " " + (pos.y + offsetY + 0.5) + " " + (pos.z + offsetZ + 0.5), true);
        }
    }

    if (time % interval != 0) return newModifier;
    var currentDistance = 1;
    while (currentDistance < 9) {
        var vectors = MathUtils.INSTANCE.vectorDistance[currentDistance];
        var canTransformVectors = new List<BlockPos>();
        for vector in vectors {
            if (canTransform(level.getBlockState(pos.offset(vector)))) {
                canTransformVectors.add(vector);
            }
        }
        if (!canTransformVectors.isEmpty) {
            val transformVectors = canTransformVectors.random(level.random, currentDistance);
            for transformVector in transformVectors {
                val transformPos = pos.offset(transformVector);
                var transformBlock = transform(level.getBlockState(transformPos), transformPos, level);
                if (hasModifier(modifier, Modifiers.NETHERITE)) {
                    if (level.random.nextInt(100) == 42) {
                        transformBlock = <blockstate:minecraft:ancient_debris>;
                        if (level.random.nextInt(4) == 0) {
                            newModifier = removeModifier(modifier, Modifiers.NETHERITE);
                            notifyDetector(6, level, data);
                        }
                    }
                }
                level.setBlockAndUpdate(transformPos, transformBlock);
            }
            return newModifier;
        }
        currentDistance++;
    }
    return newModifier;
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

public function findNearestPortal(customData as CraftTweakerSavedData, pos as BlockPos) as int {
    val data = customData.getData();
    val portalData = data.getData<ListData>("Portals") as ListData;
    var nearestDistance as int = 128;
    var nearestPortalIndex as int = 0-1;
    for index in 0 .. portalData.size {
        val elementData = portalData.getAt(index) as MapData;
        val posData = elementData.getData<IntArrayData>("pos");
        val portalPos = new BlockPos(posData.getAt(0).asInt(), posData.getAt(1).asInt(), posData.getAt(2).asInt());
        val distance = portalPos.distManhattan(pos);
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestPortalIndex = index;
        }
    }
    return nearestPortalIndex;
}

public function notifyDetector(signal as int, level as ServerLevel, data as MapData) as void {
    if (data.contains("detector")) {
        level.sequence(data)
            .run((level, ctx) => {
                val posData = ctx.data.getData<IntArrayData>("detector");
                val pos = new BlockPos(posData.getAt(0).asInt(), posData.getAt(1).asInt(), posData.getAt(2).asInt());
                if (level.getBlockState(pos) == <blockstate:minecraft:composter:level=0>) {
                    level.setBlockAndUpdate(pos, <blockstate:minecraft:composter:level=${signal}>);
                }
            })
            .sleep(10)
            .run((level, ctx) => {
                val posData = ctx.data.getData<IntArrayData>("detector");
                val pos = new BlockPos(posData.getAt(0).asInt(), posData.getAt(1).asInt(), posData.getAt(2).asInt());
                if (level.getBlockState(pos) == <blockstate:minecraft:composter:level=${signal}>) {
                    level.setBlockAndUpdate(pos, <blockstate:minecraft:composter:level=0>);
                }
            })
            .start();
    }
}
