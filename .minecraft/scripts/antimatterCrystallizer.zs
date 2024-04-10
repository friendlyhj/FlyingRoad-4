import mods.mekanism.api.ingredient.ItemStackIngredient;
import mods.custommachinery.Result;
import crafttweaker.api.block.entity.BlockEntity;
import crafttweaker.api.world.Level;

<recipetype:custommachinery:custom_machine>.create("flyingroad:antimatter_crystallizer", 400)
    .requireEnergyPerTick(1000000)
    .requireGas(<gas:mekanism:antimatter> * 250)
    .requireFunctionToStart(ctx => checkCoil(ctx.tile, false) ? Result.success() : Result.error("no coil"))
    .requireFunctionOnEnd(ctx => checkCoil(ctx.tile, true) ? Result.success() : Result.error("no coil"))
    .produceItem(<item:mekanism:pellet_antimatter>)
    .build();

craftingTable.addShaped("antimatter_crystallizer", <item:custommachinery:custom_machine_item>.withTag({machine: "flyingroad:antimatter_crystallizer" as string}), [
    [<item:kubejs:mithril_block>, <item:mekanism:supercharged_coil>, <item:kubejs:mithril_block>],
    [<item:thermal_extra:rf_coil_xfer_augment_5>, <item:mekanism:chemical_crystallizer>, <item:thermal_extra:rf_coil_xfer_augment_5>],
    [<item:kubejs:mithril_block>, <item:mekanism:supercharged_coil>, <item:kubejs:mithril_block>]
]);

recipes.removeByName(['mekanism:processing/lategame/antimatter_pellet/from_gas', 'mekanism:processing/lategame/antimatter/from_pellet']);
<recipetype:mekanism:oxidizing>.addRecipe("antimatter_from_pellet", ItemStackIngredient.from(<item:mekanism:pellet_antimatter>), <gas:mekanism:antimatter> * 250);

public function checkCoil(te as BlockEntity, burn as bool) as bool {
    val level = te.level;
    val pos = te.blockPos;
    for i in 0 .. 3 {
        for j in 0 .. 3 {
            for z in ([1, -1] as int[]) {
                val offset = pos.offset(i - 1, z, j - 1);
                val block = level.getBlockState(offset);
                if (i == 1 && j == 1) {
                    if (block != <blockstate:mekanismgenerators:electromagnetic_coil>) {
                        return false;
                    }
                } else if (block == <blockstate:immersiveengineering:coil_mv>) {
                    if (burn) {
                        level.setBlockAndUpdate(offset, <blockstate:kubejs:burnt_electrum_coil_block>);
                    }
                } else {
                    return false;
                }
            }
        }
    }
    return true;
}

furnace.addRecipe("electrum_coil_recycle", <item:thermal:electrum_ingot> * 2, <item:kubejs:burnt_electrum_coil_block>, 0, 200);
