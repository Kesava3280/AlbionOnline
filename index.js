const tierRequirements = {
    2: [1, 0],
    3: [2, 1],
    4: [2, 1],
    5: [3, 1],
    6: [4, 1],
    7: [5, 1],
    8: [5, 1],
  };
  
  function calculateRefiningCost(tier, rawMaterialCosts, refinedCosts) {
    const requirements = tierRequirements[tier];
    if (!requirements) {
      throw new Error("Invalid tier. Please select a tier between 1 and 8.");
    }
    const [materialMultiplier, refinedMultiplier] = requirements;
    return materialMultiplier * rawMaterialCosts + refinedMultiplier * refinedCosts;
  }
  
  function calculateSellingPrice(initialUnits, costPerUnit, refiningBonus, profitPercentage, taxRate) {
    const refiningRatio = refiningBonus / 100;
    const totalRefinedUnits = initialUnits / (1 - refiningRatio);
    const totalCost = initialUnits * costPerUnit;
    const costPerRefinedUnit = totalCost / totalRefinedUnits;
    const requiredRevenuePerUnit = costPerRefinedUnit * (1 + profitPercentage / 100);
    const sellingPrice = requiredRevenuePerUnit / (1 - taxRate / 100);
    return { totalRefinedUnits, sellingPrice };
  }
  
  document.getElementById("calculatorForm").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const tier = parseInt(document.getElementById("tier").value);
    const rawMaterialCosts = parseFloat(document.getElementById("rawMaterialCosts").value);
    const refinedCosts = parseFloat(document.getElementById("refinedCosts").value);
    const refiningBonus = parseFloat(document.getElementById("refiningBonus").value);
    const profitPercentage = parseFloat(document.getElementById("profitPercentage").value);
    const taxRate = parseFloat(document.getElementById("taxRate").value);
    
    const initialUnits = 9999;  // Fixed value for initial units
  
    try {
      const totalCost = calculateRefiningCost(tier, rawMaterialCosts, refinedCosts);
      const { totalRefinedUnits, sellingPrice } = calculateSellingPrice(
        initialUnits,
        totalCost,
        refiningBonus,
        profitPercentage,
        taxRate
      );
  
      document.getElementById("totalRefinedUnits").textContent = `Total Refined Units: ${totalRefinedUnits.toFixed(2)}`;
      document.getElementById("sellingPrice").textContent = `Selling Price per Unit: $${sellingPrice.toFixed(2)}`;
    } catch (error) {
      alert(error.message);
    }
  });
  