onEvent('recipes', event => {
    event.remove({id: 'thermal:device_rock_gen'})
    event.recipes.minecraft.crafting_shaped('thermal:device_rock_gen', [
        'LCL',
        'GPG',
        'LSL'
    ], {
        'L': '#forge:ingots/lead',
        'C': '#forge:gears/copper',
        'G': 'glass',
        'P': 'piston',
        'S': 'thermal:redstone_servo'
    })
})