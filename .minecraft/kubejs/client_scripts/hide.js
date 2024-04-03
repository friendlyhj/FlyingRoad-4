onEvent('jei.hide.items', event => {
	event.hide('cyclic:generator_fuel')
	event.hide('cyclic:generator_food')
	event.hide('cyclic:generator_fluid')
	event.hide('cyclic:generator_item')
	event.hide('cyclic:generator_solar')
})

onEvent('jei.remove.categories', event => {
	event.removeIf(category => category.getUid().toString().search(/cyclic:generator_.*/) != -1)
	event.removeIf(category => category.getUid().toString() == 'cyclic:crusher')
	event.removeIf(category => category.getUid().namespace == 'flyingroad')
})