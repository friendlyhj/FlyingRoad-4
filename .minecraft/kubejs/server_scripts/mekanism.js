onEvent('recipes', event => {
    event.remove({'id': 'mekanism:steel_casing'})
    event.recipes.minecraft.crafting_shaped('mekanism:steel_casing', [
        'SGS',
        'GCG',
        'SFS'
    ], {
        'S': '#forge:ingots/steel',
        'G': 'thermal:obsidian_glass',
        'C': 'kubejs:osmium_gear',
        'F': 'thermal:machine_frame'
    })
    event.remove({'id': 'mekanism:metallurgic_infuser'})
    event.recipes.minecraft.crafting_shaped('mekanism:metallurgic_infuser', [
        'RRR',
        'RFR',
        'III'
    ], {
        'R': 'redstone',
        'F': 'mekanism:steel_casing',
        'I': '#forge:ingots/invar'
    })
});