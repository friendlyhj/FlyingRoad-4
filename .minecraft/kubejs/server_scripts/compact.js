onEvent('recipes', event => {
    event.remove({ 'id': '/compactmachines:machine_.*/' })
    event.remove({ 'id': 'compactmachines:wall' })

    let map = [
        ['minecraft:copper_block', 'compactmachines:machine_tiny', 3],
        ['minecraft:iron_block', 'compactmachines:machine_small', 3],
        ['gold_block', 'compactmachines:machine_normal', 3],
        ['pneumaticcraft:compressed_iron_block', 'compactmachines:machine_large', 5],
        ['diamond_block', 'compactmachines:machine_giant', 5],
        ['netherite_block', 'compactmachines:machine_maximum', 7]
    ]

    map.forEach(entry => {
        let core = entry[0]
        let result = entry[1]
        let size = entry[2]
        let layers = new Array(size);
        let centerPos = (size - 1) / 2
        layers.fill({
            'type': 'compactcrafting:hollow',
            'wall': 'W'
        })
        layers[0] = {
            'type': 'compactcrafting:filled',
            'component': 'W'
        }
        layers[layers.length - 1] = {
            'type': 'compactcrafting:filled',
            'component': 'W'
        }
        let centerPattern = new Array(size).fill(0).map((it, index) => {
            if (index == 0 || index == size - 1) {
                return new Array(size).fill('W')
            } else {
                let array = new Array(size).fill('-')
                array[0] = 'W'
                array[array.length - 1] = 'W'
                if (index == centerPos) {
                    array[centerPos] = 'C'
                }
                return array;
            }
        })
        layers[centerPos] = {
            'type': 'compactcrafting:mixed',
            'pattern': centerPattern
        }
        event.custom({
            'type': 'compactcrafting:miniaturization',
            'recipeSize': size,
            'layers': layers,
            'components': {
                'W': {
                    'type': 'compactcrafting:block',
                    'block': 'compactmachines:wall'
                },
                'C': {
                    'type': 'compactcrafting:block',
                    'block': core
                }
            },
            'catalyst': {
                'id': 'ender_pearl',
                'Count': 1
            },
            'outputs': [{ 'id': result, 'Count': 1 }]
        })
    })

    event.custom({
        'type': 'compactcrafting:miniaturization',
        'layers': [
            {
                'type': 'compactcrafting:mixed',
                'pattern': [['R']]
            },
            {
                'type': 'compactcrafting:mixed',
                'pattern': [['I']]
            }
        ],
        'catalyst': {
            'id': 'redstone',
            'Count': 1
        },
        'components': {
            'R': {
                'type': 'compactcrafting:block',
                'block': 'redstone_wire'
            },
            'I': {
                'type': 'compactcrafting:block',
                'block': 'thermal:lead_block'
            }
        },
        'outputs': [{ 'id': 'compactmachines:wall', 'Count': 16 }]
    })

    event.custom({
        'type': 'compactcrafting:miniaturization',
        'layers': [
            {
                'type': 'compactcrafting:mixed',
                'pattern': [
                    ['-', '-', '-'],
                    ['-', 'H', '-'],
                    ['-', '-', '-']
                ]
            },
            {
                'type': 'compactcrafting:mixed',
                'pattern': [
                    ['R', 'R', 'R'],
                    ['R', 'W', 'R'],
                    ['R', 'R', 'R']
                ]
            }
        ],
        'catalyst': {
            'id': 'redstone',
            'Count': 1
        },
        'components': {
            'R': {
                'type': 'compactcrafting:block',
                'block': 'redstone_wire'
            },
            'W': {
                'type': 'compactcrafting:block',
                'block': 'compactmachines:wall'
            },
            'H': {
                'type': 'compactcrafting:block',
                'block': 'hopper'
            }
        },
        'outputs': [{ 'id': 'compactmachines:tunnel', 'Count': 1 }]
    })


})