onEvent('recipes', event => {
    event.replaceInput({'id': 'pneumaticcraft:gps_tool'}, 'diamond', 'amethyst_shard')
    event.replaceInput({'id': 'pneumaticcraft:pneumatic_dynamo'}, 'pneumaticcraft:advanced_pressure_tube', 'redstone_block')

    event.remove({ 'id': 'pneumaticcraft:pressure_chamber_valve' })
})