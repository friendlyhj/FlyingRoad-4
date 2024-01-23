onEvent('recipes', event => {
    event.remove({ 'output': 'draconicevolution:draconium_core' })
    event.remove({ 'output': 'draconicevolution:wyvern_core' })
    event.remove({ 'output': 'draconicevolution:grinder' })
    event.remove({ 'output': 'draconicevolution:generator' })

    event.recipes.minecraft.crafting_shaped('draconicevolution:draconium_core', [
        'ABA',
        'CSC',
        'DDD'
    ], {
        'A': 'pneumaticcraft:ingot_iron_compressed',
        'B': 'mekanism:alloy_atomic',
        'C': '#forge:ingots/lumium',
        'D': 'draconicevolution:draconium_ingot',
        'S': 'kubejs:mithril_block'
    })

    event.recipes.minecraft.crafting_shaped('draconicevolution:wyvern_core', [
        'ABA',
        'CSC',
        'DDD'
    ], {
        'A': 'mekanism:ingot_refined_obsidian',
        'B': 'netherite_ingot',
        'C': 'thermal_extra:twinite_ingot',
        'D': 'draconicevolution:draconium_core',
        'S': 'nether_star'
    })

    event.recipes.minecraft.crafting_shaped('draconicevolution:grinder', [
        'SSS',
        'CFC',
        'GWG'
    ], {
        'S': 'miniutilities:diamond_spikes',
        'C': 'draconicevolution:wyvern_core',
        'F': 'mekanism:steel_casing',
        'G': 'kubejs:mithril_gear',
        'W': 'thermal:rf_coil'
    })
});