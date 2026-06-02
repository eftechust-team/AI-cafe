import React, { useRef, useState } from 'react';

interface DrawingCanvasProps {
  biscuitShape: 'round' | 'rectangle';
  onSubmit: (drawingData: string, description: string) => void;
  onBack: () => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ biscuitShape, onSubmit, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [description, setDescription] = useState('');
  const [isAIGenerating, setIsAIGenerating] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleAIGenerate = async () => {
    if (!description.trim()) {
      alert('Please describe what you want AI to draw');
      return;
    }
    setIsAIGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      clearCanvas();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw a simple example based on description
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw a simple heart as example
      if (description.toLowerCase().includes('heart')) {
        ctx.beginPath();
        ctx.moveTo(150, 100);
        ctx.bezierCurveTo(150, 80, 140, 70, 120, 70);
        ctx.bezierCurveTo(100, 70, 90, 80, 90, 100);
        ctx.bezierCurveTo(90, 130, 150, 170, 150, 170);
        ctx.bezierCurveTo(150, 170, 210, 130, 210, 100);
        ctx.bezierCurveTo(210, 80, 200, 70, 180, 70);
        ctx.bezierCurveTo(160, 70, 150, 80, 150, 100);
        ctx.stroke();
      } else {
        // Draw a simple star
        const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
          let rot = (Math.PI / 2) * 3;
          let step = Math.PI / spikes;

          ctx.moveTo(cx, cy - outerRadius);
          for (let i = 0; i < spikes; i++) {
            ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
            rot += step;

            ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
            rot += step;
          }
          ctx.lineTo(cx, cy - outerRadius);
          ctx.stroke();
        };
        drawStar(150, 110, 5, 60, 30);
      }

      setIsAIGenerating(false);
      alert('✨ AI has generated a beautiful design based on your description!');
    }, 2000);
  };

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const drawingData = canvas.toDataURL();
    onSubmit(drawingData, description);
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
    canvasSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    canvasWrapper: {
      background: 'white',
      borderRadius: '15px',
      padding: '15px',
      border: '2px solid rgba(0, 0, 0, 0.08)',
      flex: 1,
    },
    canvas: {
      width: '100%',
      height: '400px',
      background: 'white',
      borderRadius: '10px',
      cursor: 'crosshair',
      display: 'block',
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
    },
    button: {
      padding: '10px 16px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'all 0.2s',
      flex: 1,
    },
    clearButton: {
      background: 'rgba(0, 0, 0, 0.05)',
      color: '#666',
    },
    inputSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
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
      minHeight: '100px',
      resize: 'vertical' as any,
    },
    aiButton: {
      background: 'linear-gradient(135deg, #ff8c42 0%, #ff7a1a 100%)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '0.95rem',
      transition: 'all 0.2s',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
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
      width: '100%',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back
        </button>
        <h1 style={styles.title}>🖌️ Draw or Describe for {biscuitShape === 'round' ? 'Round' : 'Rectangle'} Biscuit</h1>
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.canvasSection}>
          <div style={styles.canvasWrapper}>
            <canvas
              ref={canvasRef}
              width={500}
              height={400}
              style={styles.canvas}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
          <div style={styles.buttonGroup}>
            <button style={{ ...styles.button, ...styles.clearButton }} onClick={clearCanvas}>
              Clear Canvas
            </button>
          </div>
        </div>

        <div style={styles.inputSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Describe What You Want</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., 'A simple heart with decorative dots', 'A star pattern', 'My initials in cursive', etc."
              style={styles.textInput}
            />
          </div>

          <button
            style={styles.aiButton}
            onClick={handleAIGenerate}
            disabled={isAIGenerating}
          >
            {isAIGenerating ? '✨ Generating...' : '✨ AI Design Generator'}
          </button>

          <button style={styles.submitButton} onClick={handleSubmit}>
            Print This Design →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
