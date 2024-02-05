onEvent('recipes', event => {
    event.recipes.minecraft.crafting_shapeless('4x kubejs:andesite_rock', [
        'minecraft:andesite', 'thermal:earth_charge'
    ])

    event.remove({ id: 'thermal:earth_charge/apatite_dust_from_apatite' })
    event.remove({ id: 'thermal:earth_charge/sulfur_dust_from_sulfur' })
    event.remove({ id: 'thermal:earth_charge/cinnabar_dust_from_cinnabar' })
    event.remove({ id: 'thermal:earth_charge/niter_dust_from_niter' })

    let crystals = [
        ['apatite', 'thermal:apatite_dust'],
        ['sulfur', 'thermal:sulfur_dust'],
        ['cinnabar', 'minecraft:redstone'],
        ['niter', 'thermal:niter_dust'],
        ['kubejs:glowing_gem', 'minecraft:glowstone_dust']
    ]

    crystals.forEach(entry => {
        let name = entry[0]
        let result = entry[1]

        let input = `thermal:${name}`
        if (name.indexOf(':') != -1) {
            input = name
        } else {
            event.remove({ id: `thermal:earth_charge/${name}_dust_from_${name}` })
            event.remove({ id: `thermal:machines/pulverizer/pulverizer_${name}` })
            event.remove({ id: `thermal:machines/crystallizer/crystallizer_${name}` })
        }
        let output = `6x ${result}`
        event.recipes.minecraft.crafting_shapeless(output, [
            input, 'thermal:earth_charge'
        ])
        event.recipes.thermal.pulverizer(output, input).energy(4000)
        event.recipes.mekanism.crushing(output, input)
        event.custom({
            'type': 'pneumaticcraft:pressure_chamber',
            'inputs': [
                {
                    'item': input
                }
            ],
            'pressure': 1.0,
            'results': [
                {
                    'item': result,
                    'count': 6
                }
            ]
        })
    })

    event.custom({
        'type': 'pneumaticcraft:thermo_plant',
        'item_input': {
            'item': 'thermal:sulfur_dust'
        },
        'fluid_input': {
            'type': 'pneumaticcraft:fluid',
            'tag': 'thermal:resin',
            'amount': 150
        },
        'fluid_output': {
            'fluid': 'pneumaticcraft:plastic',
            'amount': 250
        },
        'temperature': {
            'min_temp': 423
        },
        'speed': 0.25,
        'pressure': 2.0,
        'exothermic': false
    })

    event.remove({ id: 'pneumaticcraft:pressure_chamber/etching_acid' })
    event.custom({
        'type': 'pneumaticcraft:pressure_chamber',
        'inputs': [
            {
                'item': 'pneumaticcraft:plastic_bucket'
            },
            {
                'type': 'pneumaticcraft:stacked_item',
                'item': 'thermal:sulfur_dust',
                'count': 4
            },
            {
                'type': 'pneumaticcraft:stacked_item',
                'item': 'minecraft:gunpowder',
                'count': 2
            },
            {
                'item': 'minecraft:glowstone_dust'
            }
        ],
        'pressure': 2.0,
        'results': [
            {
                'item': 'pneumaticcraft:etching_acid_bucket'
            }
        ]
    })

    event.custom({
        'type': 'pneumaticcraft:thermo_plant',
        'fluid_input': {
            'type': 'pneumaticcraft:fluid',
            'tag': 'thermal:latex',
            'amount': 250
        },
        'temperature': {
            'min_temp': 273,
            'max_temp': 373
        },
        'item_output': {
            'item': 'slime_ball'
        },
        'speed': 1.0,
        'pressure': 0.5,
        'exothermic': false
    })

    event.custom({
        'type': 'pneumaticcraft:thermo_plant',
        'fluid_input': {
            'type': 'pneumaticcraft:fluid',
            'tag': 'thermal:resin',
            'amount': 1000
        },
        'item_input': {
            'item': 'redstone'
        },
        'temperature': {
            'min_temp': 373
        },
        'fluid_output': {
            'type': 'pneumaticcraft:fluid',
            'fluid': 'pneumaticcraft:lubricant',
            'amount': 1000
        },
        'speed': 1.0,
        'exothermic': false
    })

    event.remove({ 'id': 'pneumaticcraft:thermo_plant/lubricant_from_biodiesel' })
    event.remove({ 'id': 'pneumaticcraft:thermo_plant/lubricant_from_diesel' })

    event.custom({
        'type': 'pneumaticcraft:amadron',
        'input': {
            'type': 'ITEM',
            'id': 'thermal:phytogro',
            'amount': 128
        },
        'output': {
            'type': 'ITEM',
            'id': 'minecraft:emerald',
            'amount': 1
        },
        'static': true,
        'level': 0
    })

    let plants = [
        'minecraft:wheat_seeds',
        'minecraft:pumpkin_seeds',
        'minecraft:melon_seeds',
        'minecraft:beetroot_seeds',
        'minecraft:carrot',
        'minecraft:potato',
        'minecraft:cactus',
        'minecraft:sugar_cane',
        'minecraft:bamboo',
        'minecraft:grass_block',
        'minecraft:nether_wart',
        'immersiveengineering:seed',
        'thermal:amaranth_seeds',
        'thermal:barley_seeds',
        'thermal:corn_seeds',
        'thermal:flax_seeds',
        'minecraft:acacia_sapling',
        'minecraft:dark_oak_sapling',
        'thermal:strawberry_seeds',
        'thermal:tomato_seeds',
        'thermal:hops_seeds',
        'thermal:tea_seeds',
        'thermal:frost_melon_seeds',
        'minecraft:oak_sapling',
        'minecraft:spruce_sapling',
        'minecraft:birch_sapling',
        'minecraft:jungle_sapling',
        'thermal:onion_seeds',
        'thermal:radish_seeds',
        'thermal:rice_seeds',
        'thermal:sadiroot_seeds',
        'thermal:spinach_seeds',
        'thermal:bell_pepper_seeds',
        'thermal:eggplant_seeds',
        'thermal:green_bean_seeds',
        'thermal:peanut_seeds',
        'minecraft:ink_sac'
    ]
    plants.forEach(plant => {
        event.custom({
            'type': 'pneumaticcraft:amadron',
            'input': {
                'type': 'ITEM',
                'id': 'minecraft:emerald',
                'amount': 2
            },
            'output': {
                'type': 'ITEM',
                'id': plant,
                'amount': 1
            },
            'static': true,
            'level': 0
        })
    })
    let presses = [
        'ae2:calculation_processor_press',
        'ae2:engineering_processor_press',
        'ae2:logic_processor_press',
        'ae2:silicon_press'
    ]
    presses.forEach(press => {
        event.custom({
            'type': 'pneumaticcraft:amadron',
            'input': {
                'type': 'ITEM',
                'id': 'minecraft:emerald',
                'amount': 8
            },
            'output': {
                'type': 'ITEM',
                'id': press,
                'amount': 1
            },
            'static': true,
            'level': 0
        })
    })

    let animals = [
        'minecraft:axolotl_spawn_egg',
        'minecraft:bee_spawn_egg',
        'minecraft:cat_spawn_egg',
        'minecraft:chicken_spawn_egg',
        'minecraft:cow_spawn_egg',
        'minecraft:fox_spawn_egg',
        'minecraft:horse_spawn_egg',
        'minecraft:parrot_spawn_egg',
        'minecraft:pig_spawn_egg',
        'minecraft:rabbit_spawn_egg',
        'minecraft:ocelot_spawn_egg',
        'minecraft:sheep_spawn_egg'
    ]

    animals.forEach(animal => {
        event.custom({
            'type': 'pneumaticcraft:amadron',
            'input': {
                'type': 'ITEM',
                'id': 'minecraft:emerald',
                'amount': 6
            },
            'output': {
                'type': 'ITEM',
                'id': animal,
                'amount': 1
            },
            'static': true,
            'level': 0
        })
    })

    event.custom({
        'type': 'pneumaticcraft:amadron',
        'input': {
            'type': 'ITEM',
            'id': 'minecraft:emerald',
            'amount': 1
        },
        'output': {
            'type': 'ITEM',
            'id': 'immersiveengineering:raw_aluminum',
            'amount': 6
        },
        'static': true,
        'level': 0
    })


    event.custom({
        'type': 'pneumaticcraft:pressure_chamber',
        'inputs': [
            { 'item': 'water_bucket' }
        ],
        'pressure': 2.5,
        'results': [
            { 'item': 'ice' },
            { 'item': 'bucket' }
        ]
    })


    event.remove({ 'id': 'thermal:rf_coil' })
    event.custom({
        'type': 'cyclic:solidifier',
        'ingredients': [
            { 'item': 'gold_ingot' },
            { 'item': 'redstone' },
            { 'item': 'redstone' }
        ],
        'mix': {
            'fluid': 'water',
            'count': 500
        },
        'energy': {
            'rfpertick': 10,
            'ticks': 1800
        },
        'result': {
            'item': 'thermal:rf_coil',
        }
    })
    event.custom({
        'type': 'thermal:bottler',
        'ingredients': [
            {
                'fluid': 'thermal:redstone',
                'amount': 200
            },
            {
                'item': 'gold_ingot'
            }
        ],
        'result': [
            {
                'item': 'thermal:rf_coil'
            }
        ],
        'energy': 8000
    })

    event.custom({
        'type': 'thermal:bottler',
        'ingredients': [
            {
                'fluid': 'water',
                'amount': 1000
            },
            {
                'item': 'sand'
            }
        ],
        'result': [
            {
                'item': 'clay'
            }
        ],
        'energy': 1000
    })

    let mekOres = ['osmium', 'uranium']
    mekOres.forEach(ore => {
        event.remove({ 'id': `mekanism:processing/${ore}/ingot/from_dust_blasting` })
        event.remove({ 'id': `mekanism:processing/${ore}/ingot/from_dust_smelting` })
        event.remove({ 'id': `mekanism:processing/${ore}/ingot/from_raw_smelting` })
        event.remove({ 'id': `mekanism:processing/${ore}/ingot/from_raw_blasting` })
        event.remove({ 'id': `mekanism:processing/${ore}/ingot/from_ore_smelting` })
        event.remove({ 'id': `mekanism:processing/${ore}/ingot/from_ore_blasting` })
        event.remove({ 'id': `immersiveengineering:arcfurnace/raw_ore_${ore}` })
        event.remove({ 'id': `immersiveengineering:arcfurnace/raw_block_${ore}` })
        event.remove({ 'id': `immersiveengineering:arcfurnace/ore_${ore}` })
        event.remove({ 'id': `immersiveengineering:arcfurnace/dust_${ore}` })

        event.recipes.thermal.smelter(`mekanism:ingot_${ore}`, [`mekanism:dust_${ore}`, 'fire_charge']).energy(8000)
        event.recipes.thermal.smelter(`mekanism:ingot_${ore}`, [`mekanism:raw_${ore}`, 'fire_charge']).energy(8000)
    })

    event.remove({ 'id': '/immersiveengineering:smelting/ingot_uranium.*/' })

    event.recipes.thermal.smelter('minecraft:blaze_powder', ['minecraft:magma_block', '3x thermal:sulfur_dust']).energy(6000)
    event.recipes.minecraft.crafting_shaped('kubejs:osmium_gear', [
        ' I ',
        'INI',
        ' I '
    ], {
        'I': '#forge:ingots/osmium',
        'N': '#forge:nuggets/iron'
    })
    event.recipes.thermal.press('kubejs:osmium_gear', ['4x #forge:ingots/osmium', 'thermal:press_gear_die']).energy(2400)

    event.custom({
        'type': 'pneumaticcraft:pressure_chamber',
        'inputs': [
            {
                'item': 'thermal:redstone_bucket'
            },
            {
                'item': 'minecraft:dragon_egg'
            },
            {
                'type': 'pneumaticcraft:stacked_item',
                'item': 'thermal_extra:twinite_dust',
                'count': 16
            },
            {
                'type': 'pneumaticcraft:stacked_item',
                'item': 'minecraft:fire_charge',
                'count': 64
            },
            {
                'type': 'pneumaticcraft:stacked_item',
                'item': 'thermal:ice_charge',
                'count': 64
            },
            {
                'type': 'pneumaticcraft:stacked_item',
                'item': 'thermal:earth_charge',
                'count': 64
            },
            {
                'type': 'pneumaticcraft:stacked_item',
                'item': 'thermal:lightning_charge',
                'count': 64
            },
        ],
        'pressure': 4.5,
        'results': [
            {
                'item': 'kubejs:primal_mana_bucket'
            }
        ]
    })

    event.custom({
        'type': 'pneumaticcraft:pressure_chamber',
        'inputs': [
            {
                'item': 'cyclic:compressed_cobblestone'
            }
        ],
        'pressure': 1.6,
        'results': [
            {
                'item': 'sand',
                'count': 9
            }
        ]
    })

    event.recipes.minecraft.crafting_shaped('9x kubejs:mithril_ingot', ['kubejs:mithril_block'])
    event.recipes.minecraft.crafting_shaped('kubejs:mithril_block', [
        'AAA',
        'AAA',
        'AAA'
    ], { 'A': 'kubejs:mithril_ingot' })
    event.recipes.minecraft.crafting_shaped('kubejs:mithril_gear', [
        ' I ',
        'INI',
        ' I '
    ], {
        'I': '#forge:ingots/mithril',
        'N': '#forge:nuggets/iron'
    })
    event.recipes.thermal.press('kubejs:mithril_gear', ['4x #forge:ingots/mithril', 'thermal:press_gear_die']).energy(2400)

    event.custom({
        'type': 'pneumaticcraft:heat_frame_cooling',
        'input': {
            'item': 'blue_ice'
        },
        'max_temp': 123,
        'result': {
            'item': 'thermal:blizz_rod'
        }
    })

    event.recipes.thermal.press('blaze_rod', '4x blaze_powder')
    event.recipes.thermal.press('bone', '6x bone_meal')
    event.recipes.minecraft.crafting_shapeless('bone_meal', ['thermal:phytogro'])

    event.custom({
        'type': 'lychee:block_interacting',
        'item_in': { 'tag': 'forge:axes' },
        'block_in': { 'blocks': ['warped_stem'] },
        'post': [
            {
                'type': 'place',
                'block': 'stripped_warped_stem'
            },
            {
                'type': 'drop_item',
                'item': 'twisting_vines',
                'contextual': {
                    'type': 'chance',
                    'chance': 0.1
                }
            },
            { 'type': 'damage_item' }
        ]
    })

    event.custom({
        'type': 'lychee:block_interacting',
        'item_in': { 'tag': 'forge:axes' },
        'block_in': { 'blocks': ['crimson_stem'] },
        'post': [
            {
                'type': 'place',
                'block': 'stripped_crimson_stem'
            },
            {
                'type': 'drop_item',
                'item': 'weeping_vines',
                'contextual': {
                    'type': 'chance',
                    'chance': 0.1
                }
            },
            { 'type': 'damage_item' }
        ]
    })

    event.recipes.mekanism.enriching('miniutilities:ender_dust', 'twisting_vines')

    event.recipes.mekanism.enriching('mysticalagriculture:inferium_essence', 'thermal:phytogro')
    event.remove({ 'id': 'thermal:phyto_tnt' })
    event.recipes.minecraft.crafting_shaped('thermal:phyto_tnt', [
        'PPP',
        'PGP',
        'PPP'
    ], {
        'P': 'thermal:phytogro',
        'G': 'gunpowder'
    })
    event.recipes.mekanism.enriching('9x mysticalagriculture:inferium_essence', 'thermal:phyto_tnt')

    event.recipes.minecraft.crafting_shapeless('coal', ['charcoal'])

    event.remove({ 'id': 'ae2:smelting/silicon_from_certus_quartz_dust' })
    event.remove({ 'id': 'ae2:blasting/silicon_from_certus_quartz_dust' })

    event.recipes.thermal.smelter('4x ae2:silicon', ['3x sand', 'ae2:certus_quartz_dust', '#minecraft:coals']).energy(16000)
    event.recipes.thermal.smelter('mekanism:ingot_steel', ['iron_ingot', '4x mekanism:dust_coal']).energy(6000)
    event.recipes.thermal.smelter('mekanism:ingot_steel', ['iron_ingot', '4x mekanism:dust_charcoal']).energy(6000)
    event.recipes.thermal.pulverizer('ae2:certus_quartz_dust', '#ae2:all_certus_quartz').energy(2000)
    event.recipes.thermal.pulverizer('mekanism:dust_coal', 'coal').energy(2000)
    event.recipes.thermal.pulverizer('mekanism:dust_charcoal', 'charcoal').energy(2000)

    event.recipes.mekanism.crushing('thermal_extra:amethyst_dust', 'amethyst_shard');
    event.recipes.mekanism.crushing('thermal_extra:soul_sand_dust', 'soul_sand');

    event.custom({
        'type': 'thermal:bottler',
        'ingredients': [
            {
                'item': 'minecraft:blackstone'
            },
            {
                'fluid': 'thermal:ender',
                'amount': 250
            }
        ],
        'result': [
            {
                'item': 'minecraft:end_stone'
            }
        ],
        'energy': 4000
    })

    event.recipes.minecraft.crafting_shaped('crying_obsidian', [
        ' I ',
        'IOI',
        ' I '
    ], {
        'I': 'thermal:ice_charge',
        'O': 'obsidian'
    })

    event.recipes.minecraft.crafting_shaped('end_portal_frame', [
        'A A',
        'CCC',
        'EEE'
    ], {
        'A': 'amethyst_block',
        'C': 'crying_obsidian',
        'E': 'end_stone'
    })

    event.recipes.minecraft.crafting_shapeless('8x mekanism:dust_fluorite', [
        '8x glowstone_dust', 'thermal_extra:amethyst_dust'
    ])

    event.custom({
        'type': 'lychee:item_inside',
        'item_in': { 'item': 'glowstone_dust' },
        'block_in': { 'blocks': ['kubejs:primal_mana'] },
        'post': [
            {
                'type': 'drop_item',
                'item': 'mekanism:dust_fluorite'
            }
        ]
    })

    event.custom({
        'type': 'thermal:crystallizer',
        'ingredients': [
            {
                'fluid': 'lava',
                'amount': 2000
            },
            {
                'item': 'thermal_extra:amethyst_dust'
            }
        ],
        'result': [
            {
                'item': 'ae2:sky_stone_block'
            }
        ],
        'energy': 8000
    })

    event.custom({
        'type': 'thermal:crystallizer',
        'ingredients': [
            {
                'fluid': 'water',
                'amount': 500
            },
            {
                'item': 'dirt'
            }
        ],
        'result': [
            {
                'item': 'thermal:phytosoil'
            }
        ],
        'energy': 2500
    })

    event.remove({ 'id': 'thermal:phytosoil' })
    event.recipes.minecraft.crafting_shapeless('32x thermal:phytogro', [
        'thermal:phytosoil', 'thermal:apatite_dust', 'thermal:apatite_dust', 'thermal:niter_dust'
    ])

    event.remove({ 'id': 'immersiveengineering:crafting/gunpowder_from_dusts' })
})

onEvent('tags.fluids', event => {
    event.add('thermal:resin', ['thermal:resin'])
    event.add('thermal:latex', ['thermal:latex'])
})

onEvent('item.tags', event => {
    event.add('ae2:all_quartz_dust', ['mekanism:dust_quartz', 'thermal:quartz_dust'])
})
