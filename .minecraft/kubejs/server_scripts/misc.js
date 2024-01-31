onEvent('recipes', event => {
    event.remove({'id': 'cyclic:crate'})
    event.remove({'id': '/cyclic:generator_.*/'})
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
    event.replaceInput({ 'not' : { 'id': 'mysticalagriculture:soulium_block' } }, 'mysticalagriculture:soulium_dust', 'thermal_extra:soul_infused_dust')
    event.replaceInput({ 'id': 'cyclic:lightning_scepter'}, '#forge:nuggets/netherite', 'minecraft:nether_star')
    event.replaceInput({ 'type': 'crafting_shaped' }, 'thermal:cinnabar_dust', 'redstone')
    event.replaceInput({ 'id': 'immersiveengineering:crafting/dynamo'}, 'immersiveengineering:component_iron', 'ae2:energy_acceptor')
    event.replaceInput({ 'id': 'miniutilities:solar_panel_controller'}, 'redstone_block', 'ae2:energy_acceptor')

    event.remove({'id': 'cyclic:uncrafter'})
    event.remove({'id': 'minecraft:end_crystal'})
    event.remove({'id': '/cyclic:.*_pipe/'})
    event.remove({'id': 'cyclic:miner'})
    event.remove({'id': 'cyclic:crusher'})
    event.remove({'id': 'cyclic:user'})

    event.remove({'id': 'mysticalagriculture:soulium_dagger'})
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

    event.remove({ 'id': 'cyclic:eye_teleport' })
    event.remove({ 'id': 'cyclic:eye_teleport_rev' })
    event.recipes.minecraft.crafting_shaped('cyclic:eye_teleport', [
        'EEE',
        'EOE',
        'EEE'
    ], {
        'E': 'ender_pearl',
        'O': 'obsidian'
    })
})

onEvent('item.tags', event => {
    event.remove('forge:storage_blocks', 'cyclic:eye_teleport')
    event.remove('forge:storage_blocks/ender_pearl', 'cyclic:eye_teleport')
})