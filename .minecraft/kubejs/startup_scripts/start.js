onEvent('block.registry', event => {
    event.create('budding_andesite')
        .randomTick(callback => {
            let level = callback.level
            let pos = callback.block.pos
            let above = pos.above()
            if (level.getBlock(above).blockState.isAir()) {
                callback.server.runCommandSilent(`setblock ${above.x} ${above.y} ${above.z} kubejs:andesite_bud replace`)
            }
        })
        .tagBlock('minecraft:mineable/pickaxe')
        .material('rock')
    event.create('andesite_bud')
        .fullBlock(false)
        .notSolid()
        .lightLevel(0.1)
        .defaultCutout()
        .opaque(false)
        .noDrops()
        .material('rock')
        .hardness(0)
        .box(2, 0, 2, 14, 8, 14, true)
    
    event.create('budding_mine')
        .tagBlock('minecraft:mineable/pickaxe')
        .material('rock')
        .noDrops()

    event.create('budding_gem_mine')
        .tagBlock('minecraft:mineable/pickaxe')
        .material('rock')
        .noDrops()

    event.create('mine_bud')
        .fullBlock(false)
        .notSolid()
        .noDrops()
        .lightLevel(0.1)
        .defaultCutout()
        .opaque(false)
        .material('rock')
        .hardness(0)
        .box(2, 0, 2, 14, 8, 14, true)

    event.create('gem_mine_bud')
        .fullBlock(false)
        .notSolid()
        .noDrops()
        .lightLevel(0.1)
        .defaultCutout()
        .opaque(false)
        .material('rock')
        .hardness(0)
        .box(2, 0, 2, 14, 8, 14, true)
})

onEvent('item.registry', event => {
    event.create('andesite_rock')
    event.create('glowing_gem')
})