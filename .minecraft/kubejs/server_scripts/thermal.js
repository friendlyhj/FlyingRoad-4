onEvent('recipes', event => {
    event.remove({id: 'thermal:device_rock_gen'})
    event.recipes.minecraft.crafting_shaped('thermal:device_rock_gen', [
        'LCL',
        'GPG',
        'LSL'
    ], {
        'L': '#forge:ingots/lead',
        'C': '#forge:gears/constantan',
        'G': 'glass',
        'P': 'piston',
        'S': 'hopper'
    })
    event.remove({'id': 'thermal:machine_frame'})
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
    event.replaceInput({'output': 'ae2:energy_acceptor'}, '#forge:ingots/copper', '#forge:ingots/signalum')
    event.replaceInput({'id': '/thermal:dynamo_.*/'}, 'redstone', 'ae2:energy_acceptor')
})