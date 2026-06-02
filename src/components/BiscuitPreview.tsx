import React from 'react';

interface BiscuitPreviewProps {
  biscuitShape: 'round' | 'rectangle';
  imageSrc: string;
  onConfirm: () => void;
  onEdit: () => void;
}

const BiscuitPreview: React.FC<BiscuitPreviewProps> = ({
  biscuitShape,
  imageSrc,
  onConfirm,
  onEdit,
}) => {
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
      boxShadow: '0 15px 40px rgba(100, 100, 100, 0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px',
      overflow: 'hidden',
      position: 'relative' as any,
    },
    textContent: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#333',
      textAlign: 'center' as any,
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column' as any,
      alignItems: 'center',
      gap: '12px',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    },
    iconsRow: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
    },
    icon: {
      fontSize: '1.5rem',
    },
    drawingContent: {
      width: '100%',
      height: '100%',
      objectFit: 'contain' as any,
    },
    buttonGroup: {
      display: 'flex',
      gap: '20px',
      width: '100%',
    },
    button: {
      padding: '14px 32px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s',
      flex: 1,
    },
    confirmButton: {
      background: 'linear-gradient(135deg, #6fb7ff 0%, #4a9fff 100%)',
      color: 'white',
    },
    editButton: {
      background: 'white',
      color: '#666',
      border: '2px solid rgba(0, 0, 0, 0.1)',
    },
    details: {
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      width: '100%',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      textAlign: 'left' as any,
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    },
    detailLabel: {
      fontWeight: 600,
      color: '#1a1a1a',
    },
    detailValue: {
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div>
          <h1 style={styles.title}>🎉 Your Custom Biscuit</h1>
          <p style={styles.subtitle}>Perfect! Here's your personalized biscuit ready to print</p>
        </div>

        <div style={styles.biscuitContainer}>
          <div style={{ ...styles.biscuitShapeBase, borderRadius: biscuitShape === 'round' ? '50%' : '15px' }}>
            <img src={imageSrc} alt="AI Generated Biscuit Design" style={styles.drawingContent} />
          </div>
        </div>

        <div style={styles.details}>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Shape</span>
            <span style={styles.detailValue}>{biscuitShape === 'round' ? '🔵 Round' : '▭ Rectangle'}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Design</span>
            <span style={styles.detailValue}>🎨 AI Generated</span>
          </div>
          <div style={{ ...styles.detailRow, borderBottom: 'none' }}>
            <span style={styles.detailLabel}>Status</span>
            <span style={styles.detailValue}>✅ Ready to Print</span>
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button style={{ ...styles.button, ...styles.editButton }} onClick={onEdit}>
            ← Edit Design
          </button>
          <button style={{ ...styles.button, ...styles.confirmButton }} onClick={onConfirm}>
            🖨️ Print & Order →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiscuitPreview;
