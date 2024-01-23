import crafttweaker.api.event.block.BlockNeighborNotifyEvent;
import crafttweaker.api.events.CTEventManager;
import crafttweaker.api.util.Direction;
import crafttweaker.api.event.entity.EntityStruckByLightningEvent;
import crafttweaker.api.entity.type.item.ItemEntity;

CTEventManager.register<BlockNeighborNotifyEvent>(event => {
    
    if (event.state.block.registryName in <tag:blocks:forge:storage_blocks/silver>) {
        for side in Direction.values() {
            val level = event.world;
            val pos = event.pos;
            if (level.getBlockState(event.pos.relative(side)).block.registryName == <resource:kubejs:primal_mana>) {
                level.sequence({"version": "1.0.0"})
                    .sleep(20)
                    .then(level => {
                        level.setBlockAndUpdate(pos, <blockstate:kubejs:mithril_block>);
                    })
                    .start();
            }
        }
    }
});

CTEventManager.register<EntityStruckByLightningEvent>(event => {
    val entity = event.entity;
    if (entity is ItemEntity) {
        val itemEntity = entity as ItemEntity;
        val pos = entity.position();
        val item = itemEntity.item;
        val count = item.amount;
        var newCount = 0;
        if (<item:thermal:niter_dust>.matches(item)) {
            print("hit");
            for i in 0 .. count {
                if (entity.level.random.nextInt(4) == 0) {
                    newCount++;
                }
            }
            if (newCount != 0) {
                entity.level.sequence({"version": "1.0.0"})
                    .sleep(20)
                    .then(level => {
                        val result = new ItemEntity(level, pos.x, pos.y, pos.z, <item:thermal:blitz_powder> * newCount);
                        result.fireImmune();
                        level.addFreshEntity(result);
                    })
                    .start();
            }
        }
        if (<item:thermal:blitz_powder>.matches(item)) {
            event.cancel();
        }
    }
});
