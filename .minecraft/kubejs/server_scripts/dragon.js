onEvent('recipes', event => {
    event.remove({ 'output': 'draconicevolution:draconium_core' })
    event.remove({ 'output': 'draconicevolution:wyvern_core' })
    event.remove({ 'output': 'draconicevolution:grinder' })
    event.remove({ 'output': 'draconicevolution:generator' })
    event.remove({ 'output': 'draconicevolution:basic_crafting_injector' })

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
        'S': 'cyclic:spikes_diamond',
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
                    ['O', 'O', 'O'],
                    ['O', 'A', 'O'],
                    ['O', 'O', 'O']
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
            },
            'O': {
                'type': 'compactcrafting:block',
                'block': 'air'
            }
        },
        'outputs': [{ 'id': 'draconicevolution:basic_crafting_injector', 'Count': 2 }]
    })

    event.remove({ 'id': 'draconicevolution:components/wyvern_energy_core' })
    event.recipes.minecraft.crafting_shaped('draconicevolution:wyvern_energy_core', [
        'IAI',
        'BCB',
        'IAI'
    ], {
        'I': '#forge:ingots/electrum',
        'A': 'thermal:signalum_plate',
        'B': 'mekanism:dust_lithium',
        'C': 'draconicevolution:draconium_core'
    })

    let tools = [
        'shovel',
        'hoe',
        'pickaxe',
        'axe',
        'sword',
        'bow'
    ]

    tools.forEach(tool => {
        event.remove({'id': `draconicevolution:tools/wyvern_${tool}` })
        event.remove({'id': `draconicevolution:tools/draconic_${tool}` })
        event.custom({
            'type': 'draconicevolution:fusion_crafting',
            'result': {
                'item': `draconicevolution:wyvern_${tool}`
            },
            'catalyst': {
                'item': `mysticalagriculture:imperium_${tool}`
            },
            'total_energy': 8000000,
            'tier': 'WYVERN',
            'ingredients': [
                {
                    'item': 'draconicevolution:wyvern_core'
                },
                {
                    'tag': 'forge:ingots/draconium'
                },
                {
                    'tag': 'forge:ingots/draconium'
                },
                {
                    'item': 'draconicevolution:basic_relay_crystal'
                },
                {
                    'item': 'draconicevolution:wyvern_energy_core'
                },
                {
                    'item': 'draconicevolution:basic_relay_crystal'
                }
            ]
        })
        event.custom({
            'type': 'draconicevolution:fusion_crafting',
            'result': {
                'item': `draconicevolution:draconic_${tool}`
            },
            'catalyst': {
                'item': `draconicevolution:wyvern_${tool}`
            },
            'total_energy': 32000000,
            'tier': 'DRACONIC',
            'ingredients': [
                {
                    'item': 'draconicevolution:awakened_core'
                },
                {
                    'tag': 'forge:ingots/draconium_awakened'
                },
                {
                    'tag': 'forge:ingots/draconium_awakened'
                },
                {
                    'item': 'thermal_extra:rf_coil_storage_augment_5'
                },
                {
                    'item': 'draconicevolution:draconic_energy_core'
                },
                {
                    'item': 'thermal_extra:rf_coil_storage_augment_5'
                }
            ]
        })
    })

    event.custom({
        'type': 'draconicevolution:fusion_crafting',
        'result': {
            'item': `draconicevolution:wyvern_capacitor`
        },
        'catalyst': {
            'item': `thermal:flux_capacitor`
        },
        'total_energy': 8000000,
        'tier': 'WYVERN',
        'ingredients': [
            {
                'item': 'draconicevolution:wyvern_core'
            },
            {
                'tag': 'forge:ingots/draconium'
            },
            {
                'tag': 'forge:ingots/draconium'
            },
            {
                'tag': 'forge:ingots/draconium'
            },
            {
                'tag': 'forge:ingots/draconium'
            },
            {
                'item': 'draconicevolution:wyvern_energy_core'
            },
            {
                'item': 'draconicevolution:wyvern_energy_core'
            },
            {
                'item': 'draconicevolution:wyvern_energy_core'
            }
        ]
    })

    event.remove({'id': `draconicevolution:tools/wyvern_chestpiece` })
    event.remove({'id': `draconicevolution:tools/draconic_chestpiece` })
    event.custom({
        'type': 'draconicevolution:fusion_crafting',
        'result': {
            'item': 'draconicevolution:wyvern_chestpiece'
        },
        'catalyst': {
            'item': 'mysticalagriculture:supremium_chestplate'
        },
        'total_energy': 8000000,
        'tier': 'WYVERN',
        'ingredients': [
            {
                'item': 'draconicevolution:wyvern_core'
            },
            {
                'tag': 'forge:ingots/draconium'
            },
            {
                'tag': 'forge:ingots/draconium'
            },
            {
                'item': 'draconicevolution:basic_relay_crystal'
            },
            {
                'item': 'draconicevolution:wyvern_energy_core'
            },
            {
                'item': 'draconicevolution:basic_relay_crystal'
            }
        ]
    })

    event.custom({
        'type': 'draconicevolution:fusion_crafting',
        'result': {
            'item': `draconicevolution:draconic_chestpiece`
        },
        'catalyst': {
            'item': `draconicevolution:wyvern_chestpiece`
        },
        'total_energy': 32000000,
        'tier': 'DRACONIC',
        'ingredients': [
            {
                'item': 'draconicevolution:awakened_core'
            },
            {
                'tag': 'forge:ingots/draconium_awakened'
            },
            {
                'tag': 'forge:ingots/draconium_awakened'
            },
            {
                'item': 'thermal_extra:rf_coil_storage_augment_5'
            },
            {
                'item': 'draconicevolution:draconic_energy_core'
            },
            {
                'item': 'thermal_extra:rf_coil_storage_augment_5'
            }
        ]
    })

    event.remove({ 'id': 'draconicevolution:awakened_draconium_block' })

    event.custom({
        'type': 'draconicevolution:fusion_crafting',
        'result': {
            'item': 'draconicevolution:awakened_draconium_block',
            'count': 4
        },
        'catalyst': {
            "count": 4,
            "items": [
                {
                    "tag": "forge:storage_blocks/draconium"
                }
            ],
            "type": "draconicevolution:ingredient_stack"
        },
        'total_energy': 200000000,
        'tier': 'WYVERN',
        'ingredients': [
            {
                'item': 'draconicevolution:dragon_heart'
            },
            {
                'item': 'mekanism:pellet_antimatter'
            },
            {
                'item': 'draconicevolution:draconium_core'
            },
            {
                'item': 'draconicevolution:draconium_core'
            },
            {
                'item': 'draconicevolution:draconium_core'
            },
            {
                'item': 'draconicevolution:draconium_core'
            },
            {
                'item': 'draconicevolution:draconium_core'
            },
            {
                'item': 'draconicevolution:draconium_core'
            }
        ]
    })

});