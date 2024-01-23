onEvent('recipes', event => {
    event.remove({ 'output': 'draconicevolution:draconium_core' })
    event.remove({ 'output': 'draconicevolution:wyvern_core' })
    event.remove({ 'output': 'draconicevolution:grinder' })
    event.remove({ 'output': 'draconicevolution:generator' })
    event.remove({ 'output': 'draconicevolution:basic_crafting_injector'})

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

    event.custom({
        'type': 'compactcrafting:miniaturization',
        'layers': [
            {
                'type': 'compactcrafting:mixed',
                'pattern': [
                    ['-', '-', '-'],
                    ['-', 'A', '-'],
                    ['-', '-', '-']
                ]
            },
            {
                'type': 'compactcrafting:mixed',
                'pattern': [
                    ['B', 'C', 'B'],
                    ['C', 'A', 'C'],
                    ['B', 'C', 'B']
                ]
            },
            {
                'type': 'compactcrafting:mixed',
                'pattern': [
                    ['C', 'C', 'C'],
                    ['C', 'C', 'C'],
                    ['C', 'C', 'C']
                ]
            }
        ],
        'catalyst': {
            'id': 'draconicevolution:draconium_core',
            'Count': 1
        },
        'components': {
            'A': {
                'type': 'compactcrafting:block',
                'block': 'thermal_extra:soul_infused_block'
            },
            'B': {
                'type': 'compactcrafting:block',
                'block': 'pneumaticcraft:smooth_plastic_brick_light_blue'
            },
            'C': {
                'type': 'compactcrafting:block',
                'block': 'ae2:quartz_block'
            }
        },
        'outputs': [{ 'id': 'draconicevolution:basic_crafting_injector', 'Count': 2 }]
    })

});