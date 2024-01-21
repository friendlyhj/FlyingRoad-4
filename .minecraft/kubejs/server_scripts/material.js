onEvent('recipes', event => {
    event.recipes.minecraft.crafting_shapeless('4x kubejs:andesite_rock', [
        'minecraft:andesite', 'thermal:earth_charge'
    ])

    event.remove({id: 'thermal:earth_charge/apatite_dust_from_apatite'})
    event.remove({id: 'thermal:earth_charge/sulfur_dust_from_sulfur'})
    event.remove({id: 'thermal:earth_charge/cinnabar_dust_from_cinnabar'})
    event.remove({id: 'thermal:earth_charge/niter_dust_from_niter'})

    let crystals = [
        ['apatite', 'thermal:apatite_dust'],
        ['sulfur', 'thermal:sulfur_dust'],
        ['cinnabar', 'minecraft:redstone'],
        ['niter', 'thermal:niter_dust'],
        ['kubejs:glowing_gem', 'minecraft:glowstone_dust']
    ]

    crystals.forEach(entry => {
        let name = entry[0]
        let result = entry[1]

        let input = `thermal:${name}`
        if (name.indexOf(':') != -1) {
            input = name
        } else {
            event.remove({id: `thermal:earth_charge/${name}_dust_from_${name}`})
            event.remove({id: `thermal:machines/pulverizer/pulverizer_${name}`})
            event.remove({id: `thermal:machines/crystallizer/crystallizer_${name}`})
        }
        let output = `6x ${result}`
        event.recipes.minecraft.crafting_shapeless(output, [
            input, 'thermal:earth_charge'
        ])
        event.recipes.thermal.pulverizer(output, input).energy(4000)
        event.custom({
            'type': 'pneumaticcraft:pressure_chamber',
            'inputs': [
              {
                'item': input
              }
            ],
            'pressure': 1.0,
            'results': [
              {
                'item': result,
                'count': 6
              }
            ]
        })
    })

    event.custom({
        'type': 'pneumaticcraft:thermo_plant',
        'item_input': {
          'item': 'thermal:sulfur_dust'
        },
        'fluid_input': {
          'type': 'pneumaticcraft:fluid',
          'tag': 'thermal:resin',
          'amount': 100
        },
        'fluid_output': {
          'fluid': 'pneumaticcraft:plastic',
          'amount': 250
        },
        'temperature': {
          'min_temp': 423
        },
        'speed': 0.25,
        'pressure': 2.0,
        'exothermic': false
      })

    event.remove({id: 'pneumaticcraft:pressure_chamber/etching_acid'})
    event.custom({
        'type': 'pneumaticcraft:pressure_chamber',
        'inputs': [
            {
                'item': 'pneumaticcraft:plastic_bucket'
            },
            {
                'type': 'pneumaticcraft:stacked_item',
                'item': 'thermal:sulfur_dust',
                'count': 4
            },
            {
                'type': 'pneumaticcraft:stacked_item',
                'item': 'minecraft:gunpowder',
                'count': 2
            },
            {
                'item': 'minecraft:glowstone_dust'
            }
        ],
        'pressure': 2.0,
        'results': [
            {
                'item': 'pneumaticcraft:etching_acid_bucket'
            }
        ]
    })
})

onEvent('tags.fluids', event => {
    event.add('thermal:resin', ['thermal:resin'])
})