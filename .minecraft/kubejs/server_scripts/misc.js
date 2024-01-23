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
    event.remove({'id': 'cyclic:uncrafter'})
})