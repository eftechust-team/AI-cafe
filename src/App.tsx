import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider, useCart } from './context/CartContext';
import HelloScreen from './components/HelloScreen';
import FacialRecognitionScreen from './components/FacialRecognitionScreen';
import LandingScreen from './components/LandingScreen';
import QuestionFlow from './components/QuestionFlow';
import RecommendationScreen from './components/RecommendationScreen';
import BiscuitShapeSelector from './components/BiscuitShapeSelector';
import AIDrawingGenerator from './components/AIDrawingGenerator';
import BiscuitPreview from './components/BiscuitPreview';
import ShoppingCartScreen from './components/ShoppingCartScreen';
import FloatingCartButton from './components/FloatingCartButton';
import FloatingCartPanel from './components/FloatingCartPanel';
import BeverageSelectionScreen from './components/BeverageSelectionScreen';

type AppScreen = 'hello' | 'facial_recognition' | 'landing' | 'questions' | 'recommendation' | 'beverage_selection' | 'biscuit_shape' | 'ai_drawing' | 'biscuit_preview' | 'cart';
type Category = 'tea' | 'coffee' | 'snack';

const AppContent: React.FC = () => {
  const { addToCart } = useCart();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('hello');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [biscuitShape, setBiscuitShape] = useState<'round' | 'rectangle' | null>(null);
  const [biscuitContent, setBiscuitContent] = useState<string | null>(null);
  const [biscuitImageSrc, setBiscuitImageSrc] = useState<string | null>(null);
  const [isCartPanelOpen, setIsCartPanelOpen] = useState(false);

  const teaQuestions = [
    { id: 'energyLevel', question: 'How is your energy level?', type: 'single' as const, options: [{ value: 'low', label: 'Low' }, { value: 'balanced', label: 'Balanced' }, { value: 'high_anxious', label: 'High & Anxious' }] },
    { id: 'sleepQuality', question: 'How did you sleep?', type: 'single' as const, options: [{ value: 'poor', label: 'Poor' }, { value: 'average', label: 'Average' }, { value: 'good', label: 'Good' }] },
    { id: 'goal', question: 'What is your goal?', type: 'single' as const, options: [{ value: 'focus', label: 'Focus' }, { value: 'relaxation', label: 'Relaxation' }, { value: 'digestion', label: 'Digestion' }, { value: 'immunity', label: 'Immunity' }, { value: 'hormonal_balance', label: 'Hormone Balance' }] },
    { id: 'caffeineSensitive', question: 'Caffeine sensitive?', type: 'single' as const, options: [{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }] },
    { id: 'flavorPreference', question: 'Flavor preference?', type: 'single' as const, options: [{ value: 'floral', label: 'Floral' }, { value: 'earthy', label: 'Earthy' }, { value: 'fruity', label: 'Fruity' }, { value: 'bitter', label: 'Bitter' }] }
  ];

  const coffeeQuestions = [
    { id: 'tasteProfile', question: 'Taste profile?', type: 'single' as const, options: [{ value: 'nutty', label: 'Nutty' }, { value: 'fruity', label: 'Fruity' }, { value: 'chocolatey', label: 'Chocolatey' }, { value: 'floral', label: 'Floral' }, { value: 'smoky', label: 'Smoky' }] },
    { id: 'caffeineLevel', question: 'Caffeine level?', type: 'single' as const, options: [{ value: 'light', label: 'Light' }, { value: 'standard', label: 'Standard' }, { value: 'strong', label: 'Strong' }] },
    { id: 'milkPreference', question: 'Milk preference?', type: 'single' as const, options: [{ value: 'dairy', label: 'Dairy' }, { value: 'oat', label: 'Oat' }, { value: 'almond', label: 'Almond' }, { value: 'none', label: 'None' }] },
    { id: 'sweetnessLevel', question: 'Sweetness level?', type: 'single' as const, options: [{ value: 'none', label: 'Not Sweet' }, { value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'sweet', label: 'Sweet' }] },
    { id: 'acidityTolerance', question: 'Acidity tolerance?', type: 'single' as const, options: [{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }] },
    { id: 'mood', question: 'Current mood?', type: 'single' as const, options: [{ value: 'focus', label: 'Focus' }, { value: 'comfort', label: 'Comfort' }, { value: 'refreshing', label: 'Refreshing' }, { value: 'indulgent', label: 'Indulgent' }] }
  ];

  const snackQuestions = [
    { id: 'dietType', question: 'Diet type?', type: 'single' as const, options: [{ value: 'high_protein', label: 'High Protein' }, { value: 'keto', label: 'Keto' }, { value: 'vegan', label: 'Vegan' }, { value: 'balanced', label: 'Balanced' }] },
    { id: 'function', question: 'What function?', type: 'single' as const, options: [{ value: 'energy', label: 'Energy' }, { value: 'gut_support', label: 'Gut Support' }, { value: 'beauty', label: 'Beauty' }, { value: 'muscle_recovery', label: 'Muscle Recovery' }] },
    { id: 'flavor', question: 'Flavor?', type: 'single' as const, options: [{ value: 'chocolate', label: 'Chocolate' }, { value: 'berry', label: 'Berry' }, { value: 'matcha', label: 'Matcha' }, { value: 'coffee', label: 'Coffee' }, { value: 'citrus', label: 'Citrus' }] }
  ];

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    if (category === 'coffee' || category === 'tea') {
      setCurrentScreen('beverage_selection');
    } else {
      setCurrentScreen('questions');
    }
  };

  const handleBeverageTeaSelect = () => {
    setSelectedCategory('tea');
    setCurrentScreen('questions');
  };

  const handleBeverageCoffeeSelect = () => {
    setSelectedCategory('coffee');
    setCurrentScreen('questions');
  };

  const handleBeverageSelectionBack = () => {
    setCurrentScreen('hello');
    setSelectedCategory(null);
  };

  const handleBeverageSelect = () => {
    setCurrentScreen('beverage_selection');
  };

  const handleHomeClick = () => {
    setCurrentScreen('hello');
    setSelectedCategory(null);
    setRecommendation(null);
    setBiscuitShape(null);
    setBiscuitContent(null);
    setBiscuitImageSrc(null);
    setIsCartPanelOpen(false);
  };

  const handleQuestionSubmit = (_answers: Record<string, string | string[]>) => {
    if (!selectedCategory) return;

    // Generate realistic product recommendations based on category
    const teaNames = [
      'Green Matcha Blend',
      'Earl Grey Premium',
      'Chamomile Serenity',
      'Oolong Harmony',
      'Jasmine Dream',
      'Sencha Classic',
      'Pu-erh Vitality',
      'White Peony Essence'
    ];

    const coffeeNames = [
      'Single Origin Ethiopia',
      'Espresso Intenso',
      'Smooth Arabica',
      'Dark Roast Bold',
      'Medium Blend Classic',
      'Cold Brew Smooth',
      'Colombian Peak',
      'Kenyan Burst'
    ];

    const snackNames = [
      'Protein Energy Bars',
      'Matcha Almond Cookies',
      'Dark Chocolate Bites',
      'Coconut Protein Clusters',
      'Turmeric Energy Bites',
      'Berry Antioxidant Bars',
      'Cacao Nibs Mix',
      'Chia Seed Crackers'
    ];

    const getRandomName = (names: string[]) => names[Math.floor(Math.random() * names.length)];

    let productName = '';
    let description = '';

    if (selectedCategory === 'tea') {
      productName = getRandomName(teaNames);
      description = 'A carefully selected tea blend tailored to your wellness goals';
    } else if (selectedCategory === 'coffee') {
      productName = getRandomName(coffeeNames);
      description = 'A premium coffee roast crafted to match your taste preferences';
    } else if (selectedCategory === 'snack') {
      productName = getRandomName(snackNames);
      description = 'A functional snack designed for your nutritional needs';
    }

    const mockRecommendation = {
      name: productName,
      function: 'Customized for you',
      description: description
    };

    setRecommendation(mockRecommendation);
    setCurrentScreen('recommendation');
  };

  const handleBack = () => {
    setCurrentScreen('hello');
    setSelectedCategory(null);
    setRecommendation(null);
  };

  const handleNewRecommendation = () => {
    setCurrentScreen('questions');
    setRecommendation(null);
  };

  const handleDesignTop = () => {
    // Reset biscuit state and start design flow
    setBiscuitShape(null);
    setBiscuitContent(null);
    setBiscuitImageSrc(null);
    setCurrentScreen('biscuit_shape');
  };


  const handleBiscuitShapeSelect = (shape: 'round' | 'rectangle') => {
    setBiscuitShape(shape);
    setCurrentScreen('ai_drawing');
  };

  const handleAIDrawingComplete = (drawingData: string, imageSrc: string) => {
    setBiscuitContent(drawingData);
    setBiscuitImageSrc(imageSrc);
    setCurrentScreen('biscuit_preview');
  };

  const handleBiscuitConfirm = () => {
    if (recommendation && biscuitShape) {
      addToCart({
        category: 'snack',
        productName: recommendation.name,
        quantity: 1,
        customizations: {
          shape: biscuitShape,
          icon: 'AI Generated Design'
        }
      });
    }
    handleBack();
  };

  const handleBiscuitEdit = () => {
    setCurrentScreen('ai_drawing');
  };

  const handleBiscuitBack = () => {
    if (currentScreen === 'biscuit_shape') {
      setCurrentScreen('recommendation');
    } else if (currentScreen === 'ai_drawing') {
      setCurrentScreen('biscuit_shape');
    } else if (currentScreen === 'biscuit_preview') {
      setCurrentScreen('ai_drawing');
    }
  };

  const handleFacialRecognitionSkip = () => {
    setCurrentScreen('hello');
  };

  const handleViewCart = () => {
    setIsCartPanelOpen(!isCartPanelOpen);
  };

  const handleOpenFullCart = () => {
    setIsCartPanelOpen(false);
    setCurrentScreen('cart');
  };

  const handleContinueShopping = () => {
    setCurrentScreen('hello');
  };

  const handleCheckout = () => {
    // TODO: Implement checkout flow
    alert('Thank you for your order! Checkout functionality coming soon.');
    setCurrentScreen('hello');
  };

  return (
    <div>
      <FloatingCartPanel isOpen={isCartPanelOpen} onClose={() => setIsCartPanelOpen(false)} onViewFullCart={handleOpenFullCart} />
      {currentScreen !== 'cart' && <FloatingCartButton onClick={handleViewCart} isCartOpen={isCartPanelOpen} />}
      {currentScreen === 'hello' && <HelloScreen onContinue={() => setCurrentScreen('facial_recognition')} onCategorySelect={handleCategorySelect} onBeverageSelect={handleBeverageSelect} />}
      {currentScreen === 'facial_recognition' && (
        <FacialRecognitionScreen
          onSkip={handleFacialRecognitionSkip}
          onViewCart={handleViewCart}
        />
      )}
      {currentScreen === 'landing' && <LandingScreen onCategorySelect={handleCategorySelect} />}
      {currentScreen === 'beverage_selection' && <BeverageSelectionScreen onTeaSelect={handleBeverageTeaSelect} onCoffeeSelect={handleBeverageCoffeeSelect} onBack={handleBeverageSelectionBack} />}
      {currentScreen === 'questions' && selectedCategory === 'tea' && <QuestionFlow title="🍵 Tea Recommendation Quiz" subtitle="Let's find your perfect tea blend" questions={teaQuestions} onSubmit={handleQuestionSubmit} onBack={handleBack} />}
      {currentScreen === 'questions' && selectedCategory === 'coffee' && <QuestionFlow title="☕ Coffee Recipe Builder" subtitle="Discover your ideal coffee profile" questions={coffeeQuestions} onSubmit={handleQuestionSubmit} onBack={handleBack} />}
      {currentScreen === 'questions' && selectedCategory === 'snack' && <QuestionFlow title="🍪 Snack Personalization" subtitle="Design your perfect functional snack" questions={snackQuestions} onSubmit={handleQuestionSubmit} onBack={handleBack} />}
      {currentScreen === 'recommendation' && selectedCategory && recommendation && <RecommendationScreen category={selectedCategory} recommendation={recommendation} onNewRecommendation={handleNewRecommendation} onViewCart={handleViewCart} onHome={handleHomeClick} onDesignTop={handleDesignTop} />}
      
      {/* Biscuit Customization Flow (Snacks only) */}
      {currentScreen === 'biscuit_shape' && <BiscuitShapeSelector onShapeSelect={handleBiscuitShapeSelect} onBack={handleBiscuitBack} />}
      {currentScreen === 'ai_drawing' && biscuitShape && <AIDrawingGenerator biscuitShape={biscuitShape} onComplete={handleAIDrawingComplete} onBack={handleBiscuitBack} />}
      {currentScreen === 'biscuit_preview' && biscuitShape && biscuitContent && biscuitImageSrc && <BiscuitPreview biscuitShape={biscuitShape} imageSrc={biscuitImageSrc} onConfirm={handleBiscuitConfirm} onEdit={handleBiscuitEdit} />}
      {currentScreen === 'cart' && <ShoppingCartScreen onContinueShopping={handleContinueShopping} onCheckout={handleCheckout} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;
