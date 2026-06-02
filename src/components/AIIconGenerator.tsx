import React, { useEffect, useState } from 'react';

interface AIIconGeneratorProps {
  biscuitShape: 'round' | 'rectangle';
  onComplete: (icons: string[]) => void;
  onBack: () => void;
}

const AIIconGenerator: React.FC<AIIconGeneratorProps> = ({ biscuitShape, onComplete, onBack }) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedIcons, setGeneratedIcons] = useState<string[]>([]);

  useEffect(() => {
    // Simulate AI generation
    const timer = setTimeout(() => {
      const icons = ['⭐', '💫', '✨', '🌟', '💎'];
      setGeneratedIcons(icons);
      setIsGenerating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    onComplete(generatedIcons);
  };

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
      gap: '40px',
      maxWidth: '600px',
      textAlign: 'center' as any,
    },
    title: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1a1a1a',
      margin: 0,
    },
    subtitle: {
      fontSize: '1rem',
      color: '#666',
      margin: 0,
    },
    generationContainer: {
      background: 'white',
      borderRadius: '20px',
      padding: '60px 40px',
      border: '2px solid rgba(0, 0, 0, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '30px',
      minHeight: '300px',
      justifyContent: 'center',
    },
    loadingAnimation: {
      fontSize: '3rem',
      animation: 'pulse 2s ease-in-out infinite',
    },
    loadingText: {
      fontSize: '1rem',
      color: '#666',
    },
    iconsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '20px',
      width: '100%',
    },
    iconDisplay: {
      fontSize: '2.5rem',
      background: 'linear-gradient(135deg, rgba(107, 183, 255, 0.1), rgba(100, 200, 255, 0.1))',
      borderRadius: '15px',
      padding: '20px',
      border: '2px solid rgba(107, 183, 255, 0.2)',
    },
    successMessage: {
      fontSize: '1rem',
      color: '#4a9fff',
      fontWeight: 600,
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      width: '100%',
      justifyContent: 'center',
    },
    button: {
      padding: '14px 32px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s',
    },
    backButton: {
      background: 'white',
      color: '#666',
      border: '2px solid rgba(0, 0, 0, 0.1)',
    },
    continueButton: {
      background: 'linear-gradient(135deg, #6fb7ff 0%, #4a9fff 100%)',
      color: 'white',
    },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>

      <div style={styles.content}>
        <div>
          <h1 style={styles.title}>🎨 Generating Icons</h1>
          <p style={styles.subtitle}>AI is creating beautiful decorative icons for your {biscuitShape} biscuit...</p>
        </div>

        <div style={styles.generationContainer}>
          {isGenerating ? (
            <>
              <div style={styles.loadingAnimation}>✨</div>
              <div style={styles.loadingText}>Creating your custom icons...</div>
            </>
          ) : (
            <>
              <div style={styles.iconsGrid}>
                {generatedIcons.map((icon, index) => (
                  <div key={index} style={styles.iconDisplay}>
                    {icon}
                  </div>
                ))}
              </div>
              <div style={styles.successMessage}>✅ Icons generated successfully!</div>
            </>
          )}
        </div>

        {!isGenerating && (
          <div style={styles.buttonGroup}>
            <button style={{ ...styles.button, ...styles.backButton }} onClick={onBack}>
              ← Back
            </button>
            <button style={{ ...styles.button, ...styles.continueButton }} onClick={handleContinue}>
              Continue with Icons →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIIconGenerator;
