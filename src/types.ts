// Tea Recommendation Types
export interface TeaRecommendation {
  name: string;
  function: string;
  ingredients: string[];
  taste: string;
  caffeine: string;
  bestFor: string[];
  description: string;
  imageUrl: string;
}

// Coffee Recommendation Types
export interface CoffeeRecommendation {
  name: string;
  bean: string;
  taste: string;
  extraction: {
    barPressure: number;
    preInfusion: string;
    totalTime: number;
  };
  milk: string;
  flavorAddOn: string;
  description: string;
  imageUrl: string;
}

// Snack Recommendation Types
export interface SnackRecommendation {
  name: string;
  baseType: string;
  dietType: string;
  flavor: string;
  function: string;
  icon: string;
  topping: string;
  nutritionHighlight: string;
  description: string;
  imageUrl: string;
}

// User Input Types
export interface TeaUserInput {
  energyLevel: 'low' | 'balanced' | 'high_anxious';
  sleepQuality: 'poor' | 'average' | 'good';
  goal: 'focus' | 'relaxation' | 'digestion' | 'immunity' | 'hormonal_balance';
  caffeineSensitive: boolean;
  flavorPreference: 'floral' | 'earthy' | 'fruity' | 'bitter';
}

export interface CoffeeUserInput {
  tasteProfile: 'nutty' | 'fruity' | 'chocolatey' | 'floral' | 'smoky';
  caffeineLevel: 'light' | 'standard' | 'strong';
  milkPreference: 'dairy' | 'oat' | 'almond' | 'none';
  sweetnessLevel: 'none' | 'low' | 'medium' | 'sweet';
  acidityTolerance: 'low' | 'medium' | 'high';
  mood: 'focus' | 'comfort' | 'refreshing' | 'indulgent';
}

export interface SnackUserInput {
  dietType: 'high_protein' | 'keto' | 'vegan' | 'balanced';
  function: 'energy' | 'gut_support' | 'beauty' | 'muscle_recovery';
  flavor: 'chocolate' | 'berry' | 'matcha' | 'coffee' | 'citrus';
  icon: 'lightning' | 'heart' | 'brain' | 'leaf' | 'smile';
}

export type Category = 'tea' | 'coffee' | 'snack';
