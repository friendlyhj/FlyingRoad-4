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

    event.remove({'id': 'mysticalagriculture:soulium_dagger'})
    event.recipes.minecraft.smithing('mysticalagriculture:soulium_dagger', 'golden_sword', 'thermal_extra:soul_infused_block')
})