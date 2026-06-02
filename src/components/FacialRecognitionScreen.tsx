import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface FacialRecognitionScreenProps {
  onSkip: () => void;
  onViewCart: () => void;
}

interface AnalysisStage {
  name: string;
  progress: number;
  label: string;
}

// Fake drink data
const drinkCatalog = {
  tea: {
    classic: { name: 'Jasmine Elegance', name_zh: '茉莉優雅' },
    floral: { name: 'Rose Garden', name_zh: '玫瑰花園' },
    fruity: { name: 'Peach Blossom', name_zh: '桃花盛開' },
    spicy: { name: 'Ginger Fire', name_zh: '薑火熱飲' },
  },
  coffee: {
    classic: { name: 'Morning Bloom', name_zh: '晨曦綻放' },
    floral: { name: 'Lavender Dream', name_zh: '薰衣草夢境' },
    fruity: { name: 'Berry Harmony', name_zh: '漿果和諧' },
    spicy: { name: 'Chili Heat', name_zh: '辣椒熱浪' },
  },
};

const flavorOptions = [
  { value: 'classic', label_en: 'Classic', label_zh: '經典' },
  { value: 'floral', label_en: 'Floral', label_zh: '花香' },
  { value: 'fruity', label_en: 'Fruity', label_zh: '果香' },
  { value: 'spicy', label_en: 'Spicy', label_zh: '辛辣' },
];

const FacialRecognitionScreen: React.FC<FacialRecognitionScreenProps> = ({
  onSkip,
  onViewCart,
}) => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [stage, setStage] = useState<'analyzing' | 'analysis_results' | 'beverage' | 'flavor' | 'recommendation'>('analyzing');
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisStage>({
    name: 'detecting',
    progress: 0,
    label: 'Detecting Face...',
  });
  const [analysisResults, setAnalysisResults] = useState<{
    skinHealth: string;
    stressLevel: string;
    energyLevel: string;
    hydration: string;
  } | null>(null);
  const [selectedBeverage, setSelectedBeverage] = useState<'tea' | 'coffee' | null>(null);
  const [recommendedDrink, setRecommendedDrink] = useState<any>(null);
  const analysisIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      startAnalysisAnimation();
    }, 1000);
    return () => {
      clearTimeout(timer);
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, []);

  const startAnalysisAnimation = () => {
    const stages: AnalysisStage[] = [
      {
        name: 'detecting',
        progress: 20,
        label: language === 'en' ? 'Detecting Face...' : '檢測臉部...',
      },
      {
        name: 'mapping',
        progress: 40,
        label: language === 'en' ? 'Mapping Features...' : '映射特徵...',
      },
      {
        name: 'analyzing',
        progress: 60,
        label: language === 'en' ? 'Analyzing Health...' : '分析健康...',
      },
      {
        name: 'recognizing',
        progress: 80,
        label: language === 'en' ? 'Recognizing Preferences...' : '識別偏好...',
      },
      {
        name: 'complete',
        progress: 100,
        label: language === 'en' ? 'Analysis Complete!' : '分析完成！',
      },
    ];

    let currentStageIndex = 0;

    const animationInterval = setInterval(() => {
      if (currentStageIndex < stages.length) {
        const stage = stages[currentStageIndex];
        setAnalysisProgress(stage);
        currentStageIndex++;

        if (currentStageIndex === stages.length) {
          clearInterval(animationInterval);
          if (analysisIntervalRef.current) {
            analysisIntervalRef.current = null;
          }
          setTimeout(() => {
            // Generate fake analysis results
            const fakeResults = {
              skinHealth: ['Excellent', 'Good', 'Fair'][Math.floor(Math.random() * 3)],
              stressLevel: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
              energyLevel: ['High', 'Moderate', 'Low'][Math.floor(Math.random() * 3)],
              hydration: ['Well Hydrated', 'Moderately Hydrated', 'Needs Water'][Math.floor(Math.random() * 3)],
            };
            setAnalysisResults(fakeResults);
            setStage('analysis_results');
          }, 800);
        }
      }
    }, 600);

    analysisIntervalRef.current = animationInterval;
  };

  const handleBeverageSelect = (beverage: 'tea' | 'coffee') => {
    setSelectedBeverage(beverage);
    setStage('flavor');
  };

  const handleFlavorSelect = (flavor: string) => {
    const drink =
      drinkCatalog[selectedBeverage as 'tea' | 'coffee'][flavor as keyof typeof drinkCatalog['tea']];
    setRecommendedDrink({ ...drink, type: selectedBeverage, flavor });
    setStage('recommendation');
  };

  const handleAddToCart = () => {
    if (recommendedDrink) {
      const category = recommendedDrink.type === 'tea' ? 'tea' : 'coffee';
      const productName = language === 'en' ? recommendedDrink.name : recommendedDrink.name_zh;
      addToCart({
        id: `${recommendedDrink.type}-${recommendedDrink.flavor}-${Date.now()}`,
        category,
        productName,
        quantity: 1,
      });
      onViewCart();
    }
  };

  const handleTryAnother = () => {
    setSelectedBeverage(null);
    setRecommendedDrink(null);
    setStage('beverage');
  };

  const styles: Record<string, React.CSSProperties> = {
    container: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#fafbfc',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '30px',
      gap: '20px',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#1a2332',
      margin: 0,
    },
    skipButton: {
      background: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e8ecf1',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#7a8fa6',
      transition: 'all 0.2s',
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '900px',
      margin: '0 auto',
      width: '100%',
    },
    faceImageContainer: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      background: 'white',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#e8ecf1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginBottom: '20px',
    },
    faceEmoji: {
      fontSize: '8rem',
    },
    scanOverlay: {
      position: 'absolute' as any,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
    },
    scanLine: {
      position: 'absolute' as any,
      width: '100%',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #5b9bd5, transparent)',
      animation: 'scanAnimation 2s ease-in-out infinite',
    },
    stageLabel: {
      position: 'absolute' as any,
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(91, 155, 213, 0.95)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: 600,
      whiteSpace: 'nowrap',
    },
    progressBar: {
      width: '100%',
      maxWidth: '400px',
      height: '6px',
      background: '#e8ecf1',
      borderRadius: '3px',
      overflow: 'hidden',
      marginBottom: '30px',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #5b9bd5, #4a90e2)',
      transition: 'width 0.6s ease',
    },
    card: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e8ecf1',
      textAlign: 'center' as any,
      maxWidth: '500px',
      width: '100%',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1a2332',
      marginBottom: '20px',
    },
    cardSubtitle: {
      fontSize: '1rem',
      color: '#7a8fa6',
      marginBottom: '25px',
      lineHeight: 1.5,
    },
    buttonGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginTop: '25px',
    },
    flavorGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginTop: '25px',
    },
    button: {
      padding: '14px 24px',
      borderRadius: '10px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
      color: 'white',
    },
    secondaryButton: {
      background: 'white',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#e8ecf1',
      color: '#7a8fa6',
    },
    drinkName: {
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#1a2332',
      marginBottom: '10px',
      marginTop: '15px',
    },
    drinkDetails: {
      fontSize: '1rem',
      color: '#7a8fa6',
      marginBottom: '25px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    flavorBadge: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, rgba(91, 155, 213, 0.1), rgba(74, 144, 226, 0.05))',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#5b9bd5',
      color: '#2c5aa0',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: 600,
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      marginTop: '25px',
      flexDirection: 'column',
    },
  };

  // Analyze stage
  if (stage === 'analyzing') {
    return (
      <div style={styles.container}>
        <style>{`
          @keyframes scanAnimation {
            0%, 100% { top: 20%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 80%; opacity: 0; }
          }
        `}</style>

        <div style={styles.header}>
          <h1 style={styles.title}>
            {language === 'en' ? '😊 Facial Recognition' : '😊 臉部辨識'}
          </h1>
          <button
            style={styles.skipButton}
            onClick={onSkip}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = '#5b9bd5';
              (e.target as HTMLElement).style.color = '#5b9bd5';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = '#e8ecf1';
              (e.target as HTMLElement).style.color = '#7a8fa6';
            }}
          >
            {language === 'en' ? '🏠 Home' : '🏠 首頁'}
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.faceImageContainer}>
            <img
              src="https://i.pravatar.cc/200?img=12"
              alt="Face"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <div style={styles.scanOverlay}>
              <div style={styles.scanLine} />
              <div style={styles.stageLabel}>{analysisProgress.label}</div>
            </div>
          </div>

          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${analysisProgress.progress}%`,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Analysis results stage
  if (stage === 'analysis_results' && analysisResults) {
    const getResultColor = (value: string, type: string) => {
      if (type === 'stressLevel') {
        if (value === 'Low') return '#10b981';
        if (value === 'Moderate') return '#f59e0b';
        return '#ef4444';
      }
      if (type === 'energyLevel') {
        if (value === 'High') return '#10b981';
        if (value === 'Moderate') return '#f59e0b';
        return '#ef4444';
      }
      return '#5b9bd5';
    };

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            {language === 'en' ? '📊 Analysis Results' : '📊 分析結果'}
          </h1>
          <button
            style={styles.skipButton}
            onClick={onSkip}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = '#5b9bd5';
              (e.target as HTMLElement).style.color = '#5b9bd5';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = '#e8ecf1';
              (e.target as HTMLElement).style.color = '#7a8fa6';
            }}
          >
            {language === 'en' ? '🏠 Home' : '🏠 首頁'}
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.card}>
            <div style={{ marginBottom: '20px' }}>
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Face"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto',
                  display: 'block',
                }}
              />
            </div>

            <div style={styles.cardTitle}>
              {language === 'en' ? 'Your Health Profile' : '您的健康檔案'}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginTop: '20px',
                marginBottom: '25px',
              }}
            >
              <div
                style={{
                  background: '#f0f7ff',
                  padding: '15px',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#7a8fa6', marginBottom: '5px' }}>
                  {language === 'en' ? 'Skin Health' : '皮膚健康'}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#10b981' }}>
                  {analysisResults.skinHealth}
                </div>
              </div>

              <div
                style={{
                  background: '#f0f7ff',
                  padding: '15px',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#7a8fa6', marginBottom: '5px' }}>
                  {language === 'en' ? 'Stress Level' : '壓力水平'}
                </div>
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: getResultColor(analysisResults.stressLevel, 'stressLevel'),
                  }}
                >
                  {analysisResults.stressLevel}
                </div>
              </div>

              <div
                style={{
                  background: '#f0f7ff',
                  padding: '15px',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#7a8fa6', marginBottom: '5px' }}>
                  {language === 'en' ? 'Energy Level' : '能量水平'}
                </div>
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: getResultColor(analysisResults.energyLevel, 'energyLevel'),
                  }}
                >
                  {analysisResults.energyLevel}
                </div>
              </div>

              <div
                style={{
                  background: '#f0f7ff',
                  padding: '15px',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#7a8fa6', marginBottom: '5px' }}>
                  {language === 'en' ? 'Hydration' : '水合狀態'}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#5b9bd5' }}>
                  {analysisResults.hydration}
                </div>
              </div>
            </div>

            <div style={styles.cardSubtitle}>
              {language === 'en'
                ? 'Based on your profile, we recommend a beverage to match your needs.'
                : '根據您的檔案，我們建議一種飲品來滿足您的需求。'}
            </div>

            <button
              style={{ ...styles.button, ...styles.primaryButton, width: '100%', marginTop: '20px' }}
              onClick={() => setStage('beverage')}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(-3px)';
                (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(75, 144, 226, 0.3)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(0)';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {language === 'en' ? 'Continue' : '繼續'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Beverage selection stage
  if (stage === 'beverage') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            {language === 'en' ? '🎯 Beverage Preference' : '🎯 飲品偏好'}
          </h1>
          <button
            style={styles.skipButton}
            onClick={onSkip}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = '#5b9bd5';
              (e.target as HTMLElement).style.color = '#5b9bd5';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = '#e8ecf1';
              (e.target as HTMLElement).style.color = '#7a8fa6';
            }}
          >
            {language === 'en' ? '🏠 Home' : '🏠 首頁'}
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>
              {language === 'en' ? 'What would you like?' : '你想要什麼？'}
            </div>
            <div style={styles.cardSubtitle}>
              {language === 'en'
                ? 'Based on your profile, choose your preferred beverage'
                : '根據您的個人資料，選擇您喜歡的飲品'}
            </div>

            <div style={styles.buttonGrid}>
              <button
                style={{ ...styles.button, ...styles.primaryButton }}
                onClick={() => handleBeverageSelect('tea')}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(75, 144, 226, 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              >
                🍵 {language === 'en' ? 'Tea' : '茶'}
              </button>
              <button
                style={{ ...styles.button, ...styles.primaryButton }}
                onClick={() => handleBeverageSelect('coffee')}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(75, 144, 226, 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              >
                ☕ {language === 'en' ? 'Coffee' : '咖啡'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Flavor preference stage
  if (stage === 'flavor' && selectedBeverage) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            {language === 'en' ? '✨ Flavor Preference' : '✨ 風味偏好'}
          </h1>
          <button
            style={styles.skipButton}
            onClick={onSkip}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = '#5b9bd5';
              (e.target as HTMLElement).style.color = '#5b9bd5';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = '#e8ecf1';
              (e.target as HTMLElement).style.color = '#7a8fa6';
            }}
          >
            {language === 'en' ? '🏠 Home' : '🏠 首頁'}
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>
              {language === 'en' ? 'Choose your flavor' : '選擇您的風味'}
            </div>
            <div style={styles.cardSubtitle}>
              {language === 'en'
                ? 'What flavor profile appeals to you?'
                : '什麼風味類型吸引您？'}
            </div>

            <div style={styles.flavorGrid}>
              {flavorOptions.map((flavor) => (
                <button
                  key={flavor.value}
                  style={{ ...styles.button, ...styles.secondaryButton }}
                  onClick={() => handleFlavorSelect(flavor.value)}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = 'linear-gradient(135deg, #5b9bd5, #4a90e2)';
                    (e.target as HTMLElement).style.color = 'white';
                    (e.target as HTMLElement).style.borderColor = '#4a90e2';
                    (e.target as HTMLElement).style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = 'white';
                    (e.target as HTMLElement).style.color = '#7a8fa6';
                    (e.target as HTMLElement).style.borderColor = '#e8ecf1';
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  {language === 'en' ? flavor.label_en : flavor.label_zh}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Recommendation stage
  if (stage === 'recommendation' && recommendedDrink) {
    const drinkName = language === 'en' ? recommendedDrink.name : recommendedDrink.name_zh;
    const beverageEmoji = recommendedDrink.type === 'tea' ? '🍵' : '☕';
    const flavorLabel =
      flavorOptions.find((f) => f.value === recommendedDrink.flavor)?.[
        language === 'en' ? 'label_en' : 'label_zh'
      ] || recommendedDrink.flavor;

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            {language === 'en' ? '💡 Recommended for You' : '💡 為您推薦'}
          </h1>
          <button
            style={styles.skipButton}
            onClick={onSkip}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = '#5b9bd5';
              (e.target as HTMLElement).style.color = '#5b9bd5';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = '#e8ecf1';
              (e.target as HTMLElement).style.color = '#7a8fa6';
            }}
          >
            {language === 'en' ? '🏠 Home' : '🏠 首頁'}
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.card}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{beverageEmoji}</div>
            <div style={styles.drinkName}>{drinkName}</div>
            <div style={styles.drinkDetails}>
              <span>{language === 'en' ? 'Flavor: ' : '風味：'}</span>
              <div style={styles.flavorBadge}>{flavorLabel}</div>
            </div>
            <div style={styles.cardSubtitle}>
              {language === 'en'
                ? 'Perfectly matched to your preferences. Add to cart to enjoy!'
                : '完全符合您的偏好。加入購物車享受！'}
            </div>

            <div style={styles.buttonGroup}>
              <button
                style={{ ...styles.button, ...styles.primaryButton }}
                onClick={handleAddToCart}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(75, 144, 226, 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              >
                🛒 {language === 'en' ? 'Add to Cart' : '加入購物車'}
              </button>
              <button
                style={{ ...styles.button, ...styles.secondaryButton }}
                onClick={handleTryAnother}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderColor = '#5b9bd5';
                  (e.target as HTMLElement).style.color = '#5b9bd5';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderColor = '#e8ecf1';
                  (e.target as HTMLElement).style.color = '#7a8fa6';
                }}
              >
                {language === 'en' ? 'Try Another' : '試試另一個'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default FacialRecognitionScreen;
