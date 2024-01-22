onEvent('recipes', event => {
    let pipePattern = [
        'CCC',
        'IRI',
        'CCC'
    ]

    event.remove({mod: 'pipez'})
    event.recipes.minecraft.crafting_shaped('16x pipez:item_pipe', pipePattern, {
        'C': 'ceramics:porcelain_brick',
        'I': '#forge:ingots/iron',
        'R': 'redstone'
    })

    event.recipes.minecraft.crafting_shaped('16x pipez:fluid_pipe', pipePattern, {
        'C': 'ceramics:porcelain_brick',
        'I': '#forge:ingots/bronze',
        'R': 'redstone'
    })

    event.recipes.minecraft.crafting_shaped('16x pipez:energy_pipe', pipePattern, {
        'C': 'ceramics:porcelain_brick',
        'I': '#forge:ingots/electrum',
        'R': 'redstone'
    })

    event.recipes.minecraft.crafting_shaped('16x pipez:gas_pipe', pipePattern, {
        'C': 'ceramics:porcelain_brick',
        'I': '#forge:alloys/advanced',
        'R': 'redstone'
    })

    event.recipes.minecraft.crafting_shaped('6x pipez:universal_pipe', [
        'IFE',
        'MRM',
        'IFE'
    ], {
        'I': 'pipez:item_pipe',
        'F': 'pipez:fluid_pipe',
        'E': 'pipez:energy_pipe',
        'M': 'amethyst_shard',
        'R': 'redstone'
    })

    let upgradePattern = [
        'INI',
        'NUN',
        'INI'
    ]

    event.recipes.minecraft.crafting_shaped('pipez:basic_upgrade', upgradePattern, {
        'I': 'pneumaticcraft:ingot_iron_compressed',
        'N': 'lapis_lazuli',
        'U': 'amethyst_shard'
    })

    event.recipes.minecraft.crafting_shaped('pipez:improved_upgrade', upgradePattern, {
        'I': '#forge:ingots/electrum',
        'N': 'pneumaticcraft:plastic',
        'U': 'pipez:basic_upgrade'
    })

    event.recipes.minecraft.crafting_shaped('pipez:advanced_upgrade', upgradePattern, {
        'I': '#forge:ingots/lumium',
        'N': '#forge:alloys/elite',
        'U': 'pipez:improved_upgrade'
    })

    event.recipes.minecraft.crafting_shaped('pipez:ultimate_upgrade', upgradePattern, {
        'I': '#forge:ingots/enderium',
        'N': 'minecraft:netherite_ingot',
        'U': 'pipez:advanced_upgrade'
    })

    event.recipes.minecraft.crafting_shaped('pipez:filter_destination_tool', [
        ' R ',
        'PSP',
        'PAP'
    ], {
        'R': 'redstone_torch',
        'P': 'pneumaticcraft:plastic',
        'S': 'iron_ingot',
        'A': 'amethyst_shard'
    })
});