import type { CoffeeRecommendation, CoffeeUserInput } from '../types';

// Coffee Recipe Database
export const coffeeRecipes: CoffeeRecommendation[] = [
  {
    name: 'Longan Honey Oat Latte',
    bean: 'Medium roast Brazil natural',
    taste: 'Nutty chocolate base',
    extraction: {
      barPressure: 9,
      preInfusion: 'Medium',
      totalTime: 28
    },
    milk: 'Oat',
    flavorAddOn: 'Longan honey infusion',
    description: 'Smooth nutty espresso with creamy oat milk and luxurious longan honey. Perfect for indulgent moments.',
    imageUrl: '/coffee-longan.jpg'
  },
  {
    name: 'Precision Focus Americano',
    bean: 'Light roast Ethiopian',
    taste: 'Fruity, floral notes',
    extraction: {
      barPressure: 9,
      preInfusion: 'High',
      totalTime: 25
    },
    milk: 'None',
    flavorAddOn: 'None',
    description: 'Single origin espresso with bright acidity for clean, focused energy. No dairy interference.',
    imageUrl: '/coffee-focus.jpg'
  },
  {
    name: 'Comfort Mocha Blend',
    bean: 'Medium roast Colombian',
    taste: 'Chocolate, cocoa',
    extraction: {
      barPressure: 9,
      preInfusion: 'Medium',
      totalTime: 26
    },
    milk: 'Dairy or Oat',
    flavorAddOn: 'High-quality cocoa powder + honey',
    description: 'Rich chocolate espresso drink for comfort and coziness. Nostalgic and warming.',
    imageUrl: '/coffee-mocha.jpg'
  },
  {
    name: 'Refreshing Cold Brew Citrus',
    bean: 'Light roast Kenya AA',
    taste: 'Bright, citrus',
    extraction: {
      barPressure: 0,
      preInfusion: 'Cold brew method',
      totalTime: 1440
    },
    milk: 'Almond',
    flavorAddOn: 'Fresh lemon, sparkling water',
    description: 'Cold, refreshing, bright acidity with natural citrus notes. Perfect for hot days.',
    imageUrl: '/coffee-citrus.jpg'
  },
  {
    name: 'Indulgent Vanilla Cortado',
    bean: 'Medium roast Sumatran',
    taste: 'Earthy, full-bodied',
    extraction: {
      barPressure: 10,
      preInfusion: 'Long',
      totalTime: 30
    },
    milk: 'Dairy or Oat',
    flavorAddOn: 'Madagascar vanilla, light sugar',
    description: 'Perfect milk-to-espresso ratio with velvety vanilla. Indulgent yet balanced.',
    imageUrl: '/coffee-vanilla.jpg'
  },
  {
    name: 'Performance Ristretto Shot',
    bean: 'Dark roast Indonesian',
    taste: 'Bold, smoky',
    extraction: {
      barPressure: 9,
      preInfusion: 'Low',
      totalTime: 20
    },
    milk: 'None',
    flavorAddOn: 'None',
    description: 'Concentrated, bold, high-caffeine shot for intense performance and alertness.',
    imageUrl: '/coffee-performance.jpg'
  }
];

// Rules-based Coffee Recommendation Engine
export const recommendCoffee = (input: CoffeeUserInput): CoffeeRecommendation => {
  let scores: Record<string, number> = {};
  
  // Initialize scores
  coffeeRecipes.forEach(recipe => {
    scores[recipe.name] = 0;
  });

  // Taste Profile Matching
  const tasteScores: Record<string, Record<string, number>> = {
    nutty: { 'Longan Honey Oat Latte': 3, 'Indulgent Vanilla Cortado': 2 },
    fruity: { 'Precision Focus Americano': 3, 'Refreshing Cold Brew Citrus': 2 },
    chocolatey: { 'Comfort Mocha Blend': 3, 'Longan Honey Oat Latte': 1 },
    floral: { 'Precision Focus Americano': 2, 'Indulgent Vanilla Cortado': 1 },
    smoky: { 'Performance Ristretto Shot': 3, 'Comfort Mocha Blend': 1 }
  };

  Object.entries(tasteScores[input.tasteProfile] || {}).forEach(([recipe, score]) => {
    scores[recipe] += score;
  });

  // Caffeine Level Matching
  switch (input.caffeineLevel) {
    case 'light':
      scores['Refreshing Cold Brew Citrus'] += 2;
      scores['Indulgent Vanilla Cortado'] += 1;
      scores['Performance Ristretto Shot'] -= 3;
      break;
    case 'standard':
      scores['Longan Honey Oat Latte'] += 2;
      scores['Comfort Mocha Blend'] += 2;
      scores['Precision Focus Americano'] += 1;
      break;
    case 'strong':
      scores['Performance Ristretto Shot'] += 3;
      scores['Precision Focus Americano'] += 2;
      scores['Longan Honey Oat Latte'] += 1;
      break;
  }

  // Milk Preference
  const milkScores: Record<string, Record<string, number>> = {
    dairy: { 'Comfort Mocha Blend': 2, 'Indulgent Vanilla Cortado': 2, 'Longan Honey Oat Latte': 1 },
    oat: { 'Longan Honey Oat Latte': 3, 'Comfort Mocha Blend': 2, 'Indulgent Vanilla Cortado': 1 },
    almond: { 'Refreshing Cold Brew Citrus': 3, 'Precision Focus Americano': 1 },
    none: { 'Precision Focus Americano': 3, 'Performance Ristretto Shot': 3 }
  };

  Object.entries(milkScores[input.milkPreference] || {}).forEach(([recipe, score]) => {
    scores[recipe] += score;
  });

  // Sweetness Level
  switch (input.sweetnessLevel) {
    case 'none':
      scores['Precision Focus Americano'] += 2;
      scores['Performance Ristretto Shot'] += 2;
      scores['Comfort Mocha Blend'] -= 1;
      scores['Indulgent Vanilla Cortado'] -= 1;
      break;
    case 'low':
      scores['Longan Honey Oat Latte'] += 1;
      scores['Indulgent Vanilla Cortado'] += 2;
      break;
    case 'medium':
      scores['Comfort Mocha Blend'] += 2;
      scores['Indulgent Vanilla Cortado'] += 2;
      break;
    case 'sweet':
      scores['Longan Honey Oat Latte'] += 3;
      scores['Comfort Mocha Blend'] += 2;
      break;
  }

  // Acidity Tolerance
  switch (input.acidityTolerance) {
    case 'low':
      scores['Comfort Mocha Blend'] += 2;
      scores['Indulgent Vanilla Cortado'] += 2;
      scores['Precision Focus Americano'] -= 2;
      scores['Refreshing Cold Brew Citrus'] -= 1;
      break;
    case 'medium':
      scores['Longan Honey Oat Latte'] += 1;
      scores['Precision Focus Americano'] += 1;
      break;
    case 'high':
      scores['Precision Focus Americano'] += 3;
      scores['Refreshing Cold Brew Citrus'] += 2;
      break;
  }

  // Mood Matching
  switch (input.mood) {
    case 'focus':
      scores['Precision Focus Americano'] += 3;
      scores['Performance Ristretto Shot'] += 3;
      break;
    case 'comfort':
      scores['Comfort Mocha Blend'] += 3;
      scores['Indulgent Vanilla Cortado'] += 3;
      break;
    case 'refreshing':
      scores['Refreshing Cold Brew Citrus'] += 3;
      scores['Precision Focus Americano'] += 2;
      break;
    case 'indulgent':
      scores['Longan Honey Oat Latte'] += 3;
      scores['Comfort Mocha Blend'] += 2;
      break;
  }

  // Find the recipe with the highest score
  let recommended = coffeeRecipes[0];
  let maxScore = scores[coffeeRecipes[0].name];

  coffeeRecipes.forEach(recipe => {
    if (scores[recipe.name] > maxScore) {
      maxScore = scores[recipe.name];
      recommended = recipe;
    }
  });

  return recommended;
};
