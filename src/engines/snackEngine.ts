import type { SnackRecommendation, SnackUserInput } from '../types';

// Snack Database
export const snackRecipes: SnackRecommendation[] = [
  {
    name: 'Protein Power Cookie',
    baseType: 'Whole grain oat cookie',
    dietType: 'High protein',
    flavor: 'Chocolate peanut',
    function: 'Muscle recovery',
    icon: 'lightning',
    topping: 'Protein paste with cocoa + peanut dust',
    nutritionHighlight: '15g protein per cookie',
    description: 'High-protein cookie with plant-based protein blend and peanut topping for post-workout recovery.',
    imageUrl: '/snack-protein.jpg'
  },
  {
    name: 'Beauty Berries Bar',
    baseType: 'Almond flour cookie',
    dietType: 'Vegan',
    flavor: 'Berry mixed',
    function: 'Beauty',
    icon: 'heart',
    topping: 'Berry antioxidant puree with edible flowers',
    nutritionHighlight: 'Rich in anthocyanins',
    description: 'Antioxidant-rich berry puree on vegan base for skin and collagen support.',
    imageUrl: '/snack-beauty.jpg'
  },
  {
    name: 'Keto Brain Fuel',
    baseType: 'Almond & coconut base',
    dietType: 'Keto',
    flavor: 'Matcha citrus',
    function: 'Focus',
    icon: 'brain',
    topping: 'Matcha green tea paste + lemon zest',
    nutritionHighlight: 'Low carb, high fat',
    description: 'Keto-friendly cookie with matcha and citrus for sustained focus and mental clarity.',
    imageUrl: '/snack-keto.jpg'
  },
  {
    name: 'Gut Health Digest',
    baseType: 'Fiber-rich seed cookie',
    dietType: 'Balanced',
    flavor: 'Ginger spice',
    function: 'Gut support',
    icon: 'leaf',
    topping: 'Ginger-turmeric anti-inflammatory paste',
    nutritionHighlight: '12g dietary fiber',
    description: 'Digestive-support cookie with ginger and prebiotic ingredients for gut wellness.',
    imageUrl: '/snack-gut.jpg'
  },
  {
    name: 'Energy Citrus Bite',
    baseType: 'Whole grain cookie',
    dietType: 'High protein',
    flavor: 'Citrus orange',
    function: 'Energy',
    icon: 'lightning',
    topping: 'Citrus-carrot puree with goji berries',
    nutritionHighlight: 'Natural energy from fruits + 12g protein',
    description: 'Energizing cookie with citrus brightness and sustained energy from complex carbs and protein.',
    imageUrl: '/snack-energy.jpg'
  },
  {
    name: 'Smile Matcha Dream',
    baseType: 'Green tea cookie',
    dietType: 'Vegan',
    flavor: 'Matcha vanilla',
    function: 'Beauty',
    icon: 'smile',
    topping: 'Matcha cream paste with vanilla bean flecks',
    nutritionHighlight: 'Rich in L-theanine',
    description: 'Calm and joyful matcha cookie with vanilla. Perfect for mood and focus together.',
    imageUrl: '/snack-matcha.jpg'
  }
];

// Rules-based Snack Recommendation Engine
export const recommendSnack = (input: SnackUserInput): SnackRecommendation => {
  let scores: Record<string, number> = {};
  
  // Initialize scores
  snackRecipes.forEach(snack => {
    scores[snack.name] = 0;
  });

  // Diet Type Matching
  const dietScores: Record<string, Record<string, number>> = {
    high_protein: { 'Protein Power Cookie': 3, 'Energy Citrus Bite': 2 },
    keto: { 'Keto Brain Fuel': 3, 'Beauty Berries Bar': 1 },
    vegan: { 'Beauty Berries Bar': 3, 'Smile Matcha Dream': 3 },
    balanced: { 'Gut Health Digest': 3, 'Energy Citrus Bite': 2 }
  };

  Object.entries(dietScores[input.dietType] || {}).forEach(([snack, score]) => {
    scores[snack] += score;
  });

  // Function Matching
  const functionScores: Record<string, Record<string, number>> = {
    energy: { 'Energy Citrus Bite': 3, 'Protein Power Cookie': 2 },
    gut_support: { 'Gut Health Digest': 3, 'Energy Citrus Bite': 1 },
    beauty: { 'Beauty Berries Bar': 3, 'Smile Matcha Dream': 2 },
    muscle_recovery: { 'Protein Power Cookie': 3, 'Energy Citrus Bite': 2 }
  };

  Object.entries(functionScores[input.function] || {}).forEach(([snack, score]) => {
    scores[snack] += score;
  });

  // Flavor Matching
  const flavorScores: Record<string, Record<string, number>> = {
    chocolate: { 'Protein Power Cookie': 3, 'Keto Brain Fuel': 1 },
    berry: { 'Beauty Berries Bar': 3, 'Energy Citrus Bite': 1 },
    matcha: { 'Keto Brain Fuel': 2, 'Smile Matcha Dream': 3 },
    coffee: { 'Protein Power Cookie': 1, 'Keto Brain Fuel': 1 },
    citrus: { 'Energy Citrus Bite': 3, 'Smile Matcha Dream': 1 }
  };

  Object.entries(flavorScores[input.flavor] || {}).forEach(([snack, score]) => {
    scores[snack] += score;
  });

  // Icon Preference (visual/fun factor)
  const iconScores: Record<string, Record<string, number>> = {
    lightning: { 'Energy Citrus Bite': 2, 'Protein Power Cookie': 2 },
    heart: { 'Beauty Berries Bar': 3, 'Smile Matcha Dream': 1 },
    brain: { 'Keto Brain Fuel': 3, 'Smile Matcha Dream': 2 },
    leaf: { 'Gut Health Digest': 3, 'Beauty Berries Bar': 1 },
    smile: { 'Smile Matcha Dream': 3, 'Beauty Berries Bar': 1 }
  };

  Object.entries(iconScores[input.icon] || {}).forEach(([snack, score]) => {
    scores[snack] += score;
  });

  // Find the snack with the highest score
  let recommended = snackRecipes[0];
  let maxScore = scores[snackRecipes[0].name];

  snackRecipes.forEach(snack => {
    if (scores[snack.name] > maxScore) {
      maxScore = scores[snack.name];
      recommended = snack;
    }
  });

  return recommended;
};
