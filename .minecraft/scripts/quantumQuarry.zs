import mods.custommachinery.Context;
import mods.custommachinery.Result;
import mods.custommachinery.Machine;
import mods.custommachinery.CMRecipeModifierBuilder;
import mods.custommachinery.CMUpgradeBuilder;
import crafttweaker.api.util.random.Percentaged;
import crafttweaker.api.item.IItemStack;

public expand Percentaged<IItemStack> {
    public implicit as WeightedEntry<IItemStack> {
        return new WeightedEntry<IItemStack>(this.data, (this.percentage * 100) as int);
    }
}

public class Outputs {
    public static val outputs as WeightedList<IItemStack> = [
        (<item:minecraft:stone> % 200) as WeightedEntry<IItemStack>,
        <item:minecraft:granite> % 100,
        <item:minecraft:diorite> % 100,
        <item:minecraft:andesite> % 100,
        <item:minecraft:coal_ore> % 60,
        <item:minecraft:iron_ore> % 40,
        <item:minecraft:copper_ore> % 35,
        <item:minecraft:gold_ore> % 20,
        <item:minecraft:diamond_ore> % 2,
        <item:minecraft:lapis_ore> % 20,
        <item:minecraft:redstone_ore> % 24,
        <item:minecraft:emerald_ore> % 2,
        <item:thermal:tin_ore> % 28,
        <item:thermal:lead_ore> % 20,
        <item:thermal:silver_ore> % 20,
        <item:thermal:nickel_ore> % 24,
        <item:mekanism:osmium_ore> % 18,
        <item:mekanism:uranium_ore> % 15,
        <item:draconicevolution:overworld_draconium_ore> % 1,
        <item:mysticalagriculture:prosperity_ore> % 12
    ];
}


<recipetype:custommachinery:custom_machine>.create("flyingroad:quantum_quarry", 24)
    .requireEnergyPerTick(8000)
    .requireFluid(<fluid:thermal:ender>, 5)
    .requireFunctionOnEnd(ctx => {
        val machine = ctx.machine as Machine;
        val output = Outputs.outputs.pick(ctx.tile.level.random);
        for i in 0 .. 9 {
            val slotId = "output_" + i;
            if (machine.addItemToSlot(slotId, output, true).empty) {
                machine.addItemToSlot(slotId, output, false);
                return Result.success();
            } 
        }
        return Result.error("Output is full");
    })
    .build();

CMUpgradeBuilder.create(<item:thermal:upgrade_augment_1>)
    .machine("flyingroad:quantum_quarry")
    .modifier(CMRecipeModifierBuilder.mulInput(<requirementtype:custommachinery:energy_per_tick>, 1.5))
    .modifier(CMRecipeModifierBuilder.mulInput(<requirementtype:custommachinery:speed>, 0.5))
    .build();

CMUpgradeBuilder.create(<item:thermal:upgrade_augment_2>)
    .machine("flyingroad:quantum_quarry")
    .modifier(CMRecipeModifierBuilder.mulInput(<requirementtype:custommachinery:energy_per_tick>, 1.6666666))
    .modifier(CMRecipeModifierBuilder.mulInput(<requirementtype:custommachinery:speed>, 0.33333333))
    .build();

CMUpgradeBuilder.create(<item:thermal:upgrade_augment_3>)
    .machine("flyingroad:quantum_quarry")
    .modifier(CMRecipeModifierBuilder.mulInput(<requirementtype:custommachinery:energy_per_tick>, 1.875))
    .modifier(CMRecipeModifierBuilder.mulInput(<requirementtype:custommachinery:speed>, 0.25))
    .build();

CMUpgradeBuilder.create(<item:thermal_extra:upgrade_augment>)
    .machine("flyingroad:quantum_quarry")
    .modifier(CMRecipeModifierBuilder.mulInput(<requirementtype:custommachinery:energy_per_tick>, 2))
    .modifier(CMRecipeModifierBuilder.mulInput(<requirementtype:custommachinery:speed>, 0.166666666))
    .build();

craftingTable.addShaped('quantum_quarry', <item:custommachinery:custom_machine_item>.withTag({machine: "flyingroad:quantum_quarry" as string}), [
    [<item:mekanism:teleportation_core>, <item:thermal_extra:shellite_block>, <item:mekanism:teleportation_core>],
    [<item:minecraft:netherite_pickaxe>, <item:mekanism:steel_casing>, <item:minecraft:netherite_shovel>],
    [<item:thermal:enderium_gear>, <item:entangled:block>, <item:thermal:enderium_gear>]
]);