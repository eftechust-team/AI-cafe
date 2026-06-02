import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface PrintTypeSelectorProps {
  biscuitShape: 'round' | 'rectangle';
  onTypeSelect: (type: 'text' | 'drawing') => void;
  onBack: () => void;
}

const PrintTypeSelector: React.FC<PrintTypeSelectorProps> = ({ biscuitShape, onTypeSelect, onBack }) => {
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
    subtitle: {
      fontSize: '0.9rem',
      color: '#7a8fa6',
      marginTop: '5px',
      display: 'none',
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
    typeCard: {
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
    typeCardHover: {
      boxShadow: '0 12px 30px rgba(26, 35, 50, 0.1)',
      borderColor: '#5b9bd5',
      transform: 'translateY(-5px)',
    },
    preview: {
      marginBottom: '30px',
      fontSize: '4rem',
      height: '150px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    typeLabel: {
      fontSize: '1.3rem',
      fontWeight: 600,
      color: '#1a2332',
      marginBottom: '10px',
    },
    typeDescription: {
      fontSize: '0.95rem',
      color: '#7a8fa6',
      lineHeight: 1.6,
    },
  };

  const [hoveredType, setHoveredType] = React.useState<'text' | 'drawing' | null>(null);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          {t.common.back}
        </button>
        <div>
          <h1 style={styles.title}>🎨 {t.biscuit.printWhat}</h1>
          <div style={styles.subtitle}>
            {biscuitShape === 'round' ? '📍 ' + t.biscuit.round : '📍 ' + t.biscuit.rectangle}
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <div
          style={{
            ...styles.typeCard,
            ...(hoveredType === 'text' ? styles.typeCardHover : {}),
          }}
          onClick={() => onTypeSelect('text')}
          onMouseEnter={() => setHoveredType('text')}
          onMouseLeave={() => setHoveredType(null)}
        >
          <div style={styles.preview}>✏️</div>
          <div style={styles.typeLabel}>{t.biscuit.text}</div>
          <div style={styles.typeDescription}>Add beautiful text, names, or messages</div>
        </div>

        <div
          style={{
            ...styles.typeCard,
            ...(hoveredType === 'drawing' ? styles.typeCardHover : {}),
          }}
          onClick={() => onTypeSelect('drawing')}
          onMouseEnter={() => setHoveredType('drawing')}
          onMouseLeave={() => setHoveredType(null)}
        >
          <div style={styles.preview}>🖌️</div>
          <div style={styles.typeLabel}>{t.biscuit.drawing}</div>
          <div style={styles.typeDescription}>Draw custom designs or describe what you want</div>
        </div>
      </div>
    </div>
  );
};

export default PrintTypeSelector;
