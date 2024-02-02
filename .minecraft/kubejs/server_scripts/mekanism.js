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

    event.remove({'id': 'mekanism:nucleosynthesizing/dragon_egg'})
    event.remove({'output': 'mekanismgenerators:heat_generator'})
    event.remove({'output': 'mekanismgenerators:wind_generator'})
    event.remove({'output': 'mekanismgenerators:gas_burning_generator'})

    event.recipes.minecraft.crafting_shaped('mekanismgenerators:wind_generator', [
        ' G ',
        'PCP',
        'PRP'
    ], {
        'G': 'kubejs:osmium_gear',
        'P': 'pneumaticcraft:plastic',
        'C': 'mekanism:advanced_control_circuit',
        'R': 'ae2:energy_acceptor'
    })

    event.recipes.minecraft.crafting_shaped('mekanismgenerators:gas_burning_generator', [
        'ETE',
        'PFP',
        'CRC'
    ], {
        'E': 'mekanism:elite_control_circuit',
        'T': 'mekanism:basic_chemical_tank',
        'P': 'ae2:fluix_block',
        'R': 'ae2:energy_acceptor',
        'F': 'mekanism:steel_casing',
        'C': '#forge:gears/invar'
    })

});