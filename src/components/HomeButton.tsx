import React from 'react';

interface HomeButtonProps {
  onClick: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => {
  const styles: Record<string, React.CSSProperties> = {
    container: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
    },
    button: {
      background: 'linear-gradient(135deg, #5b9bd5, #4a90e2)',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 12px rgba(91, 155, 213, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.button}
        onClick={onClick}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 20px rgba(91, 155, 213, 0.4)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(91, 155, 213, 0.3)';
        }}
        title="Back to Home"
      >
        🏠 Home
      </button>
    </div>
  );
};

export default HomeButton;
