import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import heroImage from '../assets/hero.png';

interface LandingScreenProps {
  onCategorySelect: (category: 'tea' | 'coffee' | 'snack') => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onCategorySelect }) => {
  const { language, setLanguage, t } = useLanguage();

  const styles: Record<string, React.CSSProperties> = {
    container: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '0',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1,
    },
    containerInner: {
      position: 'relative',
      zIndex: 2,
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 40px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    headerTitle: {
      fontSize: '1.3rem',
      fontWeight: 700,
      color: '#ffffff',
      letterSpacing: '-0.5px',
    },
    languageToggle: {
      display: 'flex',
      gap: '8px',
    },
    langButton: {
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s',
      border: '1px solid #e8ecf1',
      background: 'white',
      color: '#2c3e50',
      cursor: 'pointer',
    },
    langButtonActive: {
      background: '#2c3e50',
      color: 'white',
      border: '1px solid #2c3e50',
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 40px',
    },
    titleSection: {
      textAlign: 'center' as any,
      marginBottom: '60px',
      animation: 'fadeIn 0.6s ease-out',
    },
    mainTitle: {
      fontSize: '3.5rem',
      fontWeight: 700,
      color: '#ffffff',
      marginBottom: '12px',
      letterSpacing: '-1px',
      textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#ffffff',
      fontWeight: 300,
      letterSpacing: '0.3px',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '32px',
      maxWidth: '1000px',
      width: '100%',
    },
    card: {
      background: 'white',
      borderRadius: '12px',
      padding: '40px 32px',
      textAlign: 'center' as any,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid #e8ecf1',
      animation: 'slideInUp 0.6s ease-out',
    },
    cardHover: {
      transform: 'translateY(-6px)',
      borderColor: '#c8d9e8',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    },
    cardIcon: {
      fontSize: '3rem',
      marginBottom: '20px',
      display: 'block',
    },
    cardTitle: {
      fontSize: '1.4rem',
      fontWeight: 600,
      color: '#1a2332',
      marginBottom: '10px',
    },
    cardDesc: {
      fontSize: '0.95rem',
      color: '#7a8fa6',
      lineHeight: 1.6,
    },
    footer: {
      textAlign: 'center' as any,
      padding: '32px 40px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#e0e0e0',
      fontSize: '0.85rem',
    },
  };

  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.containerInner}>
        <div style={styles.header}>
          <div style={styles.headerTitle}>{t.landing.title}</div>
          <div style={styles.languageToggle}>
            <button
              style={{
                ...styles.langButton,
                ...(language === 'en' ? styles.langButtonActive : {}),
              }}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
            <button
              style={{
                ...styles.langButton,
                ...(language === 'zh' ? styles.langButtonActive : {}),
              }}
              onClick={() => setLanguage('zh')}
            >
              繁體中文
            </button>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.titleSection}>
            <h1 style={styles.mainTitle}>{t.landing.title}</h1>
            <p style={styles.subtitle}>{t.landing.subtitle}</p>
          </div>

          <div style={styles.cardsGrid}>
            <div
              style={{
                ...styles.card,
                ...(hoveredCard === 'tea' ? styles.cardHover : {}),
              }}
              onMouseEnter={() => setHoveredCard('tea')}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onCategorySelect('tea')}
            >
              <span style={styles.cardIcon}>🍵</span>
              <h2 style={styles.cardTitle}>{t.landing.tea}</h2>
              <p style={styles.cardDesc}>{t.landing.teaDesc}</p>
            </div>

            <div
              style={{
                ...styles.card,
                ...(hoveredCard === 'coffee' ? styles.cardHover : {}),
              }}
              onMouseEnter={() => setHoveredCard('coffee')}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onCategorySelect('coffee')}
            >
              <span style={styles.cardIcon}>☕</span>
              <h2 style={styles.cardTitle}>{t.landing.coffee}</h2>
              <p style={styles.cardDesc}>{t.landing.coffeeDesc}</p>
            </div>

            <div
              style={{
                ...styles.card,
                ...(hoveredCard === 'snack' ? styles.cardHover : {}),
              }}
              onMouseEnter={() => setHoveredCard('snack')}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onCategorySelect('snack')}
            >
              <span style={styles.cardIcon}>🍪</span>
              <h2 style={styles.cardTitle}>{t.landing.snack}</h2>
              <p style={styles.cardDesc}>{t.landing.snackDesc}</p>
            </div>
          </div>
        </div>

        <footer style={styles.footer}>{t.landing.footer}</footer>
      </div>
    </div>
  );
};

export default LandingScreen;
