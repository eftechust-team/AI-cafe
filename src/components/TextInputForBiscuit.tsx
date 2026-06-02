import React, { useState } from 'react';

interface TextInputForBiscuitProps {
  biscuitShape: 'round' | 'rectangle';
  onSubmit: (text: string, fontStyle: string) => void;
  onBack: () => void;
}

const TextInputForBiscuit: React.FC<TextInputForBiscuitProps> = ({ biscuitShape, onSubmit, onBack }) => {
  const [inputText, setInputText] = useState('');
  const [selectedFont, setSelectedFont] = useState('elegant');

  const fontStyles = [
    { id: 'elegant', name: 'Elegant', style: { fontStyle: 'italic', letterSpacing: '0.05em' } },
    { id: 'bold', name: 'Bold', style: { fontWeight: 900, letterSpacing: '0.02em' } },
    { id: 'script', name: 'Script', style: { fontFamily: 'cursive', fontStyle: 'italic' } },
    { id: 'minimal', name: 'Minimal', style: { fontWeight: 300, letterSpacing: '0.1em' } },
    { id: 'decorative', name: 'Decorative', style: { fontWeight: 700, letterSpacing: '0.08em' } },
  ];

  const handleSubmit = () => {
    if (!inputText.trim()) {
      alert('Please enter some text');
      return;
    }
    onSubmit(inputText, selectedFont);
  };

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
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px',
      paddingBottom: '20px',
      borderBottom: '1px solid #e8ecf1',
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
    contentWrapper: {
      display: 'flex',
      gap: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      flex: 1,
    },
    previewSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    biscuitContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '400px',
      aspectRatio: biscuitShape === 'round' ? '1' : '1.5',
    },
    biscuitShapeBase: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #f9e4a3 0%, #f5d76e 100%)',
      borderRadius: '15px',
      boxShadow: '0 12px 30px rgba(100, 100, 100, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px',
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#333',
      textAlign: 'center' as any,
      whiteSpace: 'pre-wrap' as any,
      wordWrap: 'break-word' as any,
      overflow: 'hidden',
    },
    inputSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
    },
    formGroup: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      border: '1px solid rgba(0, 0, 0, 0.08)',
    },
    label: {
      fontSize: '0.95rem',
      fontWeight: 600,
      color: '#1a1a1a',
      marginBottom: '12px',
      display: 'block',
    },
    textInput: {
      width: '100%',
      padding: '12px 16px',
      fontSize: '1rem',
      border: '2px solid rgba(0, 0, 0, 0.08)',
      borderRadius: '8px',
      fontFamily: 'inherit',
      transition: 'all 0.2s',
      boxSizing: 'border-box' as any,
      minHeight: '120px',
      resize: 'vertical' as any,
    },
    fontGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
      gap: '10px',
    },
    fontOption: {
      padding: '12px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'rgba(0, 0, 0, 0.08)',
      borderRadius: '10px',
      background: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s',
      textAlign: 'center' as any,
    },
    fontOptionSelected: {
      borderColor: '#6fb7ff',
      background: 'rgba(107, 183, 255, 0.1)',
    },
    fontPreview: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '5px',
    },
    fontName: {
      fontSize: '0.8rem',
      color: '#666',
    },
    submitButton: {
      background: 'linear-gradient(135deg, #6fb7ff 0%, #4a9fff 100%)',
      color: 'white',
      border: 'none',
      padding: '14px 32px',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back
        </button>
        <h1 style={styles.title}>✏️ Add Text to {biscuitShape === 'round' ? 'Round' : 'Rectangle'} Biscuit</h1>
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.previewSection}>
          <div style={styles.biscuitContainer}>
            <div style={{ ...styles.biscuitShapeBase, borderRadius: biscuitShape === 'round' ? '50%' : '15px', ...fontStyles.find(f => f.id === selectedFont)?.style }}>
              {inputText || 'Preview Text'}
            </div>
          </div>
        </div>

        <div style={styles.inputSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Your Text</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text for your biscuit... (supports multiple lines)"
              style={styles.textInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Font Style</label>
            <div style={styles.fontGrid}>
              {fontStyles.map((font) => (
                <div
                  key={font.id}
                  style={{
                    ...styles.fontOption,
                    ...(selectedFont === font.id ? styles.fontOptionSelected : {}),
                  }}
                  onClick={() => setSelectedFont(font.id)}
                >
                  <div style={{ ...styles.fontPreview, ...font.style }}>Abc</div>
                  <div style={styles.fontName}>{font.name}</div>
                </div>
              ))}
            </div>
          </div>

          <button style={styles.submitButton} onClick={handleSubmit}>
            Print This Text →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextInputForBiscuit;
