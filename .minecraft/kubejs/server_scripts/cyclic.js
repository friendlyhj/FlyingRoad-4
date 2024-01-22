onEvent('recipes', event => {
    event.remove({'id': 'cyclic:crate'})
    event.remove({'id': '/cyclic:generator_.*/'})
    event.recipes.minecraft.crafting_shaped('2x cyclic:crate', [
        'ABA',
        'BCB',
        'ABA'
    ], {
        'A': 'chest',
        'B': 'stick',
        'C': 'sandstone'
    })
    event.remove({'id': 'cyclic:uncrafter'})
})