import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import heroLocal from '../assets/hero.png';
import facialRecognitionImage from '../assets/facial-recognition.png';
import beveragePersonalizedImage from '../assets/beverage-personalized.png';
import customBiscuitsImage from '../assets/custom-biscuits.png';

interface HelloScreenProps {
  onContinue: () => void;
  onCategorySelect?: (category: 'tea' | 'coffee' | 'snack') => void;
  onBeverageSelect?: () => void;
}

interface FeatureCard {
  image_url: string;
  title_en: string;
  title_zh: string;
  description_en: string;
  description_zh: string;
}

const HelloScreen: React.FC<HelloScreenProps> = ({ onContinue, onCategorySelect, onBeverageSelect }) => {
  const { language, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(-1);
  const [selectedFeature, setSelectedFeature] = useState(-1);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features: FeatureCard[] = [
    {
      image_url: facialRecognitionImage,
      title_en: 'AI Health Analysis',
      title_zh: 'AI 健康分析',
      description_en: 'Facial recognition analyzes your health profile',
      description_zh: '臉部辨識分析您的健康檔案',
    },
    {
      image_url: beveragePersonalizedImage,
      title_en: 'Personalized Beverage',
      title_zh: '個人化飲品',
      description_en: 'Get drink recommendations matched to your needs',
      description_zh: '根據您的需求獲得飲品推薦',
    },
    {
      image_url: customBiscuitsImage,
      title_en: 'Custom Biscuits',
      title_zh: '客製化餅乾',
      description_en: '3D design and print your perfect snack',
      description_zh: '3D 設計並列印您的完美點心',
    },
  ];

  const styles: Record<string, React.CSSProperties> = {
    container: {
      width: '100%',
      minHeight: '200vh',
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(rgba(26, 35, 50, 0.45), rgba(26, 35, 50, 0.6)), url('/assets/home_bg.jpg'), url('${heroLocal}')`,
      backgroundSize: 'cover, cover, cover',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed',
      overflow: 'visible',
      position: 'relative',
      color: '#ffffff',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '30px 50px',
      position: 'relative',
      zIndex: 10,
      background: 'rgba(255, 255, 255, 0.95)',
      borderBottom: '1px solid rgba(91, 155, 213, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1a2332',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      letterSpacing: '-0.5px',
    },
    languageButtons: {
      display: 'flex',
      gap: '12px',
    },
    langButton: {
      background: 'transparent',
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: 500,
      color: '#7a8fa6',
      transition: 'all 0.3s ease',
    },
    langButtonActive: {
      background: 'rgba(91, 155, 213, 0.1)',
      color: '#5b9bd5',
      borderColor: 'transparent',
    },
    heroSection: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 50px',
      position: 'relative',
      minHeight: '85vh',
    },
    heroContent: {
      maxWidth: '1000px',
      width: '100%',
      display: 'flex',
      gap: '80px',
      alignItems: 'center',
    },
    heroText: {
      flex: 1,
      animation: isVisible ? 'slideInLeft 0.8s ease-out' : 'none',
    },
    greeting: {
      fontSize: '0.95rem',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      color: '#ffffff',
      marginBottom: '20px',
      fontWeight: 600,
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
      animation: isVisible ? 'fadeIn 0.8s ease-out 0.1s both' : 'none',
    },
    title: {
      fontSize: '3.8rem',
      fontWeight: 800,
      color: '#ffffff',
      margin: '0 0 20px 0',
      lineHeight: 1.15,
      textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
      animation: isVisible ? 'slideInUp 0.8s ease-out 0.2s both' : 'none',
    },
    subtitle: {
      fontSize: '1.15rem',
      color: '#f5f5f5',
      margin: '0 0 35px 0',
      fontWeight: 400,
      lineHeight: 1.8,
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
      animation: isVisible ? 'slideInUp 0.8s ease-out 0.3s both' : 'none',
    },
    ctaButton: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
      color: 'white',
      border: 'none',
      padding: '16px 44px',
      fontSize: '1rem',
      fontWeight: 700,
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 12px 32px rgba(91, 155, 213, 0.3)',
      letterSpacing: '0.5px',
      animation: isVisible ? 'slideInUp 0.8s ease-out 0.4s both' : 'none',
    },
    heroIllustration: {
      flex: 1,
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      animation: isVisible ? 'slideInRight 0.8s ease-out 0.2s both' : 'none',
    },
    illustrationImage: {
      width: '100%',
      maxWidth: '450px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(26, 35, 50, 0.25)',
      filter: 'brightness(1.05)',
    },
    featuresSection: {
      padding: '80px 50px',
      background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), white)`,
      position: 'relative',
    },
    featuresTitle: {
      textAlign: 'center' as any,
      fontSize: '2.8rem',
      fontWeight: 800,
      color: '#ffffff',
      marginBottom: '60px',
      letterSpacing: '-0.5px',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '25px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    featureCard: {
      padding: '30px',
      background: '#fafbfc',
      borderRadius: '16px',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e8ecf1',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center' as any,
      animation: isVisible ? 'fadeInUp 0.6s ease-out' : 'none',
      overflow: 'hidden',
    },
    featureCardActive: {
      borderColor: '#5b9bd5',
      background: '#ffffff',
      boxShadow: '0 12px 32px rgba(91, 155, 213, 0.15)',
      transform: 'translateY(-8px)',
    },
    featureImage: {
      width: '100%',
      height: '200px',
      borderRadius: '12px',
      objectFit: 'cover',
      marginBottom: '20px',
      transition: 'transform 0.3s ease',
    },
    featureTitle: {
      fontSize: '1.35rem',
      fontWeight: 700,
      color: '#1a2332',
      margin: '15px 0 10px 0',
      letterSpacing: '-0.3px',
    },
    featureDescription: {
      fontSize: '0.95rem',
      color: '#6b7f96',
      lineHeight: 1.7,
    },
    decorativeShape1: {
      position: 'absolute',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(91, 155, 213, 0.08) 0%, transparent 70%)',
      borderRadius: '50%',
      top: '-150px',
      left: '-150px',
      pointerEvents: 'none',
    },
    decorativeShape2: {
      position: 'absolute',
      width: '350px',
      height: '350px',
      background: 'radial-gradient(circle, rgba(74, 144, 226, 0.06) 0%, transparent 70%)',
      borderRadius: '50%',
      bottom: '-100px',
      right: '-100px',
      pointerEvents: 'none',
    },
  };

  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div style={styles.decorativeShape1} />
      <div style={styles.decorativeShape2} />

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <span style={{ fontSize: '1.3rem' }}>AI CAFÉ LAB</span>
        </div>
        <div style={styles.languageButtons}>
          <button
            style={{
              ...styles.langButton,
              ...(language === 'en' ? styles.langButtonActive : {}),
            }}
            onClick={() => setLanguage('en')}
            onMouseEnter={(e) => {
              if (language !== 'en') {
                (e.target as HTMLElement).style.borderColor = '#5b9bd5';
                (e.target as HTMLElement).style.color = '#5b9bd5';
              }
            }}
            onMouseLeave={(e) => {
              if (language !== 'en') {
                (e.target as HTMLElement).style.borderColor = '#e8ecf1';
                (e.target as HTMLElement).style.color = '#7a8fa6';
              }
            }}
          >
            English
          </button>
          <button
            style={{
              ...styles.langButton,
              ...(language === 'zh' ? styles.langButtonActive : {}),
            }}
            onClick={() => setLanguage('zh')}
            onMouseEnter={(e) => {
              if (language !== 'zh') {
                (e.target as HTMLElement).style.borderColor = '#5b9bd5';
                (e.target as HTMLElement).style.color = '#5b9bd5';
              }
            }}
            onMouseLeave={(e) => {
              if (language !== 'zh') {
                (e.target as HTMLElement).style.borderColor = '#e8ecf1';
                (e.target as HTMLElement).style.color = '#7a8fa6';
              }
            }}
          >
            繁體中文
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <div style={styles.greeting}>
              {language === 'en' ? 'LUXURY WELLNESS EXPERIENCE' : '奢華健康體驗'}
            </div>
            <h1 style={styles.title}>
              {language === 'en' ? 'Personalized Wellness Through AI' : 'AI 驅動的個人化健康'}
            </h1>
            <p style={styles.subtitle}>
              {language === 'en'
                ? 'Discover your perfect beverage blend and custom creations, intelligently matched to your unique health profile.'
                : '發現為您量身定製的完美飲品與創意作品，由 AI 根據您的獨特健康檔案精心匹配。'}
            </p>
            <button
              style={{
                ...styles.ctaButton,
                ...(buttonHovered ? { transform: 'translateY(-3px)', boxShadow: '0 16px 40px rgba(91, 155, 213, 0.4)' } : {}),
              }}
              onClick={onContinue}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
            >
              {language === 'en' ? 'Begin Your Journey' : '開始您的旅程'}
            </button>
          </div>
          <div style={styles.heroIllustration}>
            <img
              src={`https://images.unsplash.com/photo-1618065311784-4b8694c493d1?w=600&h=700&fit=crop&auto=format&q=80`}
              alt="Wellness experience"
              style={styles.illustrationImage}
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700"><rect width="100%25" height="100%25" fill="%23f3f4f6"/></svg>';
                (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(100%)';
              }}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>
          {language === 'en' ? 'What Sets Us Apart' : '我們的優勢'}
        </h2>

        <div style={styles.featureGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                ...styles.featureCard,
                ...(activeFeature === index || selectedFeature === index ? styles.featureCardActive : {}),
              }}
              onClick={() => {
                setSelectedFeature(selectedFeature === index ? -1 : index);
                if (index === 0) {
                  // AI Health Analysis - go to facial recognition
                  onContinue();
                } else if (index === 1) {
                  // Personalized Beverage - go to beverage selection
                  onBeverageSelect?.();
                } else if (index === 2) {
                  // Custom Biscuits - go to snack questions
                  onCategorySelect?.('snack');
                }
              }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(-1)}
            >
              <img
                src={feature.image_url}
                alt={language === 'en' ? feature.title_en : feature.title_zh}
                style={styles.featureImage}
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%25" height="100%25" fill="%23f3f4f6"/></svg>';
                  (e.currentTarget as HTMLImageElement).style.opacity = '0.85';
                }}
              />
              <h3 style={styles.featureTitle}>
                {language === 'en' ? feature.title_en : feature.title_zh}
              </h3>
              <p style={styles.featureDescription}>
                {language === 'en' ? feature.description_en : feature.description_zh}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelloScreen;
