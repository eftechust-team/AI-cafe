import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface BiscuitShapeSelectorProps {
  onShapeSelect: (shape: 'round' | 'rectangle') => void;
  onBack: () => void;
}

const BiscuitShapeSelector: React.FC<BiscuitShapeSelectorProps> = ({ onShapeSelect, onBack }) => {
  const { t } = useLanguage();
  
  const styles: Record<string, React.CSSProperties> = {
    container: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#fafbfc',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '60px',
      paddingBottom: '20px',
      borderBottom: '1px solid #e8ecf1',
      position: 'relative',
      width: '100%',
    },
    backButton: {
      background: 'none',
      border: 'none',
      fontSize: '1rem',
      cursor: 'pointer',
      color: '#7a8fa6',
      padding: '8px 12px',
      fontWeight: 500,
      transition: 'all 0.2s',
      position: 'absolute',
      left: '0',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#1a2332',
      margin: 0,
      textAlign: 'center' as any,
      width: '100%',
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      gap: '60px',
      flex: 1,
      alignItems: 'center',
      maxWidth: '1000px',
      margin: '0 auto',
      width: '100%',
    },
    shapeCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#e8ecf1',
      textAlign: 'center' as any,
      minWidth: '250px',
    },
    shapeCardHover: {
      boxShadow: '0 12px 30px rgba(26, 35, 50, 0.1)',
      borderColor: '#5b9bd5',
      transform: 'translateY(-5px)',
    },
    shapePreview: {
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '180px',
    },
    roundShape: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #f9e4a3 0%, #f5d76e 100%)',
      boxShadow: '0 8px 20px rgba(100, 100, 100, 0.15)',
    },
    rectangleShape: {
      width: '180px',
      height: '120px',
      borderRadius: '15px',
      background: 'linear-gradient(135deg, #f9e4a3 0%, #f5d76e 100%)',
      boxShadow: '0 8px 20px rgba(100, 100, 100, 0.15)',
    },
    shapeLabel: {
      fontSize: '1.3rem',
      fontWeight: 600,
      color: '#1a2332',
      marginBottom: '10px',
    },
    shapeDescription: {
      fontSize: '0.95rem',
      color: '#7a8fa6',
      lineHeight: 1.6,
    },
  };

  const [hoveredShape, setHoveredShape] = React.useState<'round' | 'rectangle' | null>(null);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          {t.common.back}
        </button>
        <h1 style={styles.title}>🖨️ {t.biscuit.shape}</h1>
      </div>

      <div style={styles.content}>
        <div
          style={{
            ...styles.shapeCard,
            ...(hoveredShape === 'round' ? styles.shapeCardHover : {}),
          }}
          onClick={() => onShapeSelect('round')}
          onMouseEnter={() => setHoveredShape('round')}
          onMouseLeave={() => setHoveredShape(null)}
        >
          <div style={styles.shapePreview}>
            <div style={styles.roundShape} />
          </div>
          <div style={styles.shapeLabel}>{t.biscuit.round}</div>
          <div style={styles.shapeDescription}>Perfect for logos and circular designs</div>
        </div>

        <div
          style={{
            ...styles.shapeCard,
            ...(hoveredShape === 'rectangle' ? styles.shapeCardHover : {}),
          }}
          onClick={() => onShapeSelect('rectangle')}
          onMouseEnter={() => setHoveredShape('rectangle')}
          onMouseLeave={() => setHoveredShape(null)}
        >
          <div style={styles.shapePreview}>
            <div style={styles.rectangleShape} />
          </div>
          <div style={styles.shapeLabel}>{t.biscuit.rectangle}</div>
          <div style={styles.shapeDescription}>Great for text and rectangular designs</div>
        </div>
      </div>
    </div>
  );
};

export default BiscuitShapeSelector;
