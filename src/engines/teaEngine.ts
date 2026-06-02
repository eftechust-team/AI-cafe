import type { TeaRecommendation, TeaUserInput } from '../types';

// Tea Blend Database - You can expand this with your actual tea blends
export const teaBlends: TeaRecommendation[] = [
  {
    name: 'Calm Restore Blend',
    function: 'Relaxation & Recovery',
    ingredients: ['Chamomile', 'Goji Berry', 'Lavender'],
    taste: 'Floral, Soothing',
    caffeine: 'Caffeine-free',
    bestFor: ['Sleep Support', 'Stress Relief', 'Digestion'],
    description: 'Chamomile and goji berry blend to support recovery and digestion. Caffeine-free, perfect for evening relaxation.',
    imageUrl: '/tea-calm.jpg'
  },
  {
    name: 'Focus & Clarity Tea',
    function: 'Mental Performance',
    ingredients: ['Green Tea', 'Ginseng', 'Ginkgo Biloba'],
    taste: 'Fresh, Herbal',
    caffeine: 'Moderate (25mg)',
    bestFor: ['Focus', 'Memory', 'Energy'],
    description: 'Green tea with adaptogenic herbs for sustained focus and mental clarity throughout the day.',
    imageUrl: '/tea-focus.jpg'
  },
  {
    name: 'Gut Guardian Blend',
    function: 'Digestive Support',
    ingredients: ['Ginger', 'Licorice Root', 'Fennel'],
    taste: 'Spicy, Warming',
    caffeine: 'Caffeine-free',
    bestFor: ['Digestion', 'Bloating Relief', 'Gut Health'],
    description: 'Traditional digestive tea with ginger and licorice root to support healthy digestion and reduce bloating.',
    imageUrl: '/tea-gut.jpg'
  },
  {
    name: 'Beauty Bloom Brew',
    function: 'Skin & Antioxidant Support',
    ingredients: ['Rose Petals', 'Hibiscus', 'Antioxidant Blend'],
    taste: 'Floral, Tart',
    caffeine: 'Caffeine-free',
    bestFor: ['Skin Health', 'Antioxidants', 'Collagen'],
    description: 'Rose and hibiscus blend rich in antioxidants to support skin health and natural collagen production.',
    imageUrl: '/tea-beauty.jpg'
  },
  {
    name: 'Immunity Warrior Tea',
    function: 'Immune System Support',
    ingredients: ['Turmeric', 'Ginger', 'Black Pepper', 'Honey'],
    taste: 'Warm, Spicy',
    caffeine: 'Caffeine-free',
    bestFor: ['Immunity', 'Anti-inflammatory', 'Cold Prevention'],
    description: 'Golden turmeric blend with black pepper to enhance absorption and support immune function.',
    imageUrl: '/tea-immunity.jpg'
  },
  {
    name: 'Energy Lift Blend',
    function: 'Sustained Energy',
    ingredients: ['Black Tea', 'Yerba Mate', 'Lemongrass'],
    taste: 'Citrusy, Energizing',
    caffeine: 'High (60mg)',
    bestFor: ['Energy', 'Alertness', 'Physical Performance'],
    description: 'Natural caffeine sources combined with B-vitamins for steady energy without the crash.',
    imageUrl: '/tea-energy.jpg'
  }
];

// Rules-based Tea Recommendation Engine
export const recommendTea = (input: TeaUserInput): TeaRecommendation => {
  let scores: Record<string, number> = {};
  
  // Initialize scores
  teaBlends.forEach(tea => {
    scores[tea.name] = 0;
  });

  // Scoring Logic Based on User Input
  
  // Energy Level Matching
  if (input.energyLevel === 'low') {
    scores['Energy Lift Blend'] += 3;
    scores['Focus & Clarity Tea'] += 2;
  } else if (input.energyLevel === 'balanced') {
    scores['Calm Restore Blend'] += 1;
    scores['Gut Guardian Blend'] += 1;
  } else if (input.energyLevel === 'high_anxious') {
    scores['Calm Restore Blend'] += 3;
    scores['Beauty Bloom Brew'] += 2;
  }

  // Sleep Quality Matching
  if (input.sleepQuality === 'poor') {
    scores['Calm Restore Blend'] += 3;
  } else if (input.sleepQuality === 'average') {
    scores['Focus & Clarity Tea'] += 2;
  } else if (input.sleepQuality === 'good') {
    scores['Energy Lift Blend'] += 2;
    scores['Focus & Clarity Tea'] += 1;
  }

  // Goal Matching
  switch (input.goal) {
    case 'focus':
      scores['Focus & Clarity Tea'] += 3;
      scores['Energy Lift Blend'] += 2;
      break;
    case 'relaxation':
      scores['Calm Restore Blend'] += 3;
      scores['Beauty Bloom Brew'] += 1;
      break;
    case 'digestion':
      scores['Gut Guardian Blend'] += 3;
      scores['Calm Restore Blend'] += 1;
      break;
    case 'immunity':
      scores['Immunity Warrior Tea'] += 3;
      scores['Gut Guardian Blend'] += 1;
      break;
    case 'hormonal_balance':
      scores['Beauty Bloom Brew'] += 3;
      scores['Calm Restore Blend'] += 2;
      break;
  }

  // Caffeine Sensitivity
  if (input.caffeineSensitive) {
    scores['Calm Restore Blend'] += 2;
    scores['Gut Guardian Blend'] += 2;
    scores['Beauty Bloom Brew'] += 2;
    scores['Immunity Warrior Tea'] += 2;
    scores['Focus & Clarity Tea'] -= 1;
    scores['Energy Lift Blend'] -= 3;
  } else {
    scores['Energy Lift Blend'] += 2;
    scores['Focus & Clarity Tea'] += 1;
  }

  // Flavor Preference
  const flavorScores: Record<string, Record<string, number>> = {
    floral: { 'Calm Restore Blend': 2, 'Beauty Bloom Brew': 3 },
    earthy: { 'Focus & Clarity Tea': 2, 'Gut Guardian Blend': 1 },
    fruity: { 'Energy Lift Blend': 2, 'Beauty Bloom Brew': 1 },
    bitter: { 'Focus & Clarity Tea': 2, 'Energy Lift Blend': 1 }
  };

  Object.entries(flavorScores[input.flavorPreference] || {}).forEach(([tea, score]) => {
    scores[tea] += score;
  });

  // Find the tea with the highest score
  let recommended = teaBlends[0];
  let maxScore = scores[teaBlends[0].name];

  teaBlends.forEach(tea => {
    if (scores[tea.name] > maxScore) {
      maxScore = scores[tea.name];
      recommended = tea;
    }
  });

  return recommended;
};
