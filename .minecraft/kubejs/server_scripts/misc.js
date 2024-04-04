onEvent('recipes', event => {
    event.remove({ 'id': 'cyclic:crate' })
    event.remove({ 'id': '/cyclic:generator_.*/' })
    event.remove({ 'id': 'cyclic:crafter' })
    event.remove({ 'id': 'mysticalagriculture:machine_frame' })
    event.recipes.minecraft.crafting_shaped('2x cyclic:crate', [
        'ABA',
        'BCB',
        'ABA'
    ], {
        'A': 'chest',
        'B': 'stick',
        'C': 'sandstone'
    })
    event.recipes.minecraft.crafting_shaped('mysticalagriculture:machine_frame', [
        'SGS',
        'GCG',
        'SFS'
    ], {
        'S': '#forge:ingots/soul_infused',
        'G': 'pneumaticcraft:plastic',
        'C': 'thermal_extra:twinite_gear',
        'F': 'mekanism:steel_casing'
    })
    event.replaceInput('ALWAYS_TRUE', 'mysticalagriculture:soul_dust', 'thermal_extra:soul_sand_dust')
    event.replaceInput({ 'not': { 'id': 'mysticalagriculture:soulium_block' } }, 'mysticalagriculture:soulium_dust', 'thermal_extra:soul_infused_dust')
    event.replaceInput({ 'id': 'cyclic:lightning_scepter' }, '#forge:nuggets/netherite', 'minecraft:nether_star')
    event.replaceInput({ 'type': 'crafting_shaped' }, 'thermal:cinnabar_dust', 'redstone')
    event.replaceInput({ 'id': 'immersiveengineering:crafting/dynamo' }, 'immersiveengineering:component_iron', 'ae2:energy_acceptor')

    event.remove({ 'id': 'cyclic:uncrafter' })
    event.remove({ 'id': 'minecraft:end_crystal' })
    event.remove({ 'id': '/cyclic:.*_pipe/' })
    event.remove({ 'id': 'cyclic:miner' })
    event.remove({ 'id': 'cyclic:crusher' })
    event.remove({ 'id': 'cyclic:user' })

    event.remove({ 'id': 'mysticalagriculture:soulium_dagger' })
    event.recipes.minecraft.smithing('mysticalagriculture:soulium_dagger', 'golden_sword', 'thermal_extra:soul_infused_block')

    event.recipes.minecraft.crafting_shaped('cyclic:miner', [
        'LPL',
        'CDC',
        'DDD'
    ], {
        'L': 'lapis_block',
        'P': 'iron_pickaxe',
        'C': 'copper_ingot',
        'D': 'thermal:lead_ingot'
    })

    event.recipes.minecraft.crafting_shaped('cyclic:user', [
        'GOG',
        'CFC',
        'AWA'
    ], {
        'G': 'gold_ingot',
        'O': 'obsidian',
        'C': 'pneumaticcraft:printed_circuit_board',
        'F': 'thermal:machine_frame',
        'A': '#forge:gears/bronze',
        'W': 'thermal:rf_coil'
    })

    event.remove({ 'id': 'projectred_core:red_ingot' })
    event.recipes.thermal.smelter('projectred_core:red_ingot', ['copper_ingot', '3x redstone'])
    event.custom({
        'type': 'immersiveengineering:alloy',
        'time': 200,
        'result': {
            'item': 'projectred_core:red_ingot'
        },
        'input0': {
            'count': 3,
            'base_ingredient': {
                'item': 'redstone'
            }
        },
        'input1': {
            'item': 'copper_ingot'
        }
    })

    event.remove({ 'id': 'draconicevolution:potentiometer' })
    event.recipes.minecraft.crafting_shaped('draconicevolution:potentiometer', [
        'ACC',
        'CSC',
        'CCA'
    ], {
        'A': 'projectred_core:anode',
        'C': 'projectred_core:conductive_plate',
        'S': 'projectred_core:pointer'
    })

    event.remove({ 'id': 'mysticalagriculture:seed/infusion/fluorite' })
    event.remove({ 'id': 'mysticalagriculture:essence/mekanism/fluorite' })

    event.recipes.minecraft.crafting_shaped('hopper', [
        'M M',
        'MCM',
        ' M '
    ], {
        'M': '#forge:ingots/bronze',
        'C': '#forge:chests'
    })

    event.custom({
        'type': 'pneumaticcraft:amadron',
        'input': {
            'type': 'ITEM',
            'id': 'thermal:bronze_ingot',
            'amount': 3
        },
        'output': {
            'type': 'ITEM',
            'id': 'iron_ingot',
            'amount': 2
        },
        'static': true,
        'level': 0
    })

    event.remove({ 'id': 'entangled:block' })
    event.recipes.minecraft.crafting_shaped('entangled:block', [
        'PAP',
        'ETE',
        'PAP'
    ], {
        'P': '#forge:plates/soul_infused',
        'A': 'stripped_crimson_stem',
        'E': 'ender_pearl',
        'T': 'tinted_glass'
    })

    event.remove({ 'id': 'cyclic:battery_clay' })
    event.remove({ 'id': 'cyclic:battery' })

    event.recipes.minecraft.crafting_shaped('cyclic:battery', [
        'ICI',
        'SRS',
        'ICI'
    ], {
        'S': 'thermal:signalum_ingot',
        'C': 'thermal:rf_coil',
        'R': 'redstone_block',
        'I': 'thermal:invar_plate'
    })

    event.remove({ 'id': 'cyclic:wireless_energy' })
    event.remove({ 'id': 'cyclic:wireless_item' })
    event.remove({ 'id': 'cyclic:wireless_fluid' })

    event.recipes.minecraft.crafting_shaped('cyclic:wireless_item', [
        'IPI',
        'CAC',
        'ISI'
    ], {
        'I': 'thermal:invar_plate',
        'P': 'ender_pearl',
        'C': 'ae2:charged_certus_quartz_crystal',
        'A': 'cyclic:gem_amber',
        'S': 'cut_copper_slab'
    })
    event.recipes.minecraft.crafting_shapeless('cyclic:wireless_energy', [
        'cyclic:wireless_item',
        'fluxnetworks:flux_dust'
    ])
    event.recipes.minecraft.crafting_shapeless('cyclic:wireless_fluid', [
        'cyclic:wireless_item',
        'bucket'
    ])
    event.recipes.minecraft.crafting_shaped('shulker_shell', [
        'EEE',
        'E E',
        'EEE'
    ], {
        'E': 'mysticalagriculture:shulker_essence'
    })
    event.recipes.mekanism.metallurgic_infusing('rotten_flesh', '#forge:foods/meat/raw', '5x mekanism:fungi')
    event.remove({ 'id': 'cyclic:breaker' })
    event.recipes.minecraft.crafting_shaped('cyclic:breaker', [
        'AGA',
        'SDP',
        'BBB'
    ], {
        'A': 'andesite',
        'G': '#forge:gears/copper',
        'S': '#ae2:quartz_shovel',
        'D': 'dispenser',
        'P': '#ae2:quartz_pickaxe',
        'B': 'stone_brick_slab'
    })

    event.remove({ 'id': 'cyclic:forester' })
    event.recipes.minecraft.crafting_shaped('cyclic:forester', [
        'CQC',
        'AFA',
        'GWG'
    ], {
        'C': 'mekanism:elite_control_circuit',
        'Q': 'quartz_block',
        'A': '#ae2:quartz_axe',
        'F': 'thermal:machine_frame',
        'G': '#forge:gears/compressed_iron',
        'W': 'thermal:rf_coil'
    })

    event.remove({ 'id': 'cyclic:harvester' })
    event.recipes.minecraft.crafting_shaped('cyclic:harvester', [
        'CHC',
        'SFS',
        'GWG'
    ], {
        'C': 'mekanism:ultimate_control_circuit',
        'H': 'mekanismtools:refined_obsidian_hoe',
        'F': 'thermal:machine_frame',
        'S': 'thermal:silver_ingot',
        'G': '#forge:gears/emerald',
        'W': 'thermal:rf_coil'
    })

    event.remove({ 'id': 'cyclic:collector' })
    event.recipes.minecraft.crafting_shaped('cyclic:collector', [
        'CLC',
        'SFS',
        'GWG'
    ], {
        'C': 'iron_ingot',
        'L': 'lapis_lazuli',
        'F': 'cyclic:compressed_cobblestone',
        'S': 'thermal:silver_ingot',
        'G': '#forge:gears/tin',
        'W': 'thermal:redstone_servo'
    })

    event.replaceInput({ 'id': 'angelring:itemdiamondring' }, 'ghast_tear', 'thermal_extra:shellite_dust')
})

onEvent('item.tags', event => {
    const pickaxe = java('net.minecraftforge.common.ToolAction').get('pickaxe_dig')

    Item.getList().forEach(item => {
        if (item.getItemStack().canPerformAction(pickaxe)) {
            event.add('kubejs:pickaxes', item.id)
        }
    })
})