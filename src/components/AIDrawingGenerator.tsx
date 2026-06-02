import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface AIDrawingGeneratorProps {
  biscuitShape: 'round' | 'rectangle';
  onComplete: (drawingData: string, imageSrc: string) => void;
  onBack: () => void;
}

const AIDrawingGenerator: React.FC<AIDrawingGeneratorProps> = ({ biscuitShape, onComplete, onBack }) => {
  const { t } = useLanguage();
  const [textInput, setTextInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [error, setError] = useState('');

  const generateDrawing = async () => {
    if (!textInput.trim()) {
      setError('Please enter a word or description (e.g., moon, star, puppy, leaf, burger)');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      // Clean up input: remove articles (a, an, the) from the beginning
      let cleanedInput = textInput.trim().toLowerCase();
      cleanedInput = cleanedInput.replace(/^(a|an|the)\s+/i, '').trim();
      
      // Step 1: Search for icons using Iconify Search API
      // Using simple line figurative icon sets
      const searchUrl = `https://api.iconify.design/search?query=${encodeURIComponent(cleanedInput)}&limit=32&prefixes=game-icons,icon-park-outline,mdi,material-symbols`;
      
      const searchResponse = await fetch(searchUrl);
      if (!searchResponse.ok) {
        throw new Error('Failed to search icons');
      }

      const searchData = await searchResponse.json();
      
      // Check if any icons were found
      if (!searchData.icons || searchData.icons.length === 0) {
        setError(`No icons found for "${textInput}". Try: apple, pizza, cat, dog, flower, heart, tree, person`);
        setIsGenerating(false);
        return;
      }

      // Step 2: Get the first (most relevant) icon ID
      // Icon ID format example: "lucide:moon" or "tabler:star"
      const iconId = searchData.icons[0];
      const [prefix, name] = iconId.split(':');

      if (!prefix || !name) {
        throw new Error('Invalid icon ID format');
      }

      // Step 3: Fetch the SVG from /{prefix}/{name}.svg
      // Official API: /{prefix}/{name}.svg
      const svgUrl = `https://api.iconify.design/${prefix}/${name}.svg`;
      const svgResponse = await fetch(svgUrl);
      
      if (!svgResponse.ok) {
        throw new Error('Failed to fetch SVG');
      }

      // Get the SVG content as blob and create object URL
      const svgBlob = await svgResponse.blob();
      const imageSrc = URL.createObjectURL(svgBlob);
      
      setGeneratedImage(imageSrc);
      setScale(1);
      setOffsetX(0);
      setOffsetY(0);
    } catch (err) {
      setError(`Failed to find icon. Try: apple, pizza, cat, dog, flower, heart, tree, person, leaf`);
      console.error('Icon fetch error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirm = () => {
    if (generatedImage) {
      onComplete('ai-drawing', generatedImage);
    }
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
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '40px',
      position: 'relative',
    },
    backButton: {
      background: 'none',
      border: 'none',
      fontSize: '1rem',
      cursor: 'pointer',
      color: '#7a8fa6',
      padding: '8px 12px',
      fontWeight: 500,
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
      flexDirection: 'column',
      alignItems: 'center',
      gap: '30px',
      maxWidth: '1000px',
      margin: '0 auto',
      flex: 1,
    },
    inputSection: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    inputLabel: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1a2332',
    },
    textInput: {
      width: '100%',
      padding: '15px',
      fontSize: '1rem',
      border: '2px solid #e8ecf1',
      borderRadius: '10px',
      fontFamily: 'inherit',
      transition: 'all 0.2s',
      boxSizing: 'border-box' as any,
    },
    generateButton: {
      background: 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      width: '100%',
    },
    previewSection: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      alignItems: 'center',
    },
    preview: {
      background: 'white',
      borderRadius: '15px',
      padding: '40px',
      border: '2px solid #e8ecf1',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    },
    imageContainer: {
      width: '100%',
      height: '400px',
      background: '#f5f7fa',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
    },
    controls: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '100%',
      minWidth: '500px',
    },
    controlGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    controlLabel: {
      fontSize: '0.9rem',
      fontWeight: 600,
      color: '#1a2332',
    },
    slider: {
      width: '100%',
      cursor: 'pointer',
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      width: '100%',
      marginTop: '20px',
    },
    confirmButton: {
      flex: 1,
      background: 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    cancelButton: {
      flex: 1,
      background: 'white',
      border: '2px solid #e8ecf1',
      color: '#7a8fa6',
      padding: '10px 30px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    error: {
      color: '#e74c3c',
      fontSize: '0.9rem',
      padding: '10px',
      background: '#fadbd8',
      borderRadius: '8px',
      width: '100%',
      textAlign: 'center' as any,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          {t.common.back}
        </button>
        <h1 style={styles.title}>🎨 Icon Selector</h1>
      </div>

      <div style={styles.content}>
        <div style={styles.inputSection}>
          <label style={styles.inputLabel}>Describe what icon you want:</label>
          <input
            type="text"
            style={styles.textInput}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="e.g., moon, star, puppy, leaf, burger, coffee cup"
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = '#5b9bd5';
              (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(91, 155, 213, 0.1)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = '#e8ecf1';
              (e.target as HTMLInputElement).style.boxShadow = 'none';
            }}
          />
          <button
            style={styles.generateButton}
            onClick={generateDrawing}
            disabled={isGenerating}
            onMouseEnter={(e) => {
              if (!isGenerating) {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 20px rgba(91, 155, 213, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            {isGenerating ? 'Searching Icons...' : 'Find Icon'}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {generatedImage && (
          <div style={styles.previewSection}>
            <div style={styles.preview}>
              <h3 style={styles.inputLabel}>Preview & Adjust</h3>
              <div
                style={{
                  ...styles.imageContainer,
                  width: biscuitShape === 'round' ? '300px' : '350px',
                  height: biscuitShape === 'round' ? '300px' : '250px',
                  borderRadius: biscuitShape === 'round' ? '50%' : '15px',
                  background: 'linear-gradient(135deg, #f9e4a3 0%, #f5d76e 100%)',
                  border: '2px solid #e8ecf1',
                  boxShadow: '0 8px 20px rgba(100, 100, 100, 0.15)',
                }}
              >
                <img
                  src={generatedImage}
                  style={{
                    ...styles.image,
                    transform: `scale(${scale * 8}) translate(${offsetX}px, ${offsetY}px)`,
                    transition: 'transform 0.2s',
                  }}
                />
              </div>

              <div style={styles.controls}>
                <div style={styles.controlGroup}>
                  <label style={styles.controlLabel}>Size: {Math.round(scale * 100)}%</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    style={styles.slider}
                  />
                </div>

                <div style={styles.controlGroup}>
                  <label style={styles.controlLabel}>Position X: {offsetX}px</label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    step="5"
                    value={offsetX}
                    onChange={(e) => setOffsetX(parseFloat(e.target.value))}
                    style={styles.slider}
                  />
                </div>

                <div style={styles.controlGroup}>
                  <label style={styles.controlLabel}>Position Y: {offsetY}px</label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    step="5"
                    value={offsetY}
                    onChange={(e) => setOffsetY(parseFloat(e.target.value))}
                    style={styles.slider}
                  />
                </div>
              </div>

              <div style={styles.buttonGroup}>
                <button
                  style={styles.confirmButton}
                  onClick={handleConfirm}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 20px rgba(91, 155, 213, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                  }}
                >
                  ✓ Use This Icon
                </button>
                <button
                  style={styles.cancelButton}
                  onClick={() => {
                    setGeneratedImage(null);
                    setTextInput('');
                  }}
                >
                  Search Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDrawingGenerator;
