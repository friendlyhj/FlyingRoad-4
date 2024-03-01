onEvent('recipes', event => {
    event.remove({ id: 'thermal:device_rock_gen' })
    event.recipes.minecraft.crafting_shaped('thermal:device_rock_gen', [
        'LCL',
        'GPG',
        'LSL'
    ], {
        'L': '#forge:ingots/lead',
        'C': '#forge:gears/constantan',
        'G': 'glass',
        'P': 'cyclic:compressed_cobblestone',
        'S': 'hopper'
    })
    event.remove({ 'id': 'thermal:machine_frame' })
    event.recipes.minecraft.crafting_shaped('thermal:machine_frame', [
        'MEM',
        'GCG',
        'MGM'
    ], {
        'M': 'iron_ingot',
        'E': 'pneumaticcraft:printed_circuit_board',
        'G': 'glass',
        'C': '#forge:gears/tin'
    })
    event.replaceInput({ 'output': 'ae2:energy_acceptor' }, '#forge:ingots/copper', '#forge:ingots/signalum')
    event.replaceInput({ 'id': '/thermal:dynamo_.*/' }, 'redstone', 'ae2:energy_acceptor')
    event.remove({ 'id': 'thermal:device_tree_extractor' })
    event.recipes.minecraft.crafting_shaped('thermal:device_tree_extractor', [
        'ACA',
        'GHG',
        'APA'
    ], {
        'A': '#minecraft:planks',
        'C': '#forge:gears/bronze',
        'H': 'quartz_block',
        'G': '#forge:glass',
        'P': 'thermal:redstone_servo'
    })
    event.remove({ 'output': 'thermal:energy_duct' })
    event.custom({
        'type': 'thermal:bottler',
        'ingredients': [
            {
                'item': 'kubejs:energy_duct_empty'
            },
            {
                'fluid': 'thermal:redstone',
                'amount': 200
            }
        ],
        'result': [
            {
                'item': 'thermal:energy_duct'
            }
        ],
        'energy': 600
    })
    event.recipes.minecraft.crafting_shaped('6x kubejs:energy_duct_empty', [
        'LGL'
    ], {
        'L': '#forge:ingots/lead',
        'G': '#thermal:glass/hardened'
    })
})