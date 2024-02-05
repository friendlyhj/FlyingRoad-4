import crafttweaker.api.recipe.type.Recipe;
import crafttweaker.api.world.Container;
import crafttweaker.api.ingredient.type.IIngredientAny;
import crafttweaker.api.tag.type.KnownTag;
import crafttweaker.api.item.ItemDefinition;
import crafttweaker.api.item.IItemStack;

public expand KnownTag<ItemDefinition> {
    public get preferredItem as IItemStack {
        if (this.elements.length == 1) {
            return this.elements[0];
        }
        val modPriorities = ["minecraft", "thermal", "mekanism", "immersiveengineering"];
        for mod in modPriorities {
            for item in this.elements {
                val itemStack = item.defaultInstance;
                if (itemStack.registryName.namespace == mod) {
                    return itemStack;
                }
            }
        }
        return this.elements[0];
    }
}


craftingTable.addShapeless("soul_sand_dust", <item:thermal_extra:soul_sand_dust>, [
    <item:minecraft:soul_sand>, <item:immersiveengineering:hammer>.anyDamage().transformDamage(1)
]);

for recipe in craftingTable.getRecipesByOutput(IIngredientAny.getInstance().onlyIf("thermal extra augment", item => {
    val id = item.registryName;
    return id.namespace == "thermal_extra" && "augment" in id.path;
})) {
    var aRecipe as Recipe<Container> = recipe;
    var id = aRecipe.id;
    var ingredients = aRecipe.ingredients;
    if (ingredients.length == 9) {
        val toReplaceIndex as int[] = [1, 7];
        for index in toReplaceIndex {
            if (ingredients[index].matches(<item:thermal_extra:soul_infused_gear>)) {
                ingredients[index] = <item:ae2:calculation_processor>;
            }
            if (ingredients[index].matches(<item:thermal:enderium_gear>)) {
                ingredients[index] = <item:minecraft:end_stone>;
            }
            if (ingredients[index].matches(<item:thermal_extra:shellite_gear>)) {
                ingredients[index] = <item:mekanism:ultimate_control_circuit>;
            }
            if (ingredients[index].matches(<item:thermal_extra:twinite_gear>)) {
                ingredients[index] = <item:thermal:netherite_plate>;
            }
            if (ingredients[index].matches(<item:thermal_extra:dragonsteel_gear>)) {
                ingredients[index] = <item:draconicevolution:draconium_ingot>;
            }
        }
    }
    craftingTable.removeByName(id);
    craftingTable.addShaped(id.path + "_modified", aRecipe.resultItem, [
        [ingredients[0], ingredients[1], ingredients[2]],
        [ingredients[3], ingredients[4], ingredients[5]],
        [ingredients[6], ingredients[7], ingredients[8]]
    ]);
}

for recipe in craftingTable.getRecipesByOutput(<tag:items:forge:ingots>) {
    var itemTagManager = <tagmanager:items>;
    var aRecipe as Recipe<Container> = recipe;
    var id = aRecipe.id;
    var ingredients = aRecipe.ingredients;
    if (aRecipe.id.namespace == "mysticalagriculture") {
        val output = aRecipe.resultItem;
        val tags = itemTagManager.getTagsFor(output.definition);
        for tag in tags {
            val tagName = tag.id.toString();
            if (tagName.startsWith("forge:ingots/")) {
                val type = tagName["forge:ingots/".length .. tagName.length];
                val oreTagName = "forge:ores/" + type;
                if (itemTagManager.exists(oreTagName)) {
                    craftingTable.removeByName(id);
                    craftingTable.addShaped("ore_essence_" + type, itemTagManager.tag(oreTagName).preferredItem * output.amount, [
                        [ingredients[0], ingredients[1], ingredients[2]],
                        [ingredients[3], ingredients[4], ingredients[5]],
                        [ingredients[6], ingredients[7], ingredients[8]]
                    ]);
                }
            }
        }
    }
}
