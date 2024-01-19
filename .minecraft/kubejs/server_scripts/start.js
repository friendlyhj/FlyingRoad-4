onEvent('recipes', event => {
    event.recipes.minecraft.crafting_shapeless('kubejs:budding_andesite', [
        'rechiseled:andesite_brick_pattern_connecting', 'bone_meal'
    ])

    event.recipes.minecraft.crafting_shapeless('3x kubejs:budding_andesite', [
        'rechiseled:andesite_brick_pattern_connecting',
        'rechiseled:andesite_brick_pattern_connecting',
        'rechiseled:andesite_brick_pattern_connecting',
        'thermal:phytogro'
    ])

    event.custom({
        'type': 'lychee:block_clicking',
        'item_in': { 'tag': 'forge:pickaxes' },
        'block_in': { 'blocks': ['kubejs:andesite_bud'] },
        'post': [
            { 'type': 'damage_item', 'damage': 1 },
            { 'type': 'place', 'block': 'air' },
            {
                'type': 'random',
                'rolls': {
                    'min': 1,
                    'max': 2
                },
                'entries': [
                    { 'type': 'drop_item', 'item': 'thermal:apatite_dust', count: 1, weight: 1 },
                    { 'type': 'drop_item', 'item': 'thermal:niter_dust', count: 1, weight: 1 },
                    { 'type': 'drop_item', 'item': 'thermal:sulfur_dust', count: 1, weight: 1 },
                    { 'type': 'drop_item', 'item': 'kubejs:andesite_rock', count: 2, weight: 2 },
                ]
            }
        ]
    })

    event.remove({ output: 'rechiseled:chisel' })
    event.recipes.minecraft.crafting_shaped('rechiseled:chisel', [
        ['air', 'andesite'],
        ['stick', 'air']
    ])

    event.recipes.minecraft.crafting_shaped('andesite', ['AA', 'AA'], { A: 'kubejs:andesite_rock' })

    event.remove({ output: 'immersiveengineering:hammer' })
    event.recipes.minecraft.crafting_shaped('immersiveengineering:hammer', [
        ' SP',
        ' TS',
        'T  '
    ], {
        S: 'andesite',
        P: 'kubejs:andesite_rock',
        T: 'stick'
    })
    event.recipes.minecraft.crafting_shaped('furnace', [
        'SSS',
        'S S',
        'SSS'
    ], {
        S: 'andesite'
    })

    event.custom({
        'type': 'lychee:block_clicking',
        'item_in': { 'item': 'immersiveengineering:hammer' },
        'block_in': { 'blocks': ['minecraft:andesite', 'minecraft:cobblestone'] },
        'post': [
            { 'type': 'damage_item', 'damage': 1 },
            { 'type': 'place', 'block': 'minecraft:gravel' }
        ]
    })

    event.custom({
        'type': 'lychee:block_clicking',
        'item_in': { 'item': 'immersiveengineering:hammer' },
        'block_in': { 'blocks': ['gravel'] },
        'post': [
            { 'type': 'damage_item', 'damage': 1 },
            { 'type': 'place', 'block': 'sand' }
        ]
    })

    event.custom({
        'type': 'lychee:item_inside',
        'item_in': { 'item': 'sand' },
        'block_in': { 'blocks': ['water'] },
        'post': [
            {
                'type': 'drop_item',
                'item': 'clay'
            },
            {
                'type': 'place',
                'block': 'air'
            }
        ]
    })

    event.recipes.minecraft.crafting_shapeless('flint_and_steel', [
        'brick', 'flint'
    ]);

    event.custom({
        'type': 'lychee:item_exploding',
        'item_in': [
            { 'item': 'kubejs:andesite_rock' },
            { 'item': 'thermal:apatite_dust' }
        ],
        'post': [
            { 'type': 'drop_item', 'item': 'thermal:basalz_powder' }
        ]
    })

    event.custom({
        'type': 'lychee:block_interacting',
        'item_in': { 'item': 'thermal:earth_charge' },
        'block_in': { 'blocks': ['minecraft:gravel'] },
        'post': {
            'type': 'place',
            'block': 'lava',
            'contextual': {
                'type': 'chance',
                'chance': 0.5
            }
        }
    })

    event.custom({
        'type': 'lychee:item_exploding',
        'item_in': [
            { 'item': 'stone' },
            { 'item': 'andesite' },
            { 'item': 'gold_ingot' }
        ],
        'post': [
            { 'type': 'drop_item', 'item': 'kubejs:budding_mine' }
        ]
    })

    event.custom({
        'type': 'lychee:block_interacting',
        'item_in': { 'item': 'thermal:phytogro' },
        'block_in': { 'blocks': ['kubejs:budding_mine'] },
        'post': {
            'type': 'place',
            'block': 'kubejs:mine_bud',
            'offsetY': 1
        }
    })

    event.custom({
        'type': 'lychee:block_clicking',
        'item_in': { 'tag': 'forge:pickaxes' },
        'block_in': { 'blocks': ['kubejs:mine_bud'] },
        'post': [
            { 'type': 'damage_item', 'damage': 1 },
            { 'type': 'place', 'block': 'air' },
            {
                'type': 'random',
                'entries': [
                    { 'type': 'drop_item', 'item': 'minecraft:raw_iron', count: 1, weight: 200 },
                    { 'type': 'drop_item', 'item': 'minecraft:raw_copper', count: 1, weight: 175 },
                    { 'type': 'drop_item', 'item': 'thermal:raw_tin', count: 1, weight: 145 },
                    { 'type': 'drop_item', 'item': 'thermal:raw_nickel', count: 1, weight: 130 },
                    { 'type': 'drop_item', 'item': 'thermal:raw_silver', count: 1, weight: 125 },
                    { 'type': 'drop_item', 'item': 'thermal:raw_lead', count: 1, weight: 120 },
                    { 'type': 'drop_item', 'item': 'mekanism:raw_osmium', count: 1, weight: 100 },
                ]
            }
        ]
    })

    // event.custom({
    //     'type':'lychee:block_clicking',
    //     'item_in': { 'item': 'minecraft:wooden_sword' },
    //     'block_in': { 'blocks': ['block:minecraft:stone'] },
    //     'post':  {  'type': 'drop_item',  'item': 'item:minecraft:stick'}
    // })
})