import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface BeverageSelectionScreenProps {
  onTeaSelect: () => void;
  onCoffeeSelect: () => void;
  onBack: () => void;
}

const BeverageSelectionScreen: React.FC<BeverageSelectionScreenProps> = ({ onTeaSelect, onCoffeeSelect, onBack }) => {
  const { language } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<'tea' | 'coffee' | null>(null);

  const styles: Record<string, React.CSSProperties> = {
    container: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#fafbfc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
    },
    header: {
      padding: '30px 40px',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: '#e8ecf1',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '20px',
    },
    backButton: {
      background: 'none',
      border: 'none',
      color: '#7a8fa6',
      fontSize: '1rem',
      cursor: 'pointer',
      padding: '8px 12px',
      borderRadius: '8px',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap',
      fontWeight: 500,
      marginTop: '-8px',
    },
    headerContent: {
      flex: 1,
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#1a2332',
      margin: '0 0 8px 0',
      letterSpacing: '0.3px',
    },
    subtitle: {
      fontSize: '1rem',
      color: '#6b7f96',
      margin: 0,
      fontWeight: 400,
      lineHeight: 1.6,
    },
    contentContainer: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 40px',
    },
    cardsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px',
      maxWidth: '900px',
      width: '100%',
    },
    card: {
      padding: '30px',
      background: '#ffffff',
      borderRadius: '12px',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e8ecf1',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center' as any,
      overflow: 'hidden',
    },
    cardHovered: {
      borderColor: '#5b9bd5',
      background: '#ffffff',
      boxShadow: '0 8px 24px rgba(91, 155, 213, 0.12)',
      transform: 'translateY(-4px)',
    },
    cardIcon: {
      fontSize: '60px',
      marginBottom: '16px',
      display: 'block',
    },
    cardTitle: {
      fontSize: '1.4rem',
      fontWeight: 600,
      color: '#1a2332',
      marginBottom: '12px',
      letterSpacing: '0.3px',
    },
    cardDescription: {
      fontSize: '0.95rem',
      color: '#6b7f96',
      lineHeight: 1.6,
      marginBottom: '20px',
    },
    cardButton: {
      background: 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      fontSize: '0.95rem',
      fontWeight: 600,
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button 
          style={styles.backButton} 
          onClick={onBack}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#5b9bd5';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(91, 155, 213, 0.05)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#7a8fa6';
            (e.currentTarget as HTMLButtonElement).style.background = 'none';
          }}
        >
          ← {language === 'en' ? 'Back' : '返回'}
        </button>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            {language === 'en' ? '☕ 🍵 Choose Your Beverage' : '☕ 🍵 選擇您的飲品'}
          </h1>
          <p style={styles.subtitle}>
            {language === 'en'
              ? 'What would you like to personalize today?'
              : '您想今天個人化哪種飲品?'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={styles.contentContainer}>
        <div style={styles.cardsContainer}>
          {/* Tea Card */}
          <div
            style={{
              ...styles.card,
              ...(hoveredCard === 'tea' ? styles.cardHovered : {}),
            }}
            onMouseEnter={() => setHoveredCard('tea')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={onTeaSelect}
          >
            <div style={styles.cardIcon}>🍵</div>
            <h2 style={styles.cardTitle}>
              {language === 'en' ? 'Tea' : '茶'}
            </h2>
            <p style={styles.cardDescription}>
              {language === 'en'
                ? 'Find your perfect tea blend based on your health goals and preferences'
                : '根據您的健康目標和偏好找到完美的茶混合'}
            </p>
            <button
              style={styles.cardButton}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 20px rgba(91, 155, 213, 0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
              }}
            >
              {language === 'en' ? 'Explore Tea' : '探索茶'}
            </button>
          </div>

          {/* Coffee Card */}
          <div
            style={{
              ...styles.card,
              ...(hoveredCard === 'coffee' ? styles.cardHovered : {}),
            }}
            onMouseEnter={() => setHoveredCard('coffee')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={onCoffeeSelect}
          >
            <div style={styles.cardIcon}>☕</div>
            <h2 style={styles.cardTitle}>
              {language === 'en' ? 'Coffee' : '咖啡'}
            </h2>
            <p style={styles.cardDescription}>
              {language === 'en'
                ? 'Discover your ideal coffee profile tailored to your taste preferences'
                : '根據您的口味偏好發現您理想的咖啡品味'}
            </p>
            <button
              style={styles.cardButton}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 20px rgba(91, 155, 213, 0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
              }}
            >
              {language === 'en' ? 'Explore Coffee' : '探索咖啡'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeverageSelectionScreen;
