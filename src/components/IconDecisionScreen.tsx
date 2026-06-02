import React from 'react';

interface IconDecisionScreenProps {
  biscuitShape: 'round' | 'rectangle';
  onDecision: (wantIcons: boolean) => void;
  onBack: () => void;
}

const IconDecisionScreen: React.FC<IconDecisionScreenProps> = ({ biscuitShape: _biscuitShape, onDecision, onBack }) => {
  const [hoveredOption, setHoveredOption] = React.useState<'yes' | 'no' | null>(null);

  const styles: Record<string, React.CSSProperties> = {
    container: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '50px',
      maxWidth: '700px',
      textAlign: 'center' as any,
    },
    header: {
      position: 'absolute' as any,
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '30px 40px',
      borderBottom: '1px solid #e8ecf1',
      background: 'white',
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
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#1a2332',
      margin: 0,
      flex: 1,
      textAlign: 'left' as any,
    },
    subtitle: {
      fontSize: '1rem',
      color: '#666',
      margin: '15px 0 0 0',
      fontWeight: 300,
    },
    optionsContainer: {
      display: 'flex',
      gap: '40px',
      justifyContent: 'center',
      width: '100%',
    },
    optionCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px 35px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      border: '2px solid rgba(0, 0, 0, 0.08)',
      minWidth: '200px',
      textAlign: 'center' as any,
    },
    optionCardHover: {
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
      borderColor: '#6fb7ff',
      transform: 'translateY(-5px)',
    },
    optionIcon: {
      fontSize: '3.5rem',
      marginBottom: '20px',
    },
    optionLabel: {
      fontSize: '1.3rem',
      fontWeight: 600,
      color: '#1a1a1a',
      marginBottom: '10px',
      display: 'block',
    },
    optionDescription: {
      fontSize: '0.95rem',
      color: '#666',
      lineHeight: 1.6,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={styles.title}>✨ Add Decorative Icons?</h1>
          <p style={styles.subtitle}>Let AI generate beautiful decorative icons for your biscuit</p>
        </div>
        <div style={{ width: '40px' }} />
      </div>

      <div style={styles.optionsContainer}>
        <div
          style={{
            ...styles.optionCard,
            ...(hoveredOption === 'yes' ? styles.optionCardHover : {}),
          }}
          onClick={() => onDecision(true)}
          onMouseEnter={() => setHoveredOption('yes')}
          onMouseLeave={() => setHoveredOption(null)}
        >
          <div style={styles.optionIcon}>✨</div>
          <span style={styles.optionLabel}>Yes, Add Icons</span>
          <div style={styles.optionDescription}>AI will generate beautiful decorative icons</div>
        </div>

        <div
          style={{
            ...styles.optionCard,
            ...(hoveredOption === 'no' ? styles.optionCardHover : {}),
          }}
          onClick={() => onDecision(false)}
          onMouseEnter={() => setHoveredOption('no')}
          onMouseLeave={() => setHoveredOption(null)}
        >
          <div style={styles.optionIcon}>⏭️</div>
          <span style={styles.optionLabel}>No, Skip</span>
          <div style={styles.optionDescription}>Continue to preview your design</div>
        </div>
      </div>
    </div>
  );
};

export default IconDecisionScreen;
